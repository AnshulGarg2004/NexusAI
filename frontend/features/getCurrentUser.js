import api from "../utils/axios.js"

const getCurrentUser = async () => {
    try {
        const { data } = await api.get('/api/me');

        console.log("data in gcu: ", data);

    } catch (error) {
        log("error in get current user: ", error.message);
    }
}

export default getCurrentUser;