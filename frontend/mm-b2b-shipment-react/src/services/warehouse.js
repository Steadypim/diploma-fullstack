import axios from "axios";

const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
})
export const saveWarehouse = async (warehouse) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/warehouse/create`,
            warehouse,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}