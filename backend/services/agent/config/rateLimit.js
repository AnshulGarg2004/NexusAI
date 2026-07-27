import redis from "../../../shared/redis/redis.js";

const Limits = {
    chat : 20,
    code : 5,
    pdf : 5,
    ppt : 5,
    image : 5,
    search : 5
}

export const checkLimit = async (userId, agent) => {
    const maxLimit = Limits[agent] || Limits["chat"];

    const key = `rate-${userId}:${agent}`;

    const count = await redis.incr(key);

    if(count === 1) {
        await redis.expire(key, 60);
    }

    const ttl = await redis.ttl(key);

    if(count > maxLimit) {
        const minutes = Math.floor(ttl/60);
        const secs = Math.floor(ttl % 60);
        const time = minutes > 0 ? `${minutes}m : ${secs}s` : `${secs}s`;

        const error = new Error(`Rate limit exceed for ${agent}.`);
        error.status = 429;
        error.data = {
            success : false,
            agent, 
            limit : maxLimit,
            remainingTime : ttl,
            retryAfter : time,
            message : `You have reached the ${agent} limit (${maxLimit} requests/minute). Try again in ${time}`
        }

        throw error;
    }


    return {
        remaining : Math.max(maxLimit - count, 0),
        limit : maxLimit
    }
   


}
