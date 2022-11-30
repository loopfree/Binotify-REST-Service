import express from "express";
import cors from 'cors';
import jwt from "jwt-express";

import endpoint from "./endpoints/endpoint";

const port = 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(jwt.init("steven wen pro :v"));

app.post("/authenticate/login", jwt.active(), (req, res) => {
    endpoint.login(req, res);
});

app.post("/authenticate/register", jwt.active(), (req, res) => {
    endpoint.register(req, res);
})

app.get("/subscription/list", jwt.active(), (req, res) => {
    endpoint.getSubscriptionList(req, res);
});

app.post("/subscription/approve", jwt.active(), (req, res) => {
    endpoint.approveSubscription(req, res);
})

app.post("/subscription/decline", jwt.active(), (req, res) => {
    endpoint.declineSubscription(req, res);
})

app.post("/premium_singer/list", jwt.active(), (req, res) => {
    endpoint.getPremiumSingers(req, res);
})

app.post("/premium_singer/song", jwt.active(), (req, res) => {
    endpoint.getPremiumSingers(req, res);
})

app.get('/songs/premium', endpoint.getPremiumSongs);
app.post('/songs/premium', jwt.active(), endpoint.createPremiumSongs);

app.listen(port, () => {
    console.log(`App is running on :${port}`);
});