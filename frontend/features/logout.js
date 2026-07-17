import api from "../utils/axios.js"

export const logout = async () => {
    try {
        const {data} = await api.get('/api/auth/logout');
        console.log("data of logout: ", data);
        
        return data;
    } catch (error) {
        console.log("error in lgout");
        return ;
    }
}