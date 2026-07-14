import axios from "axios";
import { graph } from "../graph/graph";

export const agent = async (req, res) => {
    try {
        const { prompt, conversationId } = req.body;
         await axios.post(`${process.env.CHAT_SERVICE_URL}/save-message`, {
            conversationId, role : "user", content : prompt
        })
        const result = await graph.invoke({
            prompt, 
            conversationId
        })

        const response = result.aiResponse;
        return res.status(200).json(response)
        
    } catch (error) {
        console.log("agent error in chat: ", error.message);
        return res.status(500).json({message : "error in chat agent"})
        
    }
}