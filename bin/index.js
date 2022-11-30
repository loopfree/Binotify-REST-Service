"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const crypto_1 = require("crypto");
const endpoint_1 = __importDefault(require("./endpoints/endpoint"));
const port = 3000;
process.env.TOKEN = (0, crypto_1.randomBytes)(64).toString("hex");
// TODO: add authenticateToken
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/authenticate/login", (req, res) => {
    endpoint_1.default.login(req, res);
});
app.post("/authenticate/register", (req, res) => {
    endpoint_1.default.register(req, res);
});
app.get("/subscription/list", (req, res) => {
    endpoint_1.default.getSubscriptionList(req, res);
});
app.post("/subscription/approve", (req, res) => {
    endpoint_1.default.approveSubscription(req, res);
});
app.post("/subscription/decline", (req, res) => {
    endpoint_1.default.declineSubscription(req, res);
});
app.post("/premium_singer/list", (req, res) => {
    endpoint_1.default.getPremiumSingers(req, res);
});
app.post("/premium_singer/song", (req, res) => {
    endpoint_1.default.getPremiumSingers(req, res);
});
app.get("/premium_singer/song", (req, res) => {
    endpoint_1.default.getPremiumSongs(req, res);
});
app.post('/songs/premium', endpoint_1.default.createPremiumSongs);
app.listen(port, () => {
    console.log(`App is running on :${port}`);
});
