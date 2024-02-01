import { Router } from "express";
import { userRouter } from "./user.route.js";
import { commentRouter } from "./comment.route.js";
import { videoRouter } from "./video.route.js";
import { likeRouter } from "./like.route.js";
import { tweetRouter } from "./tweet.route.js";
import { playlistRouter } from "./playlist.route.js";
import { subscriptionRouter } from "./subscription.model.js";

const indexRouter = Router();

//routes
indexRouter.use('/users', userRouter);
indexRouter.use('/comments', commentRouter);
indexRouter.use('/videos', videoRouter);
indexRouter.use('/likes', likeRouter);
indexRouter.use('/tweets', tweetRouter);
indexRouter.use('/playlists', playlistRouter);
indexRouter.use('/subscriptions', subscriptionRouter)


export default indexRouter