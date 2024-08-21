import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import path from 'path';
import generate from "./generate.js";
import queryDoc from "./queryDoc.js";
import e from "express";

// const express = require("express");
// const multer = require("multer");
// const fs = require('fs');
// const cors = require("cors");
const app = express();
// const generate = require('./generate.js');

app.use(express.json());
app.use(cors(
    { origin: "*" }
));

const port = process.env.port | 3002;
const upload = multer({ dest: "./public/uploads/" })
const embeddingDir = "embeddings"
const currentDir = process.cwd();

const embeddingDirPath = path.join(currentDir, embeddingDir);
async function removePreviousIndexedFiles() {
    fs.rm(embeddingDir, { recursive: true, force: true }, err => {
        if (err) {
            throw err;
        }

    })
}

function createEmbeddingsFolder(){
    try {
        if (!fs.existsSync(embeddingDirPath)) {
            fs.mkdirSync(embeddingDirPath);
        }
    } catch (err) {
        console.error(err);
    }
}
app.post("/uploadAndTrain", upload.single("file"), async (req, res) => {
    console.log("Inside request handler");
    // console.log("request file");
    // console.log(req.body.file);
    // console.log('MIME Type:', req.file.mimetype);
    // console.log(req.file);
    const filePath = req.file.path;
    // console.log(filePath);
    try {
        if (req.file) {
            removePreviousIndexedFiles()
                .then(async () => {
                    createEmbeddingsFolder();
                    await generate(filePath);
                    fs.unlink(filePath, (err) => {

                        if (err) {
                            console.error(`Error deleting file: ${err}`);
                            return res.status(500).send('File processing error');
                        }

                        console.log("File deleted!")
                    });

                    res.status(200).send({
                        status: true,
                        message: "File uploaded successfully"
                    });
                })
                .catch(console.error);

        }
        else {
            res.status(400).send({
                status: false,
                message: "File not found!"
            })
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})
app.post("/queryDoc", async (req, res) => {
    console.log("Inside query doc request handler");

    const query = req.body.query;
    console.log("Req body query : " + query);

    try {
       
        const ans = await queryDoc(query);
        res.status(200).send({
            answer: ans
        })

    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});