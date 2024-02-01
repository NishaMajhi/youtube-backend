import { Router } from 'express'
import { loginUser, logoutUser, refreshAccessToken, registerUser } from '../controllers/user.controller.js'
import { uploadUser } from "../middlewares/multer.middleware.js"
import { verifyJWT } from '../middlewares/auth.middleware.js';


const userRouter = Router()

// userRouter.route('/register').post(
//     uploadUser.fields([
//         {
//             name: "avatar",
//             maxCount: 1
//         }]),
//     registerUser)


userRouter.post('/register', uploadUser.fields([
    {
        name: "avatar",
        maxCount: 1
    }]),
    registerUser);


userRouter.post('/login', loginUser)
userRouter.post('/logout', verifyJWT, logoutUser)
userRouter.post('/refresh-token', refreshAccessToken)

export default userRouter