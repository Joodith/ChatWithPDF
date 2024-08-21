
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/hf_transformers";
import { FaissStore } from "@langchain/community/vectorstores/faiss";




function normalizeDocuments(docs) {
    return docs.map((doc) => {
        if (typeof doc.pageContent === "string") {
            return doc.pageContent;
        } else if (Array.isArray(doc.pageContent)) {
            return doc.pageContent.join("\n");
        }
    });
}
const generate = async (filePath) => {
    console.log("file path is " + filePath);
    const embeddings = new HuggingFaceTransformersEmbeddings({
        model: "Xenova/all-MiniLM-L6-v2",
    });
    const loader = new PDFLoader(filePath);


    const docs = await loader.load();
    console.log(docs.length);
    // console.log(docs[0].pageContent.slice(0, 50));
    // console.log(docs[0].metadata);

    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200
    });

    const normalizedDocs = normalizeDocuments(docs);
    const splitDocs = await textSplitter.createDocuments(normalizedDocs);
    console.log("split docs length : " + splitDocs.length);
    const vectorStore = await FaissStore.fromDocuments(splitDocs, embeddings);
    console.log("after retrieving vectors");
    await vectorStore.save('./embeddings');
    console.log("Saved embeddings");

}
export default generate;