import { getSubscriptionList } from "./subscriptionlist";
import { approveSubscription } from "./approvesubscription";
import { declineSubscription } from "./declineSubscription";
import { getPremiumSingers } from "./premiumSingers";
import { getPremiumSongsBySubscriber, getPremiumSongsBySinger, createPremiumSongs, 
         deletePremiumSongs, updatePremiumSongs } from "./premiumSongs";
import { login } from "./login";
import { register } from "./register";

export default{
    getSubscriptionList,

    approveSubscription,
    declineSubscription,

    getPremiumSingers,

    getPremiumSongsBySubscriber,
    getPremiumSongsBySinger,
    createPremiumSongs,
    deletePremiumSongs,
    updatePremiumSongs,

    login,
    register
}