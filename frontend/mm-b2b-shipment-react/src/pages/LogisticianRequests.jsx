import {Box, HStack, Input, InputGroup, InputLeftElement, Spinner, Tag, Text} from "@chakra-ui/react";
import SidebarWithHeader from "../components/shared/SideBar.jsx";
import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {errorNotification} from "../services/notification.js";
import {getAllShipmentsByUserProfileEmail} from "../services/shipment.js";
import LogisticianRequestCard from "../components/reqeuests/LogisticianRequestCard.jsx";
import {CiSearch} from "react-icons/ci";
import {getUserProfileByEmail} from "../services/userProfile.js";

const LogisticianRequests = () => {

    const [logisticianRequests, setLogisticianRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [tagVariant, setTagVariant] = useState("outline");
    const [userProfile, setUserProfile] = useState([]);

    const fetchUserProfile = () => {
        setLoading(true);
        let token = localStorage.getItem("access_token");
        if (token) {
            token = jwtDecode(token);
            getUserProfileByEmail(token.sub).then(res => {
                setUserProfile(res.data)
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
        fetchUserProfile();
    }, [])


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

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const statusTranslation = {
        'PENDING': {text: 'Ожидает подтверждения', colorScheme: 'gray'},
        'APPROVED': {text: 'Подтверждена', colorScheme: 'yellow'},
        'REJECTED': {text: 'Отклонена', colorScheme: 'red'},
        'PAID': {text: 'Оплачена', colorScheme: 'green'},
    }

    const filteredRequests = logisticianRequests.filter(logisticianRequest => {
        const sourceCity = logisticianRequest.sourceWarehouse.address.city.toLowerCase();
        const destinationCity = logisticianRequest.destinationWarehouse.address.city.toLowerCase();
        const searchText = searchTerm.toLowerCase();
        const statusMatches = !selectedStatus || logisticianRequest.requestStatus === selectedStatus;
        const routeMatches = sourceCity.includes(searchText) || destinationCity.includes(searchText);
        return statusMatches && routeMatches;
    });



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

    if (logisticianRequests.length <= 0) {
        return (
            <SidebarWithHeader>
                <Text>Вы пока не оставили ни одной заявки</Text>
            </SidebarWithHeader>
        )
    }

    return (
        <SidebarWithHeader>
            {userProfile.userStatus === 'INACTIVE' ? (
                <Text fontSize="3xl" textAlign="center" as='em'>
                    Пожалуйста, заполните и отправьте заявку на сотрудничество с нашей компанией на указанную электронную почту, скачав её на главной странице.
                    После рассмотрения вашей заявки, мы предоставим вам доступ к управлению заявками.
                    Благодарим за ваше внимание и сотрудничество.
                </Text>
            ) : (
                <>
                    <InputGroup mb={'10px'}>
                        <InputLeftElement pointerEvents="none" children={<CiSearch color="gray.300" />} />
                        <Input type="text" placeholder="Поиск по маршрутам" value={searchTerm} onChange={handleSearchChange} />
                    </InputGroup>
                    <HStack spacing={4} mb={'10px'}>
                        {Object.entries(statusTranslation).map(([statusKey, {text, colorScheme}]) => (
                            <Tag
                                key={statusKey}
                                size="lg"
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

                    {filteredRequests.map((logisticianRequest, index) => (
                        <Box key={logisticianRequest.id} mb={4}>
                            <LogisticianRequestCard
                                key={index}
                                logisticianRequest={logisticianRequest}
                                fetchLogisticianRequest={fetchLogisticianRequests}
                            />
                        </Box>
                    ))}
                </>
            )}
        </SidebarWithHeader>
    )
}

export default LogisticianRequests;