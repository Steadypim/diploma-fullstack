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

export const getWarehousesByUserEmail = async (email) => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/warehouse/all/${email}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const deleteWarehouse = async (id) => {
    try {
        return await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/warehouse/${id}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const updateWarehouse = async (warehouse, id) => {
    try {
        return await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/warehouse/${id}`,
            warehouse,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}
