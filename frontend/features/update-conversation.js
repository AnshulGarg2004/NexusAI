import api from "../utils/axios.js";

export const updateConversation = async (payload) => {
    try {
        const {data} = await api.post('/api/chat/update-conversation', payload);
        console.log("data in update-convo : ", data);

        return data.conversation || data;
        
    } catch (error) {
        console.log("error in updating  cnvo : ", error.message);
        return [];
    }
}

