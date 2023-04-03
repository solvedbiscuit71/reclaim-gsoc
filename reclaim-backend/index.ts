import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config()

const app: Application = express();
const port = process.env.PORT || 3000;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
    "/",
    async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send({
            message: "Welcome to reclaim protocol",
        });
    }
);

app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
});