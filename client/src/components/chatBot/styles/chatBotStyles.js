import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((themes) =>
({  
    outsideDiv:{
        width: "100%",
        // overflow: "auto",
        // display: "flex",
        // flexDirection: "column",
        padding: "0px 0px",
        margin: "40px 40px 0px 40px",

    },
    inputDiv:{
        width: "100%",
        position:"relative"
    },
    queryInput: {
        fontFamily: "monospace",
        fontSize: "16px",
        // border: "3px",
        borderRadius: "4px",
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px",
        border: "2px solid #eee",
        boxShadow: "none",
        boxSizing: "border - box",
        opacity: 1,
        outline: "none",
        padding: "30px 52px 16px 10px",
        width: "96%",
        margin: "0px 0px 0px 0px",
    },

    sendButton: {
        backgroundColor: "transparent",
        border: "0",
        borderBottomRightRadius: "10px",
        boxShadow: "none",
        cursor: "pointer",
        fill: "#4a4a4a",
        opacity: "1",
        outline: "none",
        padding: "28px 16px 12px 16px",
        position: "absolute",
        right: "0",
        top: "0",
        fontSize:"20px",
        
    },
    chatbot: {
        fontFamily: "monospace",
        borderRadius: "10px",
        boxShadow: "0 12px 24px 0 rgba(0, 0, 0, 0.15)",
        background: "#f5f8fb",
        textAlign: "center",
        display: "flex",
        flexFlow: "column",
        // width: "100%",
        overflowX: "hidden",
        overflowY: "auto",
        outline:"none",
        margin: "40px 20px 0px 20px",
    },
    messageContainer: {
        
        float:"left",
        width: "100%",
        margin:"10px 0px 10px 20px",
        textAlign:"justify"
    },


    messages: {
        width: "100%",
        height: "400px",
        overflowX: "hidden",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        padding: "10px 0px",
        margin: "40px 40px 0px 40px",
       
    },



    botMessage: {
        // display:"flex",
        float: "left",
        // flexDirection: "column",
        padding: "15px 20px",
        margin: "10px 30px 0px 10px",
        borderRadius: "20px 20px 20px 1px",
        color: "black",
        
    },
    userMessage: {
        float: "right",
        padding: "15px 10px",
        margin: "10px 30px 0px 10px",
        borderRadius: "20px 20px 1px 20px",
        background: "#cccccc",
        color: "black",
    },
})
);