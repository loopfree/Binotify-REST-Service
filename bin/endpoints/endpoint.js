"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subscriptionlist_1 = require("./subscriptionlist");
const approvesubscription_1 = require("./approvesubscription");
const declineSubscription_1 = require("./declineSubscription");
exports.default = {
    getSubscriptionList: subscriptionlist_1.getSubscriptionList,
    approveSubscription: approvesubscription_1.approveSubscription,
    declineSubscription: declineSubscription_1.declineSubscription
};
