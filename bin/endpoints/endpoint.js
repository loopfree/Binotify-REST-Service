"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subscriptionlist_1 = require("./subscriptionlist");
const approvesubscription_1 = require("./approvesubscription");
const declineSubscription_1 = require("./declineSubscription");
const premiumSingers_1 = require("./premiumSingers");
const premiumSongs_1 = require("./premiumSongs");
const login_1 = require("./login");
const register_1 = require("./register");
exports.default = {
    getSubscriptionList: subscriptionlist_1.getSubscriptionList,
    approveSubscription: approvesubscription_1.approveSubscription,
    declineSubscription: declineSubscription_1.declineSubscription,
    getPremiumSingers: premiumSingers_1.getPremiumSingers,
    getPremiumSongs: premiumSongs_1.getPremiumSongs,
    createPremiumSongs: premiumSongs_1.createPremiumSongs,
    login: login_1.login,
    register: register_1.register
};
