import express from 'express'
import { config } from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import { env, constants } from './src/config/constants'
import morgan from 'morgan'
import v1Routes from './routes/v1'
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
    origin: env.FRONTEND_URL
}))



app.use("/v1", v1Routes)
const PORT = process.env || 3000
app.listen(3000, () => {
    console.log(`:rocket: server is running on port ${PORT}`);
})