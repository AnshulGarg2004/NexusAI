import api from "../utils/axios"

export const getMessage = async (conversationId) => {
   
    try {
        if(!conversationId) {
            console.log("conv id not found");
            return [];
        }
        const {data} = await api.get(`/api/chat/get-messages/${conversationId}`);
        console.log("mess from get mess: ", data);
        return data.messages || [];
        
    } catch (error) {
        console.log("error in get mess: ", error.message);
        return [];
    }
}