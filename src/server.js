import express from "express";
import { config } from "dotenv";
import cors from "cors";
// // import helmet from 'helmet';
// // import passport from 'passport';
// // import { env, constants } from './src/config/constants'
import morgan from "morgan";
import prisma from "./config/prisma.js";
import v1Routes from "./routes/v1/auth.routes.js";
import catRoute from "./routes/v1/admin/category.routes.js";
import notFound from "./middlewares/notFoundMiddleware.js";
import errorHandlerMiddleware from "./middlewares/errorHandler.js";
import subCatRoute from "./routes/v1/admin/sub-Category.routes.js";
import { isAdmin, isAuthenticated } from "./middlewares/auth.js";

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
app.use(cors());

// Routes
app.use("/api/v1/auth", v1Routes);
app.use("/api/v1/admin", subCatRoute);
app.use("/api/v1/admin", catRoute);

// Not found middleware
app.use(notFound);

// ERROR handling
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`:rocket: server is running on port ${PORT}`);
});
