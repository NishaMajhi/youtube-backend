import { Router } from "express";
import { addVideoToPlaylist, createPlaylist, getPlaylistById, getUserPlaylists, removePlaylist, removeVideoToPlaylist, updatePlaylist } from "../controllers/playlist.controller.js";
const playlistRouter = Router()

playlistRouter.post("/", createPlaylist);
playlistRouter.delete("/:playlistId", removePlaylist);
playlistRouter.put("/:playlistId", updatePlaylist);
playlistRouter.get("/:playlistId", getPlaylistById);
playlistRouter.get("/user/:userId", getUserPlaylists);
playlistRouter.put("/add/:videoId/:playlist", addVideoToPlaylist)
playlistRouter.put("/remove/:videoId/:playlist", removeVideoToPlaylist)


export {
    playlistRouter
}