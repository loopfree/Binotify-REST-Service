"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const jwt_express_1 = __importDefault(require("jwt-express"));
const endpoint_1 = __importDefault(require("./endpoints/endpoint"));
const port = 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(jwt_express_1.default.init("steven wen pro :v"));
app.post("/authenticate/login", jwt_express_1.default.active(), (req, res) => {
    endpoint_1.default.login(req, res);
});
app.post("/authenticate/register", jwt_express_1.default.active(), (req, res) => {
    endpoint_1.default.register(req, res);
});
app.get("/subscription/list", jwt_express_1.default.active(), (req, res) => {
    endpoint_1.default.getSubscriptionList(req, res);
});
app.post("/subscription/approve", jwt_express_1.default.active(), (req, res) => {
    endpoint_1.default.approveSubscription(req, res);
});
app.post("/subscription/decline", jwt_express_1.default.active(), (req, res) => {
    endpoint_1.default.declineSubscription(req, res);
});
app.post("/premium_singer/list", jwt_express_1.default.active(), (req, res) => {
    endpoint_1.default.getPremiumSingers(req, res);
});
app.post("/premium_singer/song", jwt_express_1.default.active(), (req, res) => {
    endpoint_1.default.getPremiumSingers(req, res);
});
app.get('/songs/premium', endpoint_1.default.getPremiumSongs);
app.post('/songs/premium', jwt_express_1.default.active(), endpoint_1.default.createPremiumSongs);
app.listen(port, () => {
    console.log(`App is running on :${port}`);
});
