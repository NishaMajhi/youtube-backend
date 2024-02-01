import asyncHandler from 'express-async-handler';
import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken'
import { deleteImage } from '../utils/deleteImage.util.js';


const generateAccessAndRefreshTokens = async (userId) => {
    try {

        const findUser = await User.findById(userId)

        const accessToken = await findUser.gnerateAccessToken()
        const refreshToken = await findUser.gnerateRefreshToken()

        findUser.refreshToken = refreshToken;

        await findUser.save({ validateBeforeSave: false });

        return { accessToken, refreshToken }

    } catch (error) {
        res.status(500)
        throw new Error("Something went wrong while generating access and refresh token")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    try {

        // 1. taking input from user
        // 2. validate input
        // 3. check user exists
        // 4. check for avatar
        // 5. upload avatar on cloudinary
        // 6. create user object and insert
        // 7. send response to user

        const { userName, email, password, fullName } = req.body

        if (
            [userName, email, password, fullName].some((field) => (field?.trim() === ""))
        ) {
            res.status(400)
            throw new Error("All Fields are Required")
        }

        const findUser = await User.findOne({
            $or: [
                { userName },
                { email }
            ]
        })
        if (findUser) {
            res.status(409)
            throw new Error("User Already Exists")
        }

        const avatarLocalPath = `${process.env.SERVER_URL}/` + req.files?.avatar[0]?.path;

        if (!avatarLocalPath) {
            res.status(400)
            throw new Error("Avatar File Not Found")
        }

        // const avatarUrl = await uploadOnCloudinary(avatarLocalPath);

        // if (!avatarUrl) {
        //     res.status(400)
        //     throw new Error("Avatar Not Uploaded on Cloudinary")
        // }

        const user = await User.create(
            {
                userName,
                email,
                password,
                fullName,
                avatar: avatarLocalPath
            }
        )

        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken -watchHistory"
        )

        if (!createdUser) {
            res.status(500)
            throw new Error("Error while Creating User")
        }

        res.status(201).json({ createdUser });


    } catch (error) {
        throw new Error(error)
    }
})


const loginUser = asyncHandler(async (req, res) => {
    try {

        // 1. take input from user (email, password)
        // 2. check user exist
        // 3. compare email and password
        // 4. generate access andtoken 
        // 5. return token

        const { email, userName, password } = req.body

        if (!email) {
            res.status(400)
            throw new Error("email or username is required")
        }

        const findUser = await User.findOne({
            $or: [
                { email },
                // { userName }
            ]
        })

        if (!findUser) {
            res.status(404)
            throw new Error("User does not Register")
        }

        const isPasswordCorrect = await findUser.isPasswordCorrect(password)

        if (!isPasswordCorrect) {
            res.status(401)
            throw new Error("Invalid User Credentials")
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(findUser._id);

        //send cookies
        const options = {
            httpOnly: true,
            secure: true,
        }

        res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)

        res.status(200).json({ massage: "Logged in Successfully", accessToken, refreshToken })

    } catch (error) {
        throw new Error(error)
    }
})


const logoutUser = asyncHandler(async (req, res) => {
    try {

        // 1. clear all cookies of user from server side or
        // 2. remove refresh token of user from model

        await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset:
                {
                    refreshToken: 1
                }
            },
            { new: true }
        )

        const options = {
            httpOnly: true,
            secure: true
        }

        res.status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json({ message: "Log out Successfully" })

    } catch (error) {
        throw new Error(error)
    }
})


const refreshAccessToken = asyncHandler(async (req, res) => {
    try {

        // 1. take refresh token and validate
        const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

        if (!incomingRefreshToken) {
            res.status(401)
            throw new Error("Unauthirized Request");
        }

        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFESH_TOKEN_SECRET);


        const user = await User.findById(decodedToken?._id)

        if (!user) {
            res.status(401)
            throw new Error("Invalid Refresh Token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            res.status(401)
            throw new Error("Refresh Token is expired or user")
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user?._id)

        const options = {
            httpOnly: true,
            secure: true
        }

        res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({ message: "Access Token refreshed Successfully", accessToken: accessToken, refreshToken: refreshToken });

    } catch (error) {
        throw new Error(error)
    }
})


const changeCurrentPassword = asyncHandler(async (req, res) => {
    try {

        const { oldPassword, newPassword, confirmPassword } = req.body

        if (newPassword !== confirmPassword) {
            res.status(400)
            throw new Error("New Password and Confirm Password does not match")
        }

        const user = await User.findById(req.user._id)
        const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

        if (!isPasswordCorrect) {
            res.status(400)
            throw new Error("Invalid Old Password")
        }

        user.password = newPassword
        await user.save({ validateBeforeSave: false })

        res.status(201).json({ message: "Password Changed Successfully" })
    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
})


const getCurrentUser = asyncHandler(async (req, res) => {
    try {
        res.status(200).json({ message: "Current User Data", currentUser: req.user })

    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
})


const updateUserAccountDetails = asyncHandler(async (req, res) => {
    try {
        const { fullName } = req.body
        if (!fullName) {
            res.status(400)
            throw new Error("Full name required")
        }

        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    fullName
                }
            },
            { new: true }
        ).select("-password")

        res.status(201).json({ message: "Account Details Updated Successfully", user })

    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
})



const updateUserAvatar = asyncHandler(async (req, res) => {
    try {

        const avatarLocalPath = `${process.env.SERVER_URL}/` + req.files?.avatar[0]?.path;

        if (!avatarLocalPath) {
            res.status(400)
            throw new Error("user Avatar not found")
        }

        const oldAvatarPath = await User.findById(req.user._id).select("avatar")

        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    avatar: avatarLocalPath
                }
            },
            { new: true }
        ).select("-password")

        if (user) {
            //function to delete old image
            await deleteImage(oldAvatarPath)
        }

        res.status(201).json({ massage: "User Avatar updated successfully", user })

    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
})


const getUserChannelProfile = asyncHandler(async (req, res) => {
    try {
        const { userName } = req.params

        if (!userName?.trim()) {
            res.status(400)
            throw new Error("Username is missing")
        }

        const channel = await User.aggregate([
            {
                $match: {
                    userName: userName?.toLocaleLowerCase()
                }
            },
            {
                $lookup: {
                    from: "Subscription",
                    localField: "_id",
                    foreignField: "channel",
                    as: "subscribers"
                }
            },
            {
                $lookup: {
                    from: "Subscription",
                    localField: "_id",
                    foreignField: "subscriber",
                    as: "subscriberTo"
                }
            },
            {
                $addFields: {
                    subscribersCount: {
                        $size: "$subscribers"
                    },
                    channelsSubscriberedToCount: {
                        $size: "$subscriberTo"
                    },
                    isSubscribed: {
                        $condition: {
                            if: { $in: [req.user?._id, "$subscribers.subscriber"] },
                            then: true,
                            else: false
                        }
                    }
                }
            },
            {
                $project: {
                    userName: 1,
                    email: 1,
                    fullName: 1,
                    avatar: 1,
                    coverImage: 1,
                    subscribersCount: 1,
                    channelsSubscriberedToCount: 1,
                    isSubscribed: 1,
                }
            }

        ])

        if (!channel?.length) {
            res.status(400)
            throw new Error("Channel does not exists")
        }

        res.status(200).json({ message: "User Channel Data", channel: channel[0] })

    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateUserAccountDetails,
    getUserChannelProfile,
    updateUserAvatar
}