import express from "express";
import { config } from "dotenv";
// import cors from 'cors';
// // import helmet from 'helmet';
// // import passport from 'passport';
// // import { env, constants } from './src/config/constants'
import morgan from "morgan";
import prisma from "./src/config/prisma.js";
import v1Routes from "./src/routes/v1/auth.routes.js";

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

// ERROR handling

const { PORT } = process.env || 3000;
app.listen(3000, () => {
    console.log(`:rocket: server is running on port ${PORT}`);
});

