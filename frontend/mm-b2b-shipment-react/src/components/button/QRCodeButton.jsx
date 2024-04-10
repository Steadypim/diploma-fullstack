import {
    Button, Image,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/react";
import QRCode from "qrcode.react";
import React from "react";

function QRCodeButton(paymentAmount) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const qrCodeStyles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '300px',
        minWidth: '300px',
    };

    const link = "https://www.tinkoff.ru/rm/trinko.ilya1/ayNXn86538";

    return (
        <>
            <Button onClick={onOpen}>Оплатить</Button>

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalHeader>Отсканируйте код для оплаты</ModalHeader>
                    <ModalBody>
                        <div style={qrCodeStyles}>
                            {paymentAmount &&
                             <QRCode value={link} size={256}/>}
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default QRCodeButton;