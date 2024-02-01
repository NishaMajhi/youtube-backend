import { Router } from "express";
import { addCommentLike, addTweetLike, addVideoLike, getLikedVideo, removeCommentLike, removeTweetLike, removeVideoLike } from "../controllers/like.controller.js";
const likeRouter = Router()

likeRouter.post("/v/:videoId", addVideoLike);
likeRouter.post("/c/:commentId", addCommentLike);
likeRouter.post("/t/:tweetId", addTweetLike);
likeRouter.delete("/v/:videoId", removeVideoLike)
likeRouter.delete("/c/:commentId", removeCommentLike)
likeRouter.delete("/t/:tweetId", removeTweetLike)
likeRouter.get("/", getLikedVideo)


export {
    likeRouter
}