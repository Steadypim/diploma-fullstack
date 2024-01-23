import {Box, SimpleGrid, Spinner, Text} from "@chakra-ui/react";
import SidebarWithHeader from "../components/shared/SideBar.jsx";
import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {getWarehousesByUserEmail} from "../services/warehouse.js";
import {errorNotification} from "../services/notification.js";
import CreateWarehouseDrawer from "../components/warehouse/CreateWarehouseDrawer.jsx";
import WarehouseCard from "../components/warehouse/card/WarehouseCard.jsx";
import {getTransportByUserEmail} from "../services/transport.js";
import CreateTransportDrawer from "../components/transport/CreateTransportDrawer.jsx";
import TransportCard from "../components/transport/card/TransportCard.jsx";

const Transport = () => {

    const [transports, setTransports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [, setError] = useState("");


    const fetchTransports = () => {
        setLoading(true);
        let token = localStorage.getItem("access_token");
        if (token) {
            token = jwtDecode(token);
            getTransportByUserEmail(token.sub).then(res => {
                setTransports(res.data)
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
        fetchTransports();
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

    if(transports.length <= 0){
        return (
            <SidebarWithHeader>
                <CreateTransportDrawer
                    fetchTransports={fetchTransports}
                />
                <Text>Вы еще не добавили ни один транспорт</Text>
            </SidebarWithHeader>
        )
    }

    return (
        <SidebarWithHeader>
            <Box mb={4}><CreateTransportDrawer
                fetchTransports={fetchTransports}
            /></Box>
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                {transports.map((transport ) => (

                   <TransportCard transport={transport} fetchTansports={fetchTransports} key={transport.id}/>

                ))}</SimpleGrid>
        </SidebarWithHeader>
    )
}

export default Transport;