import {Box, Spinner, Text} from "@chakra-ui/react";
import SidebarWithHeader from "../components/shared/SideBar.jsx";
import {useEffect, useState} from "react";
import {getTransportationRoutesByUserEmail} from "../services/transportationRoute.js";
import HorizontalTransportationRouteCard
    from "../components/transportationroute/card/HorizontalTransportationRouteCard.jsx";
import {errorNotification} from "../services/notification.js";
import {jwtDecode} from "jwt-decode";
import CreateTransportationRouteDrawer from "../components/transportationroute/CreateTransportationRouteDrawer.jsx";

const TransportationRoutes = () => {

    const [transportationRoutes, setTransportationRoutes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [, setError] = useState("");


    const fetchTransportationRoutes = () => {
        setLoading(true);
        let token = localStorage.getItem("access_token");
        if (token) {
            token = jwtDecode(token);
            getTransportationRoutesByUserEmail(token.sub).then(res => {
                setTransportationRoutes(res.data)
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
        fetchTransportationRoutes();
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

    if(transportationRoutes.length <= 0){
        return (
            <SidebarWithHeader>
                <CreateTransportationRouteDrawer
                    fetchTransportationRoutes={fetchTransportationRoutes}
                />
                <Text>Вы еще не создали ни одной перевозки</Text>
            </SidebarWithHeader>
        )
    }

    return (
        <SidebarWithHeader>
            <Box mb={4}><CreateTransportationRouteDrawer
                fetchTransportationRoutes={fetchTransportationRoutes}
            /></Box>
            {transportationRoutes.map((transportationRoute, index ) => (
                <Box key={transportationRoute.id} mb={4}>
                <HorizontalTransportationRouteCard key = {index}
                                                   sourceWarehouseName={transportationRoute.sourceWarehouseName}
                                                   destinationWarehouseName={transportationRoute.destinationWarehouseName}
                                                   transportName={transportationRoute.transportName}
                                                   price={transportationRoute.price}
                                                   id={transportationRoute.id}
                                                   fetchTransportationRoutes={fetchTransportationRoutes}
                /> </Box>
            ))}
        </SidebarWithHeader>
    )
}

export default TransportationRoutes;