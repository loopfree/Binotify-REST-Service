import { getSubscriptionList } from "./subscriptionlist";
import { approveSubscription } from "./approvesubscription";
import { declineSubscription } from "./declineSubscription";
import { getPremiumSingers } from "./premiumSingers";
import { getPremiumSongs, createPremiumSongs } from "./premiumSongs";
import { login } from "./login";
import { register } from "./register";

export default{
    getSubscriptionList,

    approveSubscription,
    declineSubscription,

    getPremiumSingers,

    getPremiumSongs,
    createPremiumSongs,

    login,
    register
}