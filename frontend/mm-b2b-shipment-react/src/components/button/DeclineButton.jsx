import {Button, useDisclosure} from "@chakra-ui/react";
import React from "react";
import {errorNotification, successNotification} from "../../services/notification.js";
import {IoTrashBinOutline} from "react-icons/io5";

const DeclineButton = ({changeStatus, fetchEntity}) => {

    const { onClose } = useDisclosure()

    return (
        <>
            <Button colorScheme='red' onClick={() => {
                changeStatus().then(res => {
                    console.log(res)
                    successNotification("Хранение отклонено")
                    fetchEntity()
                    onClose()
                }).catch(err =>{
                    errorNotification(
                        "Не удалось одобрить заявку",
                        err.code,
                        err.data.message
                    )
                }).finally(() => {
                    onClose()
                })
            }} size={"sm"} variant={'outline'} leftIcon={<IoTrashBinOutline />} ml={"10px"}>
                Отклонить
            </Button>
        </>
    )
}

export default DeclineButton;