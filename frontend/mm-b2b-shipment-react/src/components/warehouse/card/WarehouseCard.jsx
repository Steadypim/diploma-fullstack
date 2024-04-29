import {Card, CardBody, CardFooter, CardHeader, Divider, Heading, Icon, Stack, Text} from "@chakra-ui/react";
import DeleteButton from "../../button/DeleteButton.jsx";
import UpdateButton from "../../button/UpdateButton.jsx";
import React from "react";
import {deleteWarehouse, deleteWarehouseByStatus} from "../../../services/warehouse.js";
import {MdOutlineWarehouse} from "react-icons/md";
import UpdateWarehouseForm from "../UpdateWarehouseForm.jsx";


export default function WarehouseCard({warehouse, fetchWarehouses}) {

    const {address, warehouseId, price} = warehouse;

    return (
        <Card size={'sm'} style={{display: 'flex', flexDirection: 'column', height: '100%'}} variant={"outline"}
              boxShadow="lg"
              borderColor="gray.200"
              borderRadius="md"
              bgGradient="linear(to-r, whiteAlpha.50, blackAlpha.50)"
              color="white">
            <CardHeader>
                <Heading size='md'>{address.city}, {address.region}</Heading>
            </CardHeader>
            <Stack spacing={0}
                   style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <CardBody
                    style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                    <Icon as={MdOutlineWarehouse} w={20} h={20}/>
                    <Text>
                        <strong>Страна:</strong> {address.country}<br/>
                        <strong>Улица:</strong> {address.street}, д. {address.houseNumber}<br/>
                        <strong>Почтовый индекс:</strong> {address.postalCode || "Нет"}<br/>
                        <strong>Цена за кг:</strong> {price ? `${price} рублей` : "Нет"}<br/>
                    </Text>
                </CardBody>
                <Divider/>
                <CardFooter>
                    <DeleteButton onDelete={() => deleteWarehouseByStatus(warehouseId)} fetchEntity={fetchWarehouses}/>
                    <UpdateButton fetchEntity={fetchWarehouses} UpdateFormComponent={UpdateWarehouseForm}
                                  entity={warehouse}/>
                </CardFooter>
            </Stack>
        </Card>
    );

}