import {Card, CardBody, CardFooter, Stack, Stat, StatHelpText, StatLabel, StatNumber, Text} from "@chakra-ui/react";
import DeleteButton from "../../button/DeleteButton.jsx";
import {deleteTransportationRoute} from "../../../services/transportationRoute.js";
import UpdateButton from "../../button/UpdateButton.jsx";
import UpdateTransportationRouteForm from "../UpdateTransportationRouteForm.jsx";
import React from "react";
import {GiCargoShip, GiCommercialAirplane} from "react-icons/gi";
import {FaTruckFast} from "react-icons/fa6";
import {FaTrain} from "react-icons/fa";

export default function HorizontalTransportationRouteCard({
                                                              sourceWarehouseName,
                                                              destinationWarehouseName,
                                                              transportName,
                                                              price,
                                                              id,
                                                              fetchTransportationRoutes
                                                          }) {

    const transportIcons = {
        SHIP: <GiCargoShip/>,
        TRAIN: <FaTrain/>,
        CAR: <FaTruckFast/>,
        PLANE: <GiCommercialAirplane/>,
    };

    const formattedPrice = price.toLocaleString('ru-RU', {
        style: 'currency',
        currency: 'RUB'
    });


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
                <CardBody>


                    <Stat>
                        <StatLabel
                            fontSize={'16px'}>Маршрут: {sourceWarehouseName} {"->"} {destinationWarehouseName}</StatLabel>
                        <StatNumber>{formattedPrice}/кг</StatNumber>
                        <StatHelpText>Тип транспорта: <Text
                            fontSize={"25px"}>{transportIcons[transportName] || transportName}</Text></StatHelpText>
                    </Stat>


                </CardBody>
                <CardFooter>
                    <DeleteButton onDelete={() => deleteTransportationRoute(id)}
                                  fetchEntity={fetchTransportationRoutes}/>
                    <UpdateButton fetchEntity={fetchTransportationRoutes}
                                  UpdateFormComponent={UpdateTransportationRouteForm}
                                  entity={{sourceWarehouseName, destinationWarehouseName, transportName, price, id}}/>
                </CardFooter>
            </Stack>
        </Card>);
}