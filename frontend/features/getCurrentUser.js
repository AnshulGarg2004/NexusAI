import api from "../utils/axios.js"

const getCurrentUser = async () => {
    try {
        const { data } = await api.get('/api/me');

        console.log("data in gcu: ", data);
        return data;

    } catch (error) {
        console.log("error in get current user: ", error.message);
        return null;
        
    }
}

export default getCurrentUser;