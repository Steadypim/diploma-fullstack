import axios from "axios";

export const login = async (usernameAndPassword) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
            usernameAndPassword
        )
    } catch (e){
        throw e;
    }
}