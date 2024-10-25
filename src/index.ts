import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {router} from "./routes";
import { createYoga } from 'graphql-yoga'
import {schema} from './schema'
import mongoose from "mongoose";
import { ENV } from "./const";
import { dbConnect } from "./db";

const PORT = ENV.PORT || 4001;

const yoga = createYoga({ schema })

const app = express();
app.use('/graphql', yoga);

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));


app.use(bodyParser.json());

app.use("/api/v1/", router);

// app.use(errorHandler);

const start = async () => {
    await dbConnect();
    app.listen(PORT, () => {
        console.info(`Server running on http://localhost:${PORT}`);
    });
}

start()