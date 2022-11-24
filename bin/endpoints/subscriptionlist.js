"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const soap_1 = require("soap");
const url = "http://localhost:8042/admin?wsd";
(0, soap_1.createClient)(url, function (err, client) {
    if (err) {
        throw err;
    }
    const args = {};
    client.getSubscriptionRequests(args, function (err, res) {
        if (err) {
            throw err;
            console.log(res);
        }
    });
});
