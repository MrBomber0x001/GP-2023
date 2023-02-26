import Redis from 'ioredis';
import { env } from './constants'

const client = new Redis({
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    password: env.REDIS_PASSWORD
})

client.on('connect', () => {
    logger.info('Redis connected');
})

client.on('error', () => {
    logger.error(err)
})


export default client