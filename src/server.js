import express from "express";
import { config } from "dotenv";
// import cors from 'cors';
// // import helmet from 'helmet';
// // import passport from 'passport';
// // import { env, constants } from './src/config/constants'
import morgan from "morgan";
import prisma from "./config/prisma.js";
import v1Routes from "./routes/v1/auth.routes.js";
import notFound from "./middlewares/notFoundMiddleware.js";
import errorHandlerMiddleware from "./middlewares/errorHandler.js";

config();

const app = express();

/** Server configurations */
// logger

app.use(morgan("dev"));

// express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// security: XSS
// app.use(helmet())
// security: CORS protection
// app.use(cors({
//     // origin: env.FRONTEND_URL
// }))

// Routes
app.use("/api/v1/auth", v1Routes);

// Not found middleware
app.use(notFound);

// ERROR handling
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`:rocket: server is running on port ${PORT}`);
});

