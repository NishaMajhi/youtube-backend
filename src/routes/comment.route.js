import { Router } from "express";
import { addComment, getVideoComments, removeComment, updateComment } from "../controllers/comment.controller.js";
const commentRouter = Router()

commentRouter.post("/:videoId", addComment);
commentRouter.get("/:videoId", getVideoComments);
commentRouter.delete("/:commentId", removeComment);
commentRouter.patch("/:commentId", updateComment)

export {
    commentRouter
}