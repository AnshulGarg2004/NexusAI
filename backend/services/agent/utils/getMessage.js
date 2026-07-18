import axios from "axios"
export const getMessage = async(convoId) => {
    try {
        const {data} = await axios.get(`${process.env.CHAT_SERVICE_URL}/get-messages/${convoId}`);
        console.log("data from get-mess/convoid: ",data);
        return data;
    } catch (error) {
        console.log("error in data from get-mess/convoid: ", error.message);
        return null;
        
    }
}