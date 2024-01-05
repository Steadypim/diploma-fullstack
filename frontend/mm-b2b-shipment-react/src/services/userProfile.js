import axios from "axios";

const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
})

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

export const saveUser = async (userProfile) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/user/register`,
            userProfile
        )
    } catch (e) {
        throw e;
    }
}