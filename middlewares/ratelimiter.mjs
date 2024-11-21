import { TokenBucket } from '../strategies/tokenBucket.mjs';
import rateLimitConfig from '../configs/tokenBucketConfig.mjs';

const rateLimitersForEndpoint = Object.keys(rateLimitConfig).reduce((acc, val) => {
    const { bucketSize, refillRateInSec } = rateLimitConfig[val];
    acc[val] = new TokenBucket(bucketSize, refillRateInSec);
    return acc;
}, {});

export function apiRateLimiter() {
    return function rateLimit(req, res, next) {
        const normalizedUrl = req.url.toLowerCase();
        if (!rateLimitConfig[normalizedUrl]) return next();

        if (!rateLimitersForEndpoint[normalizedUrl].allowRequest()) {
            return res.status(429).json({
                message: "Too many requests",
                error: "RateLimitError",
            })
        }
        return next();
    }
};
