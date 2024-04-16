import {GiCargoShip, GiCommercialAirplane} from "react-icons/gi";
import {FaTrain} from "react-icons/fa";
import {FaTruckFast} from "react-icons/fa6";
import {
    Badge, Box,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Heading,
    Stack,
    Stat,
    StatHelpText,
    StatLabel,
    StatNumber,
    Text
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import AcceptButton from "../button/AcceptButton.jsx";
import DeclineButton from "../button/DeclineButton.jsx";
import {updateTransportationRequestStatus} from "../../services/tranportationRequests.js";
import {jwtDecode} from "jwt-decode";
import {getAllShipmentsByUserProfileEmail, getShipmentById} from "../../services/shipment.js";
import {errorNotification} from "../../services/notification.js";
import RequestInfo from "../button/RequestInfo.jsx";

export default function TransportationRequestCard({
                                                      shipmentId,
                                                      transportationRequests,
                                                      fetchTransportationRequest,
                                                      email
                                                  }) {
    const [shipment, setShipment] = useState([]);
    const [loading, setLoading] = useState(false);
    const [, setError] = useState("");

    const fetchShipment = () => {
        setLoading(true);
        let token = localStorage.getItem("access_token");
        if (token) {
            getShipmentById(shipmentId).then(res => {
                setShipment(res.data)
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
        fetchShipment();
    }, [])

    const transportIcons = {
        SHIP: <GiCargoShip/>,
        TRAIN: <FaTrain/>,
        CAR: <FaTruckFast/>,
        PLANE: <GiCommercialAirplane/>,
    };

    const statusTranslation = {
        'PENDING': {text: 'Ожидает подтверждения', colorScheme: 'gray'},
        'APPROVED': {text: 'Подтверждена', colorScheme: 'yellow'},
        'REJECTED': {text: 'Отклонена', colorScheme: 'red'},
        'PAID': {text: 'Оплачена', colorScheme: 'green'},
    }
    // Переменная для хранения суммарной цены всех перевозок
    let totalPrice = 0;

    // Массив для хранения строк с маршрутами
    const routeStrings = [];

    transportationRequests.forEach((transportationRequest, index) => {
        const {sourceWarehouse, destinationWarehouse, price, transport} = transportationRequest;

        // Добавляем цену каждой перевозки к суммарной цене
        totalPrice += price;

        // Формируем строку с маршрутом и добавляем ее в массив
        const routeString = (
            <Text key={index} display="flex" alignItems="center">
                {/* Иконка транспорта */}
                <Box mr={2}>
                    {transportIcons[transport.transportType] || transport.transportType}
                </Box>

                {/* Разделитель между иконкой и текстом маршрута */}
                {' '}

                {/* Текст маршрута */}
                {sourceWarehouse.address.city} ⟶ {destinationWarehouse.address.city}
            </Text>
        );
        routeStrings.push(routeString);
    });


    // Форматируем суммарную цену
    const formattedTotalPrice = (totalPrice * shipment.weight).toLocaleString('ru-RU', {
        style: 'currency',
        currency: 'RUB'
    });

    // Определяем статус
    const status = statusTranslation[transportationRequests[0]?.requestStatus] || {
        text: 'Unknown',
        colorScheme: 'gray'
    };

    // Возвращаем карточку
    return (
        <Card
            direction={{base: 'column', sm: 'row'}}
            overflow='hidden'
            variant={"outline"}
            boxShadow="lg"
            borderColor="gray.200"
            borderRadius="md"
            bgGradient="linear(to-r, whiteAlpha.50, blackAlpha.50)"
            color="white"
            size={'sm'}
        >
            <Stack spacing={0}>
                {/* Заголовок */}
                <CardHeader>
                    <Heading size='md'>Заявка на перевозку</Heading>
                    <Badge colorScheme={status.colorScheme}>
                        {status.text}
                    </Badge>
                </CardHeader>

                {/* Тело карточки */}
                <CardBody>
                    {/* Суммарная цена */}
                    <Stat>
                        <StatLabel fontSize={'16px'}>Суммарная цена: </StatLabel>
                        <StatNumber>{formattedTotalPrice}</StatNumber>
                    </Stat>

                    {/* Маршруты */}
                    <Text fontSize="lg">Маршруты:</Text>
                    {routeStrings.map((route, index) => (
                        <Text key={index}>{route}</Text>
                    ))}
                    <RequestInfo shipment={shipment}/>
                </CardBody>
                <CardFooter>
                    <AcceptButton changeStatus={() => updateTransportationRequestStatus(shipmentId, email,
                                                                                        {
                                                                                            transportationStatus: 'APPROVED'
                                                                                        })}
                                  fetchEntity={fetchTransportationRequest}/>
                    <DeclineButton changeStatus={() => updateTransportationRequestStatus(shipmentId, email,
                                                                                         {
                                                                                             transportationStatus: 'REJECTED'
                                                                                         })}
                                   fetchEntity={fetchTransportationRequest}/>
                </CardFooter>
            </Stack>
        </Card>
    );
}

