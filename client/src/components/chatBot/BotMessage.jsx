import React from 'react'
import { useEffect, useState } from "react";
import styles from "./styles/chatBotStyles";

export default function BotMessage({ fetchReply }) {
    const classes = styles();
    const [botReply, setBotReply] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(
        () => {
            async function loadReply() {
                const reply = await fetchReply();
                setLoading(false);
                setBotReply(reply);
            }
            loadReply();

        }, [fetchReply]
    )
    return (

        <div className={classes.messageContainer}>
            <div className={classes.botMessage}>
                {loading ? "..." : botReply}
            </div>
        </div>

    )
}