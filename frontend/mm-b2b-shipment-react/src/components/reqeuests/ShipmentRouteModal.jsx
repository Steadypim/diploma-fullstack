import React from 'react';
import {
    Button, List, ListIcon, ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay, Tag,
    useDisclosure
} from '@chakra-ui/react';

const ShipmentRouteModal = ({requests}) => {
    const {isOpen, onOpen, onClose} = useDisclosure()

    const shipmentStatusTranslation = {
        'AWAITING': {text: 'Ожидает отправки', colorScheme: 'gray'},
        'IN_PROGRESS': {text: 'В пути', colorScheme: 'yellow'},
        'DONE': {text: 'Прибыло', colorScheme: 'green'},
    }

    return (
        <>
            <Button onClick={onOpen} variant={"link"}>Статус доставки</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Статус доставки</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <List spacing={3} mb={'10px'}>
                            {requests.map((path, index) => (
                                <ListItem key={index}>
                                    {`${path.sourceWarehouse.address.city} ⟶ ${path.destinationWarehouse.address.city}`}
                                    <Tag ml={'5px'}
                                         size={'sm'}
                                         colorScheme={path.shipmentStatus ? shipmentStatusTranslation[path.shipmentStatus].colorScheme : "green"}
                                         borderRadius='full'>
                                        {path.shipmentStatus ? shipmentStatusTranslation[path.shipmentStatus].text : ""}
                                    </Tag>
                                </ListItem>
                            ))}
                        </List>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ShipmentRouteModal;
