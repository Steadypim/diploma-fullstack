import {Badge, Card, CardBody, CardFooter, CardHeader, Divider, Heading, Icon, Stack, Text} from "@chakra-ui/react";
import React from "react";
import {MdOutlineWarehouse} from "react-icons/md";
import AcceptButton from "../button/AcceptButton.jsx";
import DeclineButton from "../button/DeclineButton.jsx";
import {updateStorageStatus} from "../../services/warehouseRequests.js";


export default function WarehouseRequestCard({warehouse, fetchWarehousesForStorage}) {

    const {address, warehouseId, requestStatus, id} = warehouse;

    const statusTranslation = {
        'PENDING': {text: 'Ожидает', colorScheme: 'gray'},
        'APPROVED': {text: 'Принят', colorScheme: 'green'},
        'REJECTED': {text: 'Отклонён', colorScheme: 'red'}
    }

    const status = statusTranslation[requestStatus] || {text: requestStatus, colorScheme: 'gray'};

    return (
        <Card size={'sm'} style={{display: 'flex', flexDirection: 'column', height: '100%'}} variant={"outline"}
              boxShadow="lg"
              borderColor="gray.200"
              borderRadius="md"
              bgGradient="linear(to-r, whiteAlpha.50, blackAlpha.50)"
              color="white">
            <CardHeader>
                <Badge colorScheme={status.colorScheme}>
                    {status.text}
                </Badge>
                <Heading size='md'>Заявка на хранение {address.city}, {address.region}</Heading>
            </CardHeader>
            <Stack spacing={0}
                   style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <CardBody
                    style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                    <Icon as={MdOutlineWarehouse} w={20} h={20}/>
                    <Text>
                        <strong>Страна:</strong> {address.country}<br/>
                        <strong>Улица:</strong> {address.street}, д.{address.houseNumber}<br/>
                        <strong>Почтовый индекс:</strong> {address.postalCode || "Нет"}<br/>
                    </Text>
                </CardBody>
                <Divider/>
                <CardFooter>
                    <AcceptButton
                        changeStatus={() => updateStorageStatus(id, {...warehouse, requestStatus: 'APPROVED'})}
                        fetchEntity={fetchWarehousesForStorage}/>
                    <DeclineButton
                        changeStatus={() => updateStorageStatus(id, {...warehouse, requestStatus: 'REJECTED'})}
                        fetchEntity={fetchWarehousesForStorage}/>
                </CardFooter>
            </Stack>
        </Card>
    );

}