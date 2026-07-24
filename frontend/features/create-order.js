import api from "../utils/axios.js"

export const createOrder = async (payload) => {
    try {
        const {data} = await api.post('/api/billing/create-order', payload )
        console.log("data from create order: ", data);

        return data;
        
    } catch (error) {
        console.log("err in fetching data from create-order: ", error.message);
        return []
        
    }
}