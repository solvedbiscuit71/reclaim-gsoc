import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config()

const app: Application = express();
const port = process.env.PORT || 8080;

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

app.get(
    "/organisers",
    async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send({
            organisers: [
                ["AsyncAPI",  "asyncapi/spec"],
                ["Conda", "conda/conda"],
                ["FluxCD", "fluxcd/flux2"],
                ["OQ Engine", "gem/oq-engine"],
                ["Matplotlib", "matplotlib/matplotlib"],
                ["MicroPython", "micropython/micropython"],
                ["Numpy", "numpy/numpy"],
                ["Wagtail", "wagtail/wagtail"],
                ["WasmEdge", "WasmEdge/WasmEdge"],
            ]
        });
    }
);

app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
});