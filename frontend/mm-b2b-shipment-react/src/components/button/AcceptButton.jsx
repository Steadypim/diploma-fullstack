import {Button, useDisclosure} from "@chakra-ui/react";
import React from "react";
import {errorNotification, successNotification} from "../../services/notification.js";
import {AiOutlineCheckCircle} from "react-icons/ai";

const AcceptButton = ({changeStatus, fetchEntity}) => {

    const { onClose } = useDisclosure()

    return (
        <>
            <Button colorScheme='green' onClick={() => {
                changeStatus().then(res => {
                    console.log(res)
                    successNotification("Заявка одобрена")
                    fetchEntity();
                    onClose()
                }).catch(err =>{
                    errorNotification(
                        "Не удалось одобрить заявку",
                        err.code,
                        err.response.data.message
                    )
                }).finally(() => {
                    onClose()
                })
            }
            } size={"sm"} variant={'outline'} leftIcon={<AiOutlineCheckCircle />}>
                Принять
            </Button>
        </>
    )
}

export default AcceptButton;