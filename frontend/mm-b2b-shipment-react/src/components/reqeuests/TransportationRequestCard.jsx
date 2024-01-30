import {GiCargoShip, GiCommercialAirplane} from "react-icons/gi";
import {FaTrain} from "react-icons/fa";
import {FaTruckFast} from "react-icons/fa6";
import {
    Badge,
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
import React from "react";
import AcceptButton from "../button/AcceptButton.jsx";
import DeclineButton from "../button/DeclineButton.jsx";
import {updateTransportationRequestStatus} from "../../services/tranportationRequests.js";

export default function TransportationRequestCard({transportationRequest, fetchTransportationRequest}) {

    const { price, requestStatus, sourceWarehouse, destinationWarehouse, transport, id } = transportationRequest;

    const transportIcons = {
        SHIP: <GiCargoShip />,
        TRAIN: <FaTrain />,
        CAR: <FaTruckFast />,
        PLANE: <GiCommercialAirplane />,
    };

    const formattedPrice = price.toLocaleString('ru-RU', {
        style: 'currency',
        currency: 'RUB'
    });

    const statusTranslation = {
        'PENDING': { text: 'Ожидает', colorScheme: 'gray' },
        'APPROVED': { text: 'Принят', colorScheme: 'green' },
        'REJECTED': { text: 'Отклонён', colorScheme: 'red' }
    }

    const status = statusTranslation[requestStatus] || { text: requestStatus, colorScheme: 'gray' };


    return (
        <Card
            direction={{base: 'column', sm: 'row'}}
            overflow='hidden'
            variant='outline'
            size={'sm'}
        >


            <Stack spacing={0}>
                <CardHeader>
                    <Badge colorScheme={status.colorScheme}>
                        {status.text}
                    </Badge>
                    <Heading size='md'>Заявка на перезку из {sourceWarehouse.address.city} в {destinationWarehouse.address.city}</Heading>
                </CardHeader>
                <CardBody>


                    <Stat>
                        <StatLabel fontSize={'16px'}>Цена: </StatLabel>
                        <StatNumber>{formattedPrice}</StatNumber>
                        <StatHelpText >Транспорт<Text fontSize={"25px"}>{transportIcons[transport.transportType] || transport.transportType}</Text></StatHelpText>
                    </Stat>


                </CardBody>
                <CardFooter>
                    <AcceptButton changeStatus={() => updateTransportationRequestStatus(id, { ...transportationRequest, requestStatus: 'APPROVED' })} fetchEntity={fetchTransportationRequest}/>
                    <DeclineButton changeStatus={() => updateTransportationRequestStatus(id, { ...transportationRequest, requestStatus: 'REJECTED' })} fetchEntity={fetchTransportationRequest}/>
                </CardFooter>
            </Stack>
        </Card>);
}