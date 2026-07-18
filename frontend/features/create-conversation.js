import api from "../utils/axios.js";

export const createConversation = async () => {
    try {
        const {data} = await api.get('/api/chat/create-conversation');
        console.log("data in create-convo : ", data);
        // backend returns { message, conversation }
        return data.conversation || data;
        
    } catch (error) {
        console.log("error in creating cnvo : ", error.message);
        return [];
    }
}

