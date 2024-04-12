import axios from "axios";

const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
})

export const getWarehousesForStorageByUserEmail = async (email) => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/storage/${email}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const updateStorageStatus = async (shipmentId, email, statusesDTO) => {
    try {
        return await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/storage/${shipmentId}/${email}`,
            statusesDTO,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}