import {Card, CardBody, CardFooter, Divider, Icon, Stack, Text} from "@chakra-ui/react";
import DeleteButton from "../../button/DeleteButton.jsx";
import UpdateButton from "../../button/UpdateButton.jsx";
import React from "react";
import {GiCargoShip, GiCommercialAirplane} from "react-icons/gi";
import {FaTrain} from "react-icons/fa";
import {FaTruckFast} from "react-icons/fa6";
import {deleteTransport, deleteTransportByStatus} from "../../../services/transport.js";
import ExtraInfoPopover from "../../shared/ExtraInfoPopover.jsx";
import UpdateTransportForm from "../UpdateTransportForm.jsx";


export default function TransportCard({transport, fetchTansports}) {

    const transportIcons = {
        SHIP: GiCargoShip,
        TRAIN: FaTrain,
        CAR: FaTruckFast,
        PLANE: GiCommercialAirplane
    };


    return (
        <Card size={'sm'} style={{display: 'flex', flexDirection: 'column', height: '100%'}} variant={"outline"}
              boxShadow="lg"
              borderColor="gray.200"
              borderRadius="md"
              bgGradient="linear(to-r, whiteAlpha.50, blackAlpha.50)"
              color="white">
            <Stack spacing={0}
                   style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <CardBody
                    style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                    <Icon as={transportIcons[transport.transportType]} w={20} h={20}/>
                    <Text>
                        <strong>Грузоподъёмность:</strong> {transport.liftingCapacity} кг<br/>
                        <strong>Объём:</strong> {transport.holdingVolume} м³<br/>
                        <strong>Средняя скорость:</strong> {transport.averageSpeed} км/ч
                        <ExtraInfoPopover info={transport.packagingRequirements}/>
                    </Text>
                </CardBody>
                <Divider/>
                <CardFooter>
                    <DeleteButton onDelete={() => deleteTransportByStatus(transport.id)} fetchEntity={fetchTansports}/>
                    <UpdateButton fetchEntity={fetchTansports} UpdateFormComponent={UpdateTransportForm}
                                  entity={transport}/>
                </CardFooter>
            </Stack>
        </Card>
    );

}