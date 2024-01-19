import axios from "axios";

const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
})
export const saveWarehouse = async (warehouse, email) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/warehouse/${email}`,
            warehouse,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const getAllWarehouses = async () => {
    try{
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/warehouse`,
            getAuthConfig()
        )
    }catch (e) {
        throw e;
    }
}