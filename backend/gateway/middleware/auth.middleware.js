import redis from "../../shared/redis/redis.js";

const protect = async (req, res, next) => {
    try {
        const sessionId = await req.cookies.session;
        console.log("sesid: ", sessionId);
        
        if(!sessionId) {
            return res.status(400).json({message : "Unauthorised access"});
        }
        const session = await redis.get(`session-${sessionId}`);
        if(!session) {
            return res.status(400).json({message : "Session not found"});
        }
        req.user = JSON.parse(session);

        next();
        
    } catch (error) {
        console.log("error in middleware: ", error.message);
        return res.status(500).json({message : `error in middleware:  ${error.message}`});
        
    }
}

export default  protect;