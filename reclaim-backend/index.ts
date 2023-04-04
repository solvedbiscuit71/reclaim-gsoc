import express, { Application, Request, Response } from "express";
import { Reclaim, generateUuid } from "@reclaimprotocol/reclaim-sdk";

import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config()

const app: Application = express();
const port = process.env.PORT || 3000;

import cors from 'cors';
const corsOptions = {
    origin: process.env.FRONTEND_BASE_URL || 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200
}

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions))

// Reclaim protocol
const callbackUrl = process.env.CALLBACK_URL || 'http://localhost:3000'
const reclaim = new Reclaim(callbackUrl + '/callback/')

// Setup MonogoDB
mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/reclaim')
    .then(() => console.log("Connected successfully to database"))
    .catch((err) => console.log("ERR: " + err))

// Submission Schemas
const SubmissionSchema = new mongoose.Schema({
    repositoryName: String,
    callbackId: String,
    templateId: String,
    claims: String,
    status: String
})

const Submission = mongoose.model("submission", SubmissionSchema)

// Organisation Schema
const OrganisationSchema = new mongoose.Schema({
    name: String,
    repositoryName: String,
})

const Organisation = mongoose.model("organisation", OrganisationSchema)

app.post(
    "/callback/:callbackId",
    async (req: Request, res: Response): Promise<Response> => {
        if (!req.params.callbackId) {
            return res.status(400).send(
            `
            <html>
                <head>
                    <title>Reclaim in GSOC</title>
                </head>
                <body>
                    <h1>Status: 400 (Bad Access)</h1>
                    <p>CallbackId is required</p>
                </body>
            </html>
            `
            )
        }

        if (Object.keys(req.body).length == 0) {
            return res.status(400).send(
            `
            <html>
                <head>
                    <title>Reclaim in GSOC</title>
                </head>
                <body>
                    <h1>Status: 400 (Bad Access)</h1>
                    <p>Claims is required</p>
                </body>
            </html>
            `
            )
        }
        const claims = Object.keys(req.body)[0]

        const data = await Submission.findOne({callbackId: req.params.callbackId}).exec()
        if (data) {
            return res.status(404).send(
            `
            <html>
                <head>
                    <title>Reclaim in GSOC</title>
                </head>
                <body>
                    <h1>Status: 404 (Not Found)</h1>
                    <p>Callback Id doesn't exists</p>
                </body>
            </html>
            `
            )
        }

        await Submission.updateOne({ callbackId: req.params.callbackId }, { $set: {
            status: 'Verified',
            claims: claims
        }}).exec()

        return res.status(200).send(
            `
            <html>
                <head>
                    <title>Reclaim in GSOC</title>
                </head>
                <body>
                    <h1>Status: 200 (OK)</h1>
                    <p>Your claim has been accepted</p>
                </body>
            </html>
            `
        )
    }
)

app.get(
    "/status/:callbackId",
    async (req: Request, res: Response): Promise<Response> => {
        const data = await Submission.findOne({callbackId: req.params.callbackId}).exec()
        if (data) {
            return res.status(200).send({
                status: data.status
            })
        }

        return res.status(404).send({
            message: "callbackId not found"
        })
    }
)

app.post(
    "/verify",
    async (req: Request, res: Response): Promise<Response> => {
        const repo = req.body.repo
        const callbackId = 'repo-' + generateUuid()

        const template = (
            await reclaim.connect('Github-contributor', [
                {
                    provider: 'github-contributor',
                    params: { repo }
                }
            ])
        ).generateTemplate(callbackId)

        const url = template.url
        const templateId = template.id

        const newSubmission = new Submission({
            repositoryName: repo,
            templateId,
            callbackId,
            claims: null,
            status: 'Pending'
        })
        await newSubmission.save();

        return res.status(200).send({
            url,
            callbackId
        })
    }
)

app.get(
    "/organisers",
    async (req: Request, res: Response): Promise<Response> => {
        const query = await Organisation.find().exec()
        const organisers = query.map(doc => [doc.name, doc.repositoryName])

        return res.status(200).send({ organisers });
    }
);

app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
});