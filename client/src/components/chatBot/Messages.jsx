import React, { useEffect, useRef } from 'react'
import styles from "./styles/chatBotStyles";

export default function Messages({ messages }) {
    const classes = styles();
    const el = useRef(null);
    useEffect(() => {
        el.current.scrollIntoView({ block: "end", behavior: "smooth" });
    })
    return (
        <div className={classes.messages}>
            {messages}
            <div id={"el"} ref={el} />
        </div>
    )
}
