import express from 'express'
import { config } from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
// import { env, constants } from './src/config/constants.js'
import morgan from 'morgan'
// import v1Routes from './routes/v1'
import authRoutes from './src/routes/v1/auth.routes.js'
config();
const app = express();

/** Server configurations */
// logger

app.use(morgan('dev'))

// express middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


// security: XSS
app.use(helmet())
// security: CORS protection
app.use(cors({
    // origin: env.FRONTEND_URL
}))

// APP ROUTES

app.use("/", authRoutes)


// Error Handling

app.use((err, req, res, next) => {
    // extract status and messsage then return response to the user
    const { statusCode, message } = err
    return res.status(statusCode).send(message)
})
const { PORT } = process.env || 3000
app.listen(3000, () => {
    console.log(`server is running on port ${PORT}`);
})