import express from "express";
import cors from 'cors';

import endpoint from "./endpoints/endpoint";

const port = 3000;

const app = express();
app.use(cors());

app.get("/subscriptionlist",(req, res) => {
    endpoint.getSubscriptionList(req, res);
});

app.listen(port, () => {
    console.log(`App is running on :${port}`);
});
