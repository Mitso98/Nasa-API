const rateLimit = require("express-rate-limit");

const rateLimitInfoMap = new Map();

const emailVerificationLimiter = rateLimit({
  windowMs: 15 * 1000,
  max: 3,
  keyGenerator: (req) => {
    return req.body.email;
  },
  handler: (req, res, next) => {
    const email = req.body.email;
    const retryAfter = res.get("Retry-After");
    rateLimitInfoMap.set(email, {
      rateLimitExceededAt: Date.now(),
      retryAfter: retryAfter,
    });
    res.status(429).json({
      msg: "You have exceeded the rate limit for email verification. Please try again later.",
      retryAfter: retryAfter,
    });
    // reset
    setTimeout(() => {
      rateLimitInfoMap.delete(email);
    }, retryAfter * 1000);
  },
});

module.exports = { emailVerificationLimiter, rateLimitInfoMap };
