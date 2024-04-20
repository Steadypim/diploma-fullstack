import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button, useDisclosure
} from "@chakra-ui/react";
import React from "react";
import {errorNotification, successNotification} from "../../services/notification.js";
import {RiDeleteBin2Line} from "react-icons/ri";

const DeleteButton = ({onDelete, fetchEntity}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    return (
        <>
            <Button colorScheme='red' onClick={onOpen} size={"sm"} variant={'outline'} leftIcon={<RiDeleteBin2Line />}>
                Удалить
            </Button>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Удалить
                        </AlertDialogHeader>

                        <AlertDialogBody>Вы уверенны?</AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Отменить
                            </Button>
                            <Button colorScheme='red' onClick={() => {
                                onDelete().then(res => {
                                    console.log(res)
                                    successNotification(
                                        "Успешно удалено",
                                    )
                                    fetchEntity();
                                    onClose()
                                }).catch(err =>{
                                    errorNotification(
                                        "Нельзя удалить, так как оформлена заявка"
                                    )
                                }).finally(() => {
                                    onClose()
                                })
                            }} ml={3}>
                                Удалить
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default DeleteButton;