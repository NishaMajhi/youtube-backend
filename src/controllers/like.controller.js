import asyncHandler from 'express-async-handler';

const addVideoLike = asyncHandler(async (req, res) => {
    try {

    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
})

const addCommentLike = asyncHandler(async (req, res) => {
    try {

    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
})

const addTweetLike = asyncHandler(async (req, res) => {
    try {

    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
})

const removeVideoLike = asyncHandler(async (req, res) => {
    try {

    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
})

const removeCommentLike = asyncHandler(async (req, res) => {
    try {

    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
})

const removeTweetLike = asyncHandler(async (req, res) => {
    try {

    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
})


const getLikedVideo = asyncHandler(async (req, res) => {
    try {

    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
})

export {
    addCommentLike,
    addTweetLike,
    addVideoLike,
    removeCommentLike,
    removeTweetLike,
    removeVideoLike,
    getLikedVideo
}