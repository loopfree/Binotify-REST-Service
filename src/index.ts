import express, { Application } from "express";
import { Client } from "soap";

import endpoint from "./endpoints/endpoint";

const app: Application = express();

const port: number = 3000;

app.get("/subscriptionlist",(req, res) => {
    endpoint.getSubscriptionList(req, res);
});

app.listen(port, () => {
    console.log(`App is running on :${port}`);
});