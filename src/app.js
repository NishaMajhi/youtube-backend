import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import indexRouter from './routes/index.route.js';
import { errorHandler } from './utils/errorHandler.util.js';

const app = express();


//configurations - every middleware has some option also 

// 1. cors() - for cross origin resource sharing
app.use(cors());

// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,

// }));

// 2. express.json() - for accepting json data from request body
app.use(express.json({ limit: "16kb" }));
//3. express.urlencoded() - for accepting data from request params
//  extended is use to accept data as Object inside Object (nesting of Objects)
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// 4. express.static() - for kepping public data in my server (images, file, svg etc.)
app.use(express.static('./'))
//5. cookie-parser() - to store and perform CURD operation on client cookie by server only, with the help of this middleware our will the only one who can read and write client cookie
app.use(cookieParser())



//api index path
app.use('/api/v1/', indexRouter);


//custom async handler
app.use(errorHandler);


export default app;