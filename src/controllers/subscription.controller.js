import asyncHandler from 'express-async-handler';


const getSubscribedChannels = asyncHandler(async (req, res) => {
    try {

    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
})

const getChannelSubscribers = asyncHandler(async (req, res) => {
    try {

    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
})

const addSubscription = asyncHandler(async (req, res) => {
    try {

    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
})

const removeSubscription = asyncHandler(async (req, res) => {
    try {

    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
})

export {
    getChannelSubscribers,
    getSubscribedChannels,
    addSubscription,
    removeSubscription
}