import {
    Alert, AlertIcon,
    Box,
    Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent,
    DrawerFooter, DrawerHeader, DrawerOverlay,
    FormLabel,
    Input, useDisclosure
} from "@chakra-ui/react";

import {
    LuPanelRightClose ,
    LuPanelLeftClose
} from "react-icons/lu";
import {useField} from "formik";
import CreateWarerhouseForm from "./CreateWarerhouseForm.jsx";

const CreateWarehouseDrawer = ({fetchWarehouses}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button leftIcon={<LuPanelRightClose  />} colorScheme='green' onClick={onOpen}>
                Добавить склад
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>
                        Добавить новый склад
                    </DrawerHeader>

                    <DrawerBody>
                        <CreateWarerhouseForm
                            fetchWarehouses={fetchWarehouses}
                        />
                    </DrawerBody>

                    <DrawerFooter borderTopWidth='1px'>
                        <Button
                            leftIcon={<LuPanelLeftClose />}
                            colorScheme={"red"}
                            onClick={onClose}>
                            Закрыть
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default CreateWarehouseDrawer;