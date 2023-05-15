import express from "express";
import { config } from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
// // import helmet from 'helmet';
// // import passport from 'passport';
// // import { env, constants } from './src/config/constants'
import morgan from "morgan";
import prisma from "./config/prisma.js";
import v1Routes from "./routes/v1/auth.routes.js";
import catRoute from "./routes/v1/admin/category.routes.js";
import storeServiceRoute from "./routes/v1/storeService.routes.js";
import laborServiceRoute from "./routes/v1/laborService.routes.js";
import notFound from "./middlewares/notFoundMiddleware.js";
import errorHandlerMiddleware from "./middlewares/errorHandler.js";
import subCatRoute from "./routes/v1/admin/sub-Category.routes.js";
import { isAdmin, isAuthenticated } from "./middlewares/auth.js";
import contracorServiceRoute from "./routes/v1/contractorService.routes.js";
import propertyServiceRoute from "./routes/v1/propertyService.routes.js";

config();

const app = express();

const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);
const projectDir = path.resolve(__dirname, "..");

/** Server configurations */
// logger

app.use(morgan("dev"));

// express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(projectDir, "src", "public")));

// security: XSS
// app.use(helmet())

// security: CORS protection
app.use(cors());

// Routes
app.use("/api/v1/auth", v1Routes);
app.use("/api/v1/admin", subCatRoute);
app.use("/api/v1/admin", catRoute);
app.use("/api/v1/service", storeServiceRoute);
app.use("/api/v1/service", laborServiceRoute);
app.use("/api/v1/service", contracorServiceRoute);
app.use("/api/v1/service", propertyServiceRoute);

// Not found middleware
app.use(notFound);

// ERROR handling
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`:rocket: server is running on port ${PORT}`);
});

