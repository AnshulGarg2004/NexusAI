import { getAuth } from "firebase-admin/auth"
import app from "../config/firebase.js";
import User from "../model/user.model.js";
import redis from "../../../shared/redis/redis.js";

const login = async (req, res) => {
    try {
        const { token } = req.body;
        const decoded = await getAuth(app).verifyIdToken(token);
        let user = await User.findOne({ firebaseUid: decoded.uid })

        if (!user) {
            user = await User.create({
                firebaseUid: decoded.uid,
                name: decoded.displayName,
                email: decoded.email,
                avatar: decoded.picture
            })

        }

        console.log("user: ", user);


        const sessionId = crypto.randomUUID();

        await redis.set(`session-${sessionId}`, JSON.stringify({
            userId: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
        }), "EX", 24 * 7 * 60 * 60);
        res.cookie("session", sessionId, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 24 * 7 * 60 * 60 * 1000
        })

        return res.status(200).json({ message: "user logged in", user });
    } catch (error) {
        console.log("error in login: ", error.message);

        return res.status(500).json({ message: "login error" })
    }
}


export const logout = async (req, res) => {
    try {
        const sessionId = req.cookies?.session
        await redis.del(`session-${sessionId}`);
        res.clearCookie("session")

        return res.status(200).json({message : "Logout successfully"})
    } catch (error) {
        console.log("error in logout: ", error.message);
        return res.status(500).json({message : "Error in logging out"})
           
    }
}

export const updateUserPayment = async (req, res) => {
    try {
        const {plan, credits, userId} = req.body;

        const user = await User.findOne(userId);

        if(!user) {
            return res.status(404).json({message : "user  not found "})
        }

        user.plan = plan;
        user.credits += credits;
        user.totlalCredits += credits;
        user.planExpiredAt = new Date(Date.now() + 30*24*60*60*1000);

        await user.save();

        const sessionId = req.cookies?.session
           await redis.set(`session-${sessionId}`, JSON.stringify({
            userId: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            plan : user.plan,
            credits : user.credits,
            totlalCredits : user.totlalCredits,
            planExpiredAt : user.planExpiredAt
        }), "EX", 24 * 7 * 60 * 60);

        return res.status(200).json({message : "user updated successfully", user});
    } catch (error) {
        console.log("err in user update payment control: ", error.message);
        return res.status(500).json({message : "update user payment error"})
    }
}

export default login;