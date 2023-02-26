// import winston from 'winston';
// import Sentry from 'winston-transport-sentry-node'
// import { env } from './constants';

// const Sentryoptions = {
//     sentry: {
//         dsn: env.SENTRY_DSN
//     },
//     level: 'error'
// };

// const logger = winston.createLogger({
//     transports: [
//         new winston.transports.Console({
//             format: winston.format.combine(
//                 winston.format.colorize(),
//                 winston.format.simple()
//             )
//         })
//     ]
// })
// if (env.NODE_ENV === `production`) {
//     logger.add(
//         new Sentry(Sentryoptions)
//     )
// }

// export default logger