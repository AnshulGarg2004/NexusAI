
import api from "../utils/axios"

export const getConversation = async () => {
    try {
        const {data} = await api.get('/api/chat/get-conversations');
        console.log("data of get-convos: ", data);

       return data.conversation;
        
    } catch (error) {
        console.log("error in fething get convos: ", error.message);
        return [];   
    }
} 