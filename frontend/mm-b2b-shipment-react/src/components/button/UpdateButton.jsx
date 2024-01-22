import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/react";
import React from "react";
import {LuPanelLeftClose} from "react-icons/lu";
import {RxUpdate} from "react-icons/rx";

const UpdateButton = ({fetchEntity, UpdateFormComponent, entity}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    return (
        <>
            <Button onClick={onOpen} size={"sm"} variant={'outline'} ml={"10px"} colorScheme={"telegram"} leftIcon={<RxUpdate />}>Изменить</Button>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Изменить запись</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <UpdateFormComponent
                            fetchEntity={fetchEntity}
                            entity={entity}
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose} leftIcon={<LuPanelLeftClose />}
                                colorScheme={"red"}>Закрыть</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateButton;