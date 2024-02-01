import { Router } from "express";
import { createTweet, getUserTweet, removeTweet, updateTweet } from "../controllers/tweet.controller.js";
const tweetRouter = Router()

tweetRouter.post("/", createTweet);
tweetRouter.put("/:tweetId", updateTweet);
tweetRouter.delete("/:tweetId", removeTweet);
tweetRouter.get("/user/:userId", getUserTweet)

export {
    tweetRouter
}