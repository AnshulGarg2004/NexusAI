import api from "../utils/axios.js"

const verifyPayment = async(payload) => {
    try {
        const {data} = await api.post('/api/billing/verify-payment', payload);
        console.log("data from verify-payment: ", data);

        return data;
        
    } catch (error) {
        console.log("error in fetching data from verify payment: ", error.message);
        return [];
    }
}

export default verifyPayment;
