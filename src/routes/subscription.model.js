import { Router } from "express";
import { addSubscription, getChannelSubscribers, getSubscribedChannels, removeSubscription } from "../controllers/subscription.controller.js";
const subscriptionRouter = Router()

subscriptionRouter.post("/:channelId", addSubscription);
subscriptionRouter.delete("/:channelId", removeSubscription);
subscriptionRouter.get("/s/:channelId", getChannelSubscribers)
subscriptionRouter.get("/", getSubscribedChannels)
export {
    subscriptionRouter
}