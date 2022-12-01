import express from "express";
import cors from 'cors';
import {randomBytes} from "crypto";

import endpoint from "./endpoints/endpoint";
import { authenticateToken } from "./helper/authenticate";

const port = 3000;

process.env.TOKEN = randomBytes(64).toString("hex");

// TODO: add authenticateToken

const app = express();
app.use(cors());
app.use(express.json());

app.post("/authenticate/login", (req, res) => {
    endpoint.login(req, res);
});

app.post("/authenticate/register", (req, res) => {
    endpoint.register(req, res);
})

app.get("/subscription/list", authenticateToken, (req, res) => {
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

app.get("/subscriber/premium_song", (req, res) => {
    endpoint.getPremiumSongsBySubscriber(req, res);
})

app.get("/premium_singer/song/list", (req, res) => {
    endpoint.getPremiumSongsBySinger(req, res);
})

app.post("/premium_singer/song/create", (req, res) => {
    endpoint.createPremiumSongs(req, res);
})

app.post("/premium_singer/song/update", (req, res) => {
    endpoint.updatePremiumSongs(req, res);
})

app.post("/premium_singer/song/delete", (req, res) => {
    endpoint.deletePremiumSongs(req, res);
})

app.listen(port, () => {
    console.log(`App is running on :${port}`);
});