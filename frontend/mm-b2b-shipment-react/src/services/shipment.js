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