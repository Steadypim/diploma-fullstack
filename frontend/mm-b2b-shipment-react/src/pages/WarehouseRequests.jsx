import SidebarWithHeader from "../components/shared/SideBar.jsx";
import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {errorNotification} from "../services/notification.js";
import {Box, SimpleGrid, Spinner, Text} from "@chakra-ui/react";
import {getWarehousesForStorageByUserEmail} from "../services/warehouseRequests.js";
import WarehouseRequestCard from "../components/reqeuests/WarehouseRequestCard.jsx";
import TransportationRequestCard from "../components/reqeuests/TransportationRequestCard.jsx";
import {useAuth} from "../components/context/AuthContext.jsx";

const WarehouseRequests = () => {

    const [warehouses, setWarehouses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [, setError] = useState("");
    const {userProfile} = useAuth();


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

    const groupStorageRequestsByShipmentId = (warehouses) => {
        const groupedRequests = new Map();

        // Проходимся по всем заявкам на транспортировку
        warehouses.forEach(warehouse => {
            const { shipmentId } = warehouse;

            // Если в группировке уже есть запись с таким shipmentId,
            // добавляем текущую заявку в соответствующий массив
            if (groupedRequests.has(shipmentId)) {
                groupedRequests.get(shipmentId).push(warehouse);
            } else {
                // Если записи с таким shipmentId еще нет,
                // создаем новый массив и добавляем в него текущую заявку
                groupedRequests.set(shipmentId, [warehouse]);
            }
        });

        return groupedRequests;
    };

    const groupedStorageRequests = groupStorageRequestsByShipmentId(warehouses);

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
            {Array.from(groupedStorageRequests.entries()).map(([shipmentId, requests]) => (
                <Box key={shipmentId} mb={4}>
                    <WarehouseRequestCard
                        email={userProfile?.email}
                        shipmentId={shipmentId}  // передаем shipmentId в карточку
                        storageRequests={requests}  // передаем массив заявок в карточку
                        fetchWarehousesForStorage={fetchWarehousesForStorage}
                    />
                </Box>
            ))}
        </SidebarWithHeader>
    )
}

export default WarehouseRequests;