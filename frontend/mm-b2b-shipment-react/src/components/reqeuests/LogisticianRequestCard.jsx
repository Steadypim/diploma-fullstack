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
import QRCodeButton from "../button/QRCodeButton.jsx";


export default function LogisticianRequestCard({logisticianRequest, fetchLogisticianRequest}) {

    const {fullPrice, sourceWarehouse, destinationWarehouse, optimalPath, id, requestStatus} = logisticianRequest;

    const [paymentAmount, setPaymentAmount] = useState('');

    const isPending = requestStatus === 'PENDING';
    const isApproved = requestStatus === 'APPROVED';
    const isRejected = requestStatus === 'REJECTED';
    const isPaid = requestStatus === 'PAID';

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
        'PENDING': {text: 'Ожидает подтверждения', colorScheme: 'gray'},
        'APPROVED': {text: 'Подтверждена', colorScheme: 'yellow'},
        'REJECTED': {text: 'Отклонена', colorScheme: 'red'},
        'PAID': {text: 'Оплачена', colorScheme: 'green'},
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
                        из {sourceWarehouse.address.city} в {destinationWarehouse.address.city} <br/>
                        <Badge colorScheme={status.colorScheme}>
                            {status.text}
                        </Badge>
                    </Heading>
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
                    {isPending && (
                        <Text fontSize={"sm"} as='i'>Заявка успешно оформлена, ожидайте подтверждения компаний для
                            оплаты.</Text>
                    )}
                    {isApproved && (
                        <Stack direction="column" spacing={2}>
                            <QRCodeButton paymentAmount={formattedPrice}
                                          id={id}
                                          fetchLogisticianRequest={fetchLogisticianRequest}/>
                            <Text fontSize={"sm"} as='i'>Заявка одобрена, вы можете оплачивать</Text>
                        </Stack>
                    )}
                    {isRejected && (
                        <Text fontSize={"sm"} as='i'>К сожалению, некоторые компании отказались участвовать в этой
                            перевозке, пожалуйста, сформируйте новую.</Text>
                    )}
                    {isPaid && (
                        <Text fontSize={"sm"} as='i'>Ваша заявка успешно оплачена, компании уже занимаются
                            транспортировкой вашего груза.</Text>
                    )}
                    {/*<Button ml={'10px'}>Отменить</Button>*/}
                </CardFooter>
            </Stack>
        </Card>);
}