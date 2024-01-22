import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    useDisclosure
} from "@chakra-ui/react";

import {LuPanelLeftClose, LuPanelRightClose} from "react-icons/lu";
import CreateTransportationRouteForm from "./CreateTransportationRouteForm.jsx";

const CreateTransportationRouteDrawer = ({fetchTransportationRoutes}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button leftIcon={<LuPanelRightClose  />} colorScheme='green' onClick={onOpen}>
                Добавить перевозку
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                size={'xl'}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>
                        Добавить новую перевозку
                    </DrawerHeader>

                    <DrawerBody>
                        <CreateTransportationRouteForm
                            fetchTransportationRoutes={fetchTransportationRoutes}
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

export default CreateTransportationRouteDrawer;