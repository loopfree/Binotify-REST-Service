import express from "express";
import cors from 'cors';
import {randomBytes} from "crypto";

import endpoint from "./endpoints/endpoint";
import { authenticateToken } from "./helper/authenticate";

const port = 3000;

process.env.TOKEN = randomBytes(64).toString("hex");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/authenticate/login", (req, res) => {
    endpoint.login(req, res);
});

app.post("/authenticate/register", authenticateToken, (req, res) => {
    endpoint.register(req, res);
})

app.get("/subscription/list", authenticateToken, (req, res) => {
    endpoint.getSubscriptionList(req, res);
});

app.post("/subscription/approve", authenticateToken, (req, res) => {
    endpoint.approveSubscription(req, res);
})

app.post("/subscription/decline", authenticateToken, (req, res) => {
    endpoint.declineSubscription(req, res);
})

app.post("/premium_singer/list", authenticateToken, (req, res) => {
    endpoint.getPremiumSingers(req, res);
})

app.post("/premium_singer/song",authenticateToken, (req, res) => {
    endpoint.getPremiumSingers(req, res);
})

app.listen(port, () => {
    console.log(`App is running on :${port}`);
});
