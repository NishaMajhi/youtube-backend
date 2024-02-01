import asyncHandler from 'express'

const createPlaylist = asyncHandler(async (req, res) => {
    try {

    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
})

const removePlaylist = asyncHandler(async (req, res) => {
    try {

    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
})

const updatePlaylist = asyncHandler(async (req, res) => {
    try {

    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
})

const getPlaylistById = asyncHandler(async (req, res) => {
    try {

    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
})

const getUserPlaylists = asyncHandler(async (req, res) => {
    try {

    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    try {

    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
})

const removeVideoToPlaylist = asyncHandler(async (req, res) => {
    try {

    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
})

export {
    createPlaylist,
    removePlaylist,
    updatePlaylist,
    getPlaylistById,
    getUserPlaylists,
    addVideoToPlaylist,
    removeVideoToPlaylist
}