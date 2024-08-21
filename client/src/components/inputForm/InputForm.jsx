import React from 'react';
import Button from '@material-ui/core/Button';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from 'axios';
import styles from "./styles/InputFormStyles";
import LinearProgressWithLabel from './LinearProgressWithLabel';
import { Typography } from '@material-ui/core';
import ChatBot from '../chatBot/ChatBot';

export default function InputForm() {
    const classes = styles();
    const [fileData, setFileData] = useState("");
    const [fileName, setFileName] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);

    const uploadFile = (event) => {
        console.log("Helooo")
        const file = event.target.files[0];
        setFileName(file.name);
        setFileData(file);
    };
    const trainOnDoc = (event) => {
        event.preventDefault();
        console.log("Helooo")
        const formData = new FormData();
        console.log(fileData);
        formData.append('file', fileData);
        axios.post("http://localhost:3002/uploadAndTrain", formData, {
            onUploadProgress: progressEvent => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setUploadProgress(percentCompleted);
            }
        })
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            });
    }
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 20,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,

    });
    return (
        <div>
            <h1>Probe the Document</h1>

            <form onSubmit={trainOnDoc}>
                <Button
                    component="label"
                    variant="contained"
                    color="primary"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    className={classes.uploadFileButton}
                >
                    Upload file
                    <VisuallyHiddenInput type="file" onChange={uploadFile} />
                </Button>
                <Typography className={classes.fileNameDisplay}>{fileName}</Typography>
                <LinearProgressWithLabel className={classes.progressBar} value={uploadProgress} />
                <br />
                <Button variant="contained" color="success" type="submit">Train model</Button>
                <br />


            </form>
            <ChatBot />
        </div>
    )
}