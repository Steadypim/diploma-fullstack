import SidebarWithHeader from "../components/shared/SideBar.jsx";
import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {errorNotification} from "../services/notification.js";
import {Box, HStack, Input, InputGroup, InputLeftElement, SimpleGrid, Spinner, Tag, Text} from "@chakra-ui/react";
import {getWarehousesForStorageByUserEmail} from "../services/warehouseRequests.js";
import WarehouseRequestCard from "../components/reqeuests/WarehouseRequestCard.jsx";
import TransportationRequestCard from "../components/reqeuests/TransportationRequestCard.jsx";
import {useAuth} from "../components/context/AuthContext.jsx";
import {CiSearch} from "react-icons/ci";

const WarehouseRequests = () => {

    const [warehouses, setWarehouses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [, setError] = useState("");
    const {userProfile} = useAuth();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [tagVariant, setTagVariant] = useState("outline");


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

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const statusTranslation = {
        'PENDING': {text: 'Ожидает подтверждения', colorScheme: 'gray'},
        'APPROVED': {text: 'Подтверждена', colorScheme: 'yellow'},
        'REJECTED': {text: 'Отклонена', colorScheme: 'red'},
        'PAID': {text: 'Оплачена', colorScheme: 'green'},
    }

    const filteredRequests = Array.from(groupedStorageRequests.entries()).filter(([shipmentId, requests]) =>
                                                                                            requests.some(request => {
                                                                                                const sourceCity = request.address.city.toLowerCase();
                                                                                                const searchText = searchTerm.toLowerCase();
                                                                                                const statusMatches = !selectedStatus || request.requestStatus === selectedStatus; // Если не выбран статус, игнорируем его при фильтрации
                                                                                                const warehouseMathes = sourceCity.includes(searchText);
                                                                                                return statusMatches && warehouseMathes;
                                                                                            })
    );


    const handleStatusChange = (status) => {
        // Если выбран тот же статус, снимаем его
        if (selectedStatus === status) {
            setSelectedStatus("");
            setTagVariant("outline");
        } else {
            setSelectedStatus(status);
            setTagVariant("solid");
        }
    };



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
            <InputGroup mb={'10px'}>
                <InputLeftElement pointerEvents="none" children={<CiSearch color="gray.300" />} />
                <Input type="text" placeholder="Поиск по складам" value={searchTerm} onChange={handleSearchChange} />
            </InputGroup>
            <HStack spacing={4} mb={'10px'}>
                {Object.entries(statusTranslation).map(([statusKey, {text, colorScheme}]) => (
                    <Tag
                        key={statusKey}
                        size="md"
                        variant={selectedStatus === statusKey ? "solid" : "outline"}
                        colorScheme={colorScheme}
                        onClick={() => handleStatusChange(statusKey)}
                        cursor="pointer"
                        _selected={{color: "white", bg: colorScheme}}
                        isSelected={selectedStatus === statusKey}
                    >
                        {text}
                    </Tag>
                ))}
            </HStack>
            {filteredRequests.map(([shipmentId, requests]) => (
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