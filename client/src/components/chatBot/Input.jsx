import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import styles from "./styles/chatBotStyles";

export default function Input({ onSend }) {
    const classes = styles();
    const [text, setText] = useState("");
    const handleInputChange = (e) => {
        setText(e.target.value);
    }
    const handleSend = (event) => {
        event.preventDefault();
        onSend(text);
        setText("");
    }
    return (
        <div className={classes.outsideDiv}>
            <form className={classes.inputDiv} onSubmit={handleSend}>
                <input
                    type="text"
                    name="queryText"
                    onChange={handleInputChange}
                    value={text}
                    placeholder="Enter your message here"
                    className={classes.queryInput}
                />
                <button className={classes.sendButton}>
                    <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 500 500"
                    >
                        <g>
                            <g>
                                <polygon points="0,497.25 535.5,267.75 0,38.25 0,216.75 382.5,267.75 0,318.75" />
                            </g>
                        </g>
                    </svg>
                </button>
                {/* <SendIcon type="submit"/> */}
            </form>
        </div>
    )
}
