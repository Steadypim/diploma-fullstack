import axios from "axios";

const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
})

export const saveShipment = async (shipment, email) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/shipment/${email}`,
            shipment,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const getAllShipmentsByUserProfileEmail = async (email) => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/shipment/all/${email}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const updateStatuses = async (id, statusesDTO) => {
    try {
        return await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/shipment/${id}`,
            statusesDTO,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const getShipmentById = async(id)=> {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/shipment/${id}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}