import axios from "axios";

const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
})

export const getTransportationRoutesByUserEmail = async (email) => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/transportationRoute/all/${email}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}


export const saveTransportationRoute = async (transportationRoute, email) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/transportationRoute/${email}`,
            transportationRoute,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const updateTransportationRoute = async (transportationRoute, id) => {
    try {
        return await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/transportationRoute/${id}`,
            transportationRoute,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}


export const deleteTransportationRoute = async (id) => {
    try {
        return await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/transportationRoute/${id}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const deleteTransportationRouteByStatus = async (id) => {
    try {
        return await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/transportationRoute/status/${id}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}