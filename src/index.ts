import express, { Application } from "express";

const app: Application = express();

const port: number = 3000;

app.get("/subscriptionlist",(req, res) => {

});

app.listen(port, () => {
    console.log(`App is running on :${port}`);
});