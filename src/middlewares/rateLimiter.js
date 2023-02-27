import { RateLimiterPostgres, RateLimiterRedis } from 'rate-limiter-flexible'
import { tooManyRequests } from '@hapi/boom'
import redisClient from '../config/redis';

const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    duration: 1,
    blockDuration,
    points,
    keyPrefix,
})

/**
 * @Author Yousef Meska
 * @desc Rate Limiting Middleware
 */
export default rateLimiterMiddleware = (req, res, next) => {
    rateLimiter.consume(req.ip).then(rateLimiterRes => {
        res.set({
            "Retry-After": rateLimiterRes.msBeforeNext / 1000,
            "X-RateLimit-Limit": 10,
            "X-RateLimit-Remaining": rateLimiterRes.remainingPoints,
            "X-RateLimit-Reset": new Date(Date.now() + rateLimiterRes.msBeforeNext)
        })

        next();
    }).catch(rateLimiterRes => {
        res.set({
            "Retry-After": rateLimiterRes.msBeforeNext / 1000,
            "X-RateLimit-Limit": 10,
            "X-RateLimit-Remaining": rateLimiterRes.remainingPoints,
            "X-RateLimit-Reset": new Date(Date.now() + rateLimiterRes.msBeforeNext)
        })
        next(tooManyRequests())
    })
}

