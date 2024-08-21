
import { ChatGroq } from "@langchain/groq";
import 'dotenv/config' // loads in dotenv and adds values onto process.env
import { env } from 'node:process'
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/hf_transformers";

const llm_model = new ChatGroq({
    apiKey: env.GROQ_API_KEY,
    model: "llama3-8b-8192",
    temperature: 0
});
const embeddings = new HuggingFaceTransformersEmbeddings({
    model: "Xenova/all-MiniLM-L6-v2",
});
const queryDoc = async (query) => {
    const vectorStore = await FaissStore.load(
        `./embeddings/`,
        embeddings
      );
    const retriever = vectorStore.asRetriever();
    const chat_history = [];
    const retrieverPrompt = ChatPromptTemplate.fromMessages([
        new MessagesPlaceholder("chat_history"),
        ["user", "{input}"],
        [
            "user",
            "Given the above conversation, generate a search query to look up in order to get information relevant to the conversation",
        ],
    ]);
    const prompt = ChatPromptTemplate.fromMessages([
        [
            "system",
            `You are a helpful assistant.Answer user's question based on following context : {context}, in a simple way. 
          Don;t try to give imaginary answers, if you don;t know something just say, sorry I don't know.`,
        ],
        new MessagesPlaceholder("chat_history"),
        ["user", "{input}"],
    ]);
    const retrieverChain = await createHistoryAwareRetriever({
        llm: llm_model,
        retriever,
        rephrasePrompt: retrieverPrompt,

    });
    console.log("Created History Retriever chain");
    const chain = await createStuffDocumentsChain({
        llm: llm_model,
        prompt: prompt,
    });
    console.log("created doc chain");
    const conversationChain = await createRetrievalChain({
        combineDocsChain: chain,
        retriever: retrieverChain
    });
    console.log("created retrieval chain");
    // const query = "What is the experience of Janani in Lenova US project?";
    console.log("Invoking query");
    const response = await conversationChain.invoke({
        chat_history: chat_history,
        input: query,
    });
    chat_history.push(new HumanMessage(query));
    chat_history.push(new AIMessage(response.answer));
    console.log("Response is : " + response.answer);
    console.log(chat_history);
    return response.answer;





}
export default queryDoc;