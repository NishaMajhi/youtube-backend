import mongoose, { model } from "mongoose";

const playlistSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        description: {
            type: String
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        videos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Video"
            }
        ]
    },
    { timestamps: true }
)

export const Playlist = mongoose.model("Playlist", playlistSchema)