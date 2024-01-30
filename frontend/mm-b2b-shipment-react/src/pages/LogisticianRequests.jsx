import {Box, Spinner, Text} from "@chakra-ui/react";
import SidebarWithHeader from "../components/shared/SideBar.jsx";
import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {errorNotification} from "../services/notification.js";
import {getAllShipmentsByUserProfileEmail} from "../services/shipment.js";
import LogisticianRequestCard from "../components/reqeuests/LogisticianRequestCard.jsx";

const LogisticianRequests = () => {

    const [logisticianRequests, setLogisticianRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [, setError] = useState("");


    const fetchLogisticianRequests = () => {
        setLoading(true);
        let token = localStorage.getItem("access_token");
        if (token) {
            token = jwtDecode(token);
            getAllShipmentsByUserProfileEmail(token.sub).then(res => {
                setLogisticianRequests(res.data)
            }).catch(err => {
                setError(err.response.data.message)
                errorNotification(
                    err.code,
                    err.response.data.message
                )
            }).finally(() => {
                setLoading(false)
            })
        }
    }

    useEffect(() => {
        fetchLogisticianRequests();
    }, [])


    if (loading) {
        return (
            <SidebarWithHeader>
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
            </SidebarWithHeader>
        )
    }

    if (logisticianRequests.length <= 0) {
        return (
            <SidebarWithHeader>
                <Text>Вы пока не оставили ни одной заявки</Text>
            </SidebarWithHeader>
        )
    }

    return (
        <SidebarWithHeader>
            {logisticianRequests.map((logisticianRequests, index) => (
                <Box key={logisticianRequests.id} mb={4}>
                    <LogisticianRequestCard
                        key = {index}
                        logisticianRequest={logisticianRequests}
                        fetchLogisticianRequest={fetchLogisticianRequests}
                    />
                </Box>
            ))}
        </SidebarWithHeader>
    )
}

export default LogisticianRequests;