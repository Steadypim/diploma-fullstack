import {Box, Spinner, Text} from "@chakra-ui/react";
import SidebarWithHeader from "../components/shared/SideBar.jsx";
import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {errorNotification} from "../services/notification.js";
import {getTransportationRequestByUserEmail} from "../services/tranportationRequests.js";
import TransportationRequestCard from "../components/reqeuests/TransportationRequestCard.jsx";

const TransportationRequests = () => {

    const [transportationRequests, setTransportationRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [, setError] = useState("");


    const fetchTransportationRequests = () => {
        setLoading(true);
        let token = localStorage.getItem("access_token");
        if (token) {
            token = jwtDecode(token);
            getTransportationRequestByUserEmail(token.sub).then(res => {
                setTransportationRequests(res.data)
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
        fetchTransportationRequests();
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

    if (transportationRequests.length <= 0) {
        return (
            <SidebarWithHeader>
                <Text>У вас пока нет заявок</Text>
            </SidebarWithHeader>
        )
    }

    return (
        <SidebarWithHeader>
            {transportationRequests.map((transportationRequest, index) => (
                <Box key={transportationRequest.id} mb={4}>
                    <TransportationRequestCard
                        key = {index}
                        transportationRequest={transportationRequest}
                        fetchTransportationRequest={fetchTransportationRequests}
                    />
                </Box>
            ))}
        </SidebarWithHeader>
    )
}

export default TransportationRequests;