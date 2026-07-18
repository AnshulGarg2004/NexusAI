import api from "../utils/axios"

export const sendMessage = async (payload) => {
    try {
        console.log("payload: ",payload);
        
        const { data } = await api.post('/api/agent/chat', payload)
        console.log("data from send-mess: ", data);

        return data

    } catch (error) {
        console.log("error in send -mess: ", error.message);
        return null;

    }
}