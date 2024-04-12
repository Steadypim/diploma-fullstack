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

export const updateTransportationRequestStatus = async (shipmentId, email, statusesDTO) => {
    try {
        return await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/transportationRequest/${shipmentId}/${email}`,
            statusesDTO,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}