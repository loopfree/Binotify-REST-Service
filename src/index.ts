import express from "express";
import cors from 'cors';

import endpoint from "./endpoints/endpoint";

const port = 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/subscription/list",(req, res) => {
    endpoint.getSubscriptionList(req, res);
});

app.post("/subscription/approve", (req, res) => {
    endpoint.approveSubscription(req, res);
})

app.post("/subscription/decline", (req, res) => {
    endpoint.declineSubscription(req, res);
})

app.post("/premium_singer/list", (req, res) => {
    endpoint.getPremiumSingers(req, res);
})

app.listen(port, () => {
    console.log(`App is running on :${port}`);
});
