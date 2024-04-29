import axios from "axios";

const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
})

export const getTransportByUserEmail = async (email) => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/transport/all/${email}`,
            getAuthConfig()
        )
    } catch (e){
        throw e;
    }
}

export const saveTransport = async (transport, email) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/transport/${email}`,
            transport,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const deleteTransport = async (id) => {
    try {
        return await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/transport/${id}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const deleteTransportByStatus = async (id) => {
    try {
        return await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/transport/status/${id}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const updateTransport = async (transport, id) => {
    try {
        return await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/transport/${id}`,
            transport,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}
