import {GiCargoShip, GiCommercialAirplane} from "react-icons/gi";
import {FaTrain} from "react-icons/fa";
import {FaTruckFast} from "react-icons/fa6";
import {
    Badge, Button,
    Card,
    CardBody, CardFooter,
    CardHeader,
    Heading,
    List,
    ListIcon,
    ListItem,
    Stack,
    Stat,
    StatLabel,
    StatNumber,
    Tag,
    Text
} from "@chakra-ui/react";
import React, {useState} from "react";
import QRCode from 'qrcode.react';
import QRCodeButton from "../button/QRCodeButton.jsx";


export default function LogisticianRequestCard({logisticianRequest, fetchLogisticianRequest}) {

    const {fullPrice, sourceWarehouse, destinationWarehouse, optimalPath, id, requestStatus} = logisticianRequest;

    const [paymentAmount, setPaymentAmount] = useState('');

    const transportIcons = {
        'SHIP': GiCargoShip,
        'TRAIN': FaTrain,
        'CAR': FaTruckFast,
        'PLANE': GiCommercialAirplane,
    };

    const formattedPrice = fullPrice.toLocaleString('ru-RU', {
        style: 'currency',
        currency: 'RUB'
    });

    const statusTranslation = {
        'PENDING': {text: 'Ожидает', colorScheme: 'gray'},
        'APPROVED': {text: 'Принят', colorScheme: 'green'},
        'REJECTED': {text: 'Отклонён', colorScheme: 'red'}
    }

    const status = statusTranslation[requestStatus] || {text: requestStatus, colorScheme: 'gray'};

    const handlePayment = () => {
        setPaymentAmount(formattedPrice);
    };

    // Фильтрация маршрутов по точке отправления и сортировка в порядке, соответствующем последовательности точек отправления и прибытия
    const sortedPaths = [];
    let currentSource = sourceWarehouse;
    while (currentSource !== destinationWarehouse) {
        const currentPath = optimalPath.find(path => path.sourceWarehouse.address.city === currentSource.address.city);
        if (!currentPath) {
            break; // если не найден маршрут, прерываем цикл
        }
        sortedPaths.push(currentPath);
        currentSource = currentPath.destinationWarehouse; // следующая точка отправления - точка назначения текущего маршрута
    }

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
                <CardHeader>
                    <Heading size='md'>Заявка на перевозку
                        из {sourceWarehouse.address.city} в {destinationWarehouse.address.city}</Heading>
                </CardHeader>
                <CardBody>

                    <List spacing={3} mb={'10px'}>
                        {sortedPaths.map((path, index) => (
                            <ListItem key={index}>
                                <ListIcon
                                    as={transportIcons[path.transport.transportType] || path.transport.transportType}
                                    color='green.300'/>
                                {`${path.sourceWarehouse.address.city} ⟶ ${path.destinationWarehouse.address.city}`}
                                <Tag ml={'5px'}
                                     size={'sm'}
                                     colorScheme='green'
                                     borderRadius='full'>
                                    {path.price.toLocaleString('ru-RU')} ₽
                                </Tag>
                            </ListItem>
                        ))}
                    </List>


                    <Stat>
                        <StatLabel fontSize={'16px'}>Цена: </StatLabel>
                        <StatNumber>{formattedPrice} </StatNumber>
                    </Stat>


                </CardBody>
                <CardFooter>
                    <QRCodeButton paymentAmount={formattedPrice} />
                    {/*<Button ml={'10px'}>Отменить</Button>*/}
                </CardFooter>
            </Stack>
        </Card>);
}