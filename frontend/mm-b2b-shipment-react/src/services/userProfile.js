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
    } catch (e) {
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

export const updateUser = async (email, updateDto) => {
    try {
        return await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/user/update/${email}`,
            updateDto,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const getUserProfileByEmail = async (email) => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/user/${email}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}
