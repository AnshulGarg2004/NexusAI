import axios from "axios";
import { graph } from "../graph/graph.js";
import { addMessages } from "../config/memory.js";
import redis from "../../../shared/redis/redis.js";

export const agent = async (req, res) => {
    try {
        const { prompt, conversationId, agent }  = req.body?.payload || req.body || {};
     
        
        if (!prompt || !conversationId) {
            return res.status(400).json({ message: "prompt and conversationId are required" });
        }

        await axios.post(`${process.env.CHAT_SERVICE_URL}/save-message`, {
            conversationId, role : "user", content : prompt
        })
        
        const result = await graph.invoke({
            prompt, 
            conversationId,
            agent
        })

        console.log("result of agent: ", result);
        
        
        const response = result.aiResponse;

        console.log("resp ie res.aires : ", response);
        
        
        await addMessages(conversationId, "user", prompt);
        await addMessages(conversationId, "assistant", response);
        
        await axios.post(`${process.env.CHAT_SERVICE_URL}/save-message`, {
            conversationId, role : "assistant", content : response, images : result.images, artifacts : result.artifacts 
        })
        return res.status(200).json({
            answer : response,
            images : result.images,
            artifacts : result.artifacts
        })
        
    } catch (error) {
        console.log("agent error in chat: ", error.message);
        return res.status(500).json({message : "error in chat agent"})
        
    }
}