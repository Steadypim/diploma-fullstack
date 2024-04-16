import {Badge, Card, CardBody, CardFooter, CardHeader, Heading, Stack, Text} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import AcceptButton from "../button/AcceptButton.jsx";
import DeclineButton from "../button/DeclineButton.jsx";
import {updateStorageStatus} from "../../services/warehouseRequests.js";
import {getShipmentById} from "../../services/shipment.js";
import {errorNotification} from "../../services/notification.js";
import RequestInfo from "../button/RequestInfo.jsx";


export default function WarehouseRequestCard({storageRequests, fetchWarehousesForStorage, email, shipmentId}) {

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

    const statusTranslation = {
        'PENDING': {text: 'Ожидает подтверждения', colorScheme: 'gray'},
        'APPROVED': {text: 'Подтверждена', colorScheme: 'yellow'},
        'REJECTED': {text: 'Отклонена', colorScheme: 'red'},
        'PAID': {text: 'Оплачена', colorScheme: 'green'},
    }

    const storageStrings = [];

    storageRequests.forEach((storageRequest, index) => {
        const {address} = storageRequest;

        const storageString = (
            <Text key={index} display="flex" alignItems="center">
                • {address.country}, {address.region}, {address.city}, {address.street}, {address.houseNumber}
            </Text>
        );
        storageStrings.push(storageString);
    });

    const status = statusTranslation[storageRequests[0]?.requestStatus] || {text: 'Unknown', colorScheme: 'gray'};

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
                    <Heading size='md'>Заявка на хранение</Heading>
                    <Badge colorScheme={status.colorScheme}>
                        {status.text}
                    </Badge>
                </CardHeader>

                {/* Тело карточки */}
                <CardBody>
                    {/* Хранения */}
                    <Text fontSize="lg">Склады:</Text>
                    {storageStrings.map((storage, index) => (
                        <Text key={index}>{storage}</Text>
                    ))}
                    <RequestInfo shipment={shipment}/>
                </CardBody>
                <CardFooter>
                    <AcceptButton changeStatus={() => updateStorageStatus(shipmentId, email,
                                                                          {
                                                                              storageStatus: 'APPROVED'
                                                                          })} fetchEntity={fetchWarehousesForStorage}/>
                    <DeclineButton changeStatus={() => updateStorageStatus(shipmentId, email,
                                                                           {
                                                                               storageStatus: 'REJECTED'
                                                                           })} fetchEntity={fetchWarehousesForStorage}/>
                </CardFooter>
            </Stack>
        </Card>
    );

}