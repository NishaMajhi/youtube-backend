import { Router } from "express";
import { getAllVideos, getVideoById, publishVideo, removeVideo, updateVideo } from "../controllers/video.controller.js";
const videoRouter = Router()

videoRouter.post("/", publishVideo);
videoRouter.delete("/:videoId", removeVideo);
videoRouter.put("/:videoId", updateVideo);
videoRouter.get("/", getAllVideos);
videoRouter.get("/:videoId", getVideoById)

export {
    videoRouter
}