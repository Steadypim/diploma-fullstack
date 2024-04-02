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
    StatNumber, Tag,
    Text
} from "@chakra-ui/react";
import React from "react";

export default function LogisticianRequestCard({logisticianRequest, fetchLogisticianRequest}) {

    const { fullPrice, sourceWarehouse, destinationWarehouse, optimalPath, id, requestStatus } = logisticianRequest;

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
                    <Badge colorScheme={status.colorScheme} >
                        {status.text}
                    </Badge>
                    <Heading size='md'>Заявка на перевозку из {sourceWarehouse.address.city} в {destinationWarehouse.address.city}</Heading>
                </CardHeader>
                <CardBody>

                    <List spacing={3} mb={'10px'} >
                        {optimalPath.map((path, index) => (
                            <ListItem key={index}>
                                <ListIcon as={transportIcons[path.transport.transportType] || path.transport.transportType} color='green.300' />
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
                        <Text as={'i'} color={'gray.500'} fontSize={'14px'}>Для оплаты доставки требуется подтверждение всех компаний, ожидайте</Text>
                    </Stat>


                </CardBody>
                {/*<CardFooter>*/}
                {/*    /!*<Button variant={'outline'}>Оплатить</Button>*!/*/}
                {/*    /!*<Button ml={'10px'}>Отменить</Button>*!/*/}
                {/*</CardFooter>*/}
            </Stack>
        </Card>);
}