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

export const updateStorageStatus = async (id, statusDto) => {
    try {
        return await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/storage/${id}`,
            statusDto,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}