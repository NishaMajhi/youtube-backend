import { Router } from "express";
import userRouter from "./user.route.js";

const indexRouter = Router();

//user routes
indexRouter.use('/users', userRouter);

export default indexRouter