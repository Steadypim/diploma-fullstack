import axios from "axios";

const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
})

export const getTransportationRequestByUserEmail = async (email) => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/transportationRequest/${email}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const updateTransportationRequestStatus = async (id, statusDto) => {
    try {
        return await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/transportationRequest/${id}`,
            statusDto,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}