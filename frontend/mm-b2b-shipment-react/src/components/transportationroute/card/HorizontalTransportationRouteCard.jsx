import {Badge, Card, CardBody, CardFooter, Heading, Stack, Text} from "@chakra-ui/react";
import DeleteButton from "../../button/DeleteButton.jsx";
import {deleteTransportationRoute} from "../../../services/transportationRoute.js";

export default function HorizontalTransportationRouteCard({sourceWarehouseName, destinationWarehouseName, transportName, price, id, fetchTransportationRoutes}) {

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
            size={'sm'}
        >


            <Stack>
                <CardBody>
                    <Heading size='md'>Маршрут: {sourceWarehouseName} -> {destinationWarehouseName}</Heading>

                    <Text py='2'>
                        Тип транспорта: {transportTranslation[transportName] || transportName}
                    </Text>

                    <Badge variant='outline' colorScheme='green' fontSize='1.0em'>{price} ₽</Badge>

                </CardBody>
                <CardFooter>
                    <DeleteButton onDelete={() => deleteTransportationRoute(id)} fetchEntity={fetchTransportationRoutes}/>
                </CardFooter>
            </Stack>
        </Card>);
}