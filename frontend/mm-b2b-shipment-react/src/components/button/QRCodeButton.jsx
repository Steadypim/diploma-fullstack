import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import QRCode from "qrcode.react";
import React, {useState} from "react";
import {updateStatuses} from "../../services/shipment.js";
import {FcApproval} from "react-icons/fc";
import {Icon} from '@chakra-ui/react'
import {BsFillPatchQuestionFill} from "react-icons/bs";

function QRCodeButton({paymentAmount, id, fetchLogisticianRequest}) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [isCheckingPayment, setIsCheckingPayment] = useState(false);
    const [isPaymentComplete, setIsPaymentComplete] = useState(false);
    const [isHeaderOpen, setIsHeaderOpen] = useState(true);

    const qrCodeStyles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '300px',
        minWidth: '300px',
    };

    const link = "https://www.tinkoff.ru/rm/trinko.ilya1/ayNXn86538";

    const checkPayment = async () => {
        setIsCheckingPayment(true);
        try {
            // Предположим, что оплата прошла успешно
            await updateStatuses(id, {requestStatus: "PAID"});
            setIsHeaderOpen(false)
            setIsPaymentComplete(true);
            await new Promise(resolve => setTimeout(resolve, 2000)); // Задержка 2 секунды
            setIsCheckingPayment(false);
        } catch (error) {
            console.error("Ошибка при обновлении статуса:", error);
            setIsCheckingPayment(false);
        }
    };

    const handleModalClose = () => {
        setIsPaymentComplete(false);
        onClose();
        fetchLogisticianRequest();
    };

    return (
        <>
            <Button onClick={onOpen}>Оплатить</Button>

            <Modal onClose={handleModalClose} isOpen={isOpen} isCentered>
                <ModalOverlay/>
                <ModalContent>
                    <ModalCloseButton/>
                    {isHeaderOpen && (<ModalHeader textAlign={'center'}>Сканируйте код для оплаты</ModalHeader>)}
                    <ModalBody>
                        {isCheckingPayment ? (
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                minHeight: '300px'
                            }}>
                                <Spinner size="xl"/>
                            </div>
                        ) : (
                             <>
                                 {!isPaymentComplete && <div style={qrCodeStyles}>
                                     {paymentAmount && <QRCode value={link} size={256}/>}
                                 </div>}

                                 {isPaymentComplete && (
                                     <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                         <Icon as={FcApproval}  boxSize={200}/>
                                         <Text fontSize='xl' >Оплата прошла успешно!</Text>
                                         {/* Здесь можете добавить иконку галочки */}
                                     </div>
                                 )}
                             </>
                         )}
                    </ModalBody>
                    {!isCheckingPayment && !isPaymentComplete && (
                        <ModalFooter justifyContent="center">
                            <Button
                                colorScheme="facebook"
                                onClick={checkPayment}
                                variant="solid"
                                width="auto"
                                size="md"
                                leftIcon={<BsFillPatchQuestionFill />}
                            >
                                Проверить оплату
                            </Button>
                        </ModalFooter>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default QRCodeButton;