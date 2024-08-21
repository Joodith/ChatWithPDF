import styles from "./styles/chatBotStyles";
import React from 'react';


export default function UserMessage({ text }) {
    const classes = styles();
    return (
        <div className={classes.messageContainer}>
            <div className={classes.userMessage}>{text}</div>
        </div>
    );
}