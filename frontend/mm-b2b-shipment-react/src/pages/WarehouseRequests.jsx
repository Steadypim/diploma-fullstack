import SidebarWithHeader from "../components/shared/SideBar.jsx";
import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {errorNotification} from "../services/notification.js";
import {SimpleGrid, Spinner, Text} from "@chakra-ui/react";
import {getWarehousesForStorageByUserEmail} from "../services/warehouseRequests.js";
import WarehouseRequestCard from "../components/reqeuests/WarehouseRequestCard.jsx";

const WarehouseRequests = () => {

    const [warehouses, setWarehouses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [, setError] = useState("");


    const fetchWarehousesForStorage = () => {
        setLoading(true);
        let token = localStorage.getItem("access_token");
        if (token) {
            token = jwtDecode(token);
            getWarehousesForStorageByUserEmail(token.sub).then(res => {
                setWarehouses(res.data)
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
        fetchWarehousesForStorage();
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

    if(warehouses.length <= 0){
        return (
            <SidebarWithHeader>
                <Text>У вас пока нет заявок</Text>
            </SidebarWithHeader>
        )
    }

    return (
        <SidebarWithHeader>
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                {warehouses.map((warehouse ) => (

                    <WarehouseRequestCard key={warehouse.warehouseId} warehouse={warehouse} fetchWarehousesForStorage={fetchWarehousesForStorage}/>

                ))}</SimpleGrid>
        </SidebarWithHeader>
    )
}

export default WarehouseRequests;