import { useState } from "react"
import UserMessage from "./UserMessage";
import BotMessage from "./BotMessage";
import Input from "./Input";
import API from "./ChatBotAPI";
import Messages from "./Messages";
import styles from "./styles/chatBotStyles";


export default function ChatBot() {
    const classes = styles();
    const [messages, setMessages] = useState([]);

    const send = async text => {
        const newMessages = messages.concat(
            <UserMessage key={messages.length + 1} text={text} />,
            <BotMessage
                key={messages.length + 2}
                fetchReply={async () => await API.GetChatbotResponse(text)}
            />
        );
        setMessages(newMessages);
    };
    return (
        <div className={classes.chatbot}>
            <Messages messages={messages} />
            <Input onSend={send} />
        </div>
    );

}