import axios from "axios"
export const detectCredits = async (userId, agent) => {
    try {
        const {data} = await axios.post(`${process.env.AUTH_SERVICE_URL}/detect-credits`, {userId, agent});
        console.log("data from detect credit in agent: ", data);

        return data;
        
    } catch (error) {
        console.log("error in fetch detect credit in agent: ", error.response?.data || error.message);
        throw error;
    }
}
