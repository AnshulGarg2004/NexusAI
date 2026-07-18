import axios from "axios";
import { graph } from "../graph/graph.js";

export const agent = async (req, res) => {
    try {
        const { prompt, conversationId }  = req.body?.payload || req.body || {};

        
        if (!prompt || !conversationId) {
            return res.status(400).json({ message: "prompt and conversationId are required" });
        }
        await axios.post(`${process.env.CHAT_SERVICE_URL}/save-message`, {
            conversationId, role : "user", content : prompt
        })
        
        const result = await graph.invoke({
            prompt, 
            conversationId
        })
        
        const response = result.aiResponse;
        await axios.post(`${process.env.CHAT_SERVICE_URL}/save-message`, {
            conversationId, role : "assistant", content : response
        })
        return res.status(200).json(response)
        
    } catch (error) {
        console.log("agent error in chat: ", error.message);
        return res.status(500).json({message : "error in chat agent"})
        
    }
}