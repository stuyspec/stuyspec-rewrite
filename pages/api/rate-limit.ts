import rateLimit from 'express-rate-limit'
import slowDown from 'express-slow-down'
const applyMiddleware = (middleware:any) => (request:any, response:any) => 
  new Promise((resolve, reject) => {
    middleware(request, response, (result:any) =>
      result instanceof Error ? reject(result) : resolve(result)
    )
  })
//IP is hidden
const getIP = (request:any) =>
  request.ip ||
  request.headers['x-forwarded-for'] ||
  request.headers['x-real-ip'] ||
  request.connection.remoteAddress ||
  request.clientIp

export const getRateLimitMiddlewares = ({
  //limit = 1000,
  limit = 11,
  windowMs = 60 * 1000,
  delayAfter = 400,
  delayMs = (hits:any) => hits * 100,//change delay increments
  //delayMs = 500,
  //maxDelayMs = 4000,
  maxDelayMs = 1000,//change max delay ms
  handler = function (request:any, response:any) {
    const dummyData = { limit: 5, used: 5, remaining: -1, reset: '' }
    return response.status(429).json(dummyData);
  }
} = {}) => [
  slowDown({ keyGenerator: getIP, windowMs, delayAfter, delayMs }),
  rateLimit({ keyGenerator: getIP, windowMs, max: limit, handler: handler }),
]

async function applyRateLimit( request:any , response:any) {
  await Promise.all(
    middlewares
      .map(applyMiddleware)
      .map(middleware => middleware(request, response))
  )
}

//export default applyRateLimit

const middlewares = getRateLimitMiddlewares({ limit: 11 }).map(applyMiddleware) // change max amount of limits for all

export default async function handler(req:any, res:any) {

  console.log(`rate-limit(IP: ${req.getIP}) called`)
  try {
    await Promise.all(
      middlewares.map(middleware => middleware(req, res))
    )
  } catch {
    console.log('rate-limit() catch called')
    const dummyData = { limit: 5, used: 5, remaining: -1, reset: '' }
    return res.status(429).json(dummyData);
  }
  const rateLimitValues = {
    limit: req['rateLimit']['limit'],
    used: req['rateLimit']['used'],
    remaining: req['rateLimit']['remaining'],
    reset: req['rateLimit']['resetTime']
  }
  //console.log('parsed ratelimit:', rateLimitValues)
  return res.status(200).json(rateLimitValues);
}
