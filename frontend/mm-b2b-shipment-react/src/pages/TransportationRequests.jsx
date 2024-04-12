import {Box, Spinner, Text} from "@chakra-ui/react";
import SidebarWithHeader from "../components/shared/SideBar.jsx";
import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {errorNotification} from "../services/notification.js";
import {getTransportationRequestByUserEmail} from "../services/tranportationRequests.js";
import TransportationRequestCard from "../components/reqeuests/TransportationRequestCard.jsx";
import {useAuth} from "../components/context/AuthContext.jsx";

const TransportationRequests = () => {

    const [transportationRequests, setTransportationRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [, setError] = useState("");
    const {userProfile} = useAuth();

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

    const groupTransportationRequestsByShipmentId = (transportationRequests) => {
        const groupedRequests = new Map();

        // Проходимся по всем заявкам на транспортировку
        transportationRequests.forEach(transportationRequest => {
            const { shipmentId } = transportationRequest;

            // Если в группировке уже есть запись с таким shipmentId,
            // добавляем текущую заявку в соответствующий массив
            if (groupedRequests.has(shipmentId)) {
                groupedRequests.get(shipmentId).push(transportationRequest);
            } else {
                // Если записи с таким shipmentId еще нет,
                // создаем новый массив и добавляем в него текущую заявку
                groupedRequests.set(shipmentId, [transportationRequest]);
            }
        });

        return groupedRequests;
    };

    const groupedTransportationRequests = groupTransportationRequestsByShipmentId(transportationRequests);


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
            {Array.from(groupedTransportationRequests.entries()).map(([shipmentId, requests]) => (
                <Box key={shipmentId} mb={4}>
                    <TransportationRequestCard
                        email={userProfile?.email}
                        shipmentId={shipmentId}  // передаем shipmentId в карточку
                        transportationRequests={requests}  // передаем массив заявок в карточку
                        fetchTransportationRequest={fetchTransportationRequests}
                    />
                </Box>
            ))}
        </SidebarWithHeader>
    );
}

export default TransportationRequests;