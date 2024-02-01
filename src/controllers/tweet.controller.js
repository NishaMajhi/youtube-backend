import asyncHanlder from 'express-async-handler'

const createTweet = asyncHandler(async (req, res) => {
    try {

    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
})

const updateTweet = asyncHandler(async (req, res) => {
    try {

    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
})

const removeTweet = asyncHandler(async (req, res) => {
    try {

    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
})

const getUserTweet = asyncHandler(async (req, res) => {
    try {

    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
})

export {
    createTweet,
    removeTweet,
    updateTweet,
    getUserTweet
}