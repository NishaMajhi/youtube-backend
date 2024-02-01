import asyncHandler from 'express-async-handler'

const addComment = asyncHandler(async (req, res) => {
    try {

    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
})

const removeComment = asyncHandler(async (req, res) => {
    try {

    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
})

const getVideoComments = asyncHandler(async (req, res) => {
    try {

    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
})

const updateComment = asyncHandler(async (req, res) => {
    try {

    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
})

export {
    addComment,
    removeComment,
    updateComment,
    getVideoComments
}