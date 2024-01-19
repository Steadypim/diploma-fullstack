import {Card, CardBody, CardFooter, Heading, Stack, Image, Button, Text, Badge} from "@chakra-ui/react";

export default function HorizontalTransportationRouteCard({sourceWarehouseName, destinationWarehouseName, transportName, price}) {

    const transportTranslation = {
        SHIP: 'Корабль',
        TRAN: 'Поезд',
        CAR: 'Автомобиль',
        PLANE: 'Самолет',
    };


    return (
        <Card
            direction={{base: 'column', sm: 'row'}}
            overflow='hidden'
            variant='outline'
        >


            <Stack>
                <CardBody>
                    <Heading size='md'>Маршрут: {sourceWarehouseName} -> {destinationWarehouseName}</Heading>

                    <Text py='2'>
                        Тип транспорта: {transportTranslation[transportName] || transportName}
                    </Text>

                    <Badge variant='outline' colorScheme='green' fontSize='1.0em'>{price} ₽</Badge>
                </CardBody>
            </Stack>
        </Card>);
}