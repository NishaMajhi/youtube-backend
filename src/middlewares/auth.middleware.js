import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js';

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {

        // const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        const token = req.header("Authorization").split(' ')[1] || req.cookies?.accessToken;

        if (!token) {
            res.status(401)
            throw new Error("Unauthorized User Request")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if (!user) {
            res.status(400)
            throw new Error("Invalid Access Token")
        }

        req.user = user
        next();

    } catch (error) {
        res.status(401)
        throw new Error("Error in JWT Verify")
    }
})