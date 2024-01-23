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
import CreateTransportForm from "./CreateTransportForm.jsx";

const CreateTransportDrawer = ({fetchTransports}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button leftIcon={<LuPanelRightClose  />} colorScheme='green' onClick={onOpen}>
                Добавить транспорт
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                size={"md"}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>
                        Добавить новый транспорт
                    </DrawerHeader>

                    <DrawerBody>
                        <CreateTransportForm
                            fetchTransports={fetchTransports}
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

export default CreateTransportDrawer;