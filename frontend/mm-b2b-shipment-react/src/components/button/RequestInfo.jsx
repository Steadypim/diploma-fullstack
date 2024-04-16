import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text, useDisclosure
} from "@chakra-ui/react";
// eslint-disable-next-line no-unused-vars
import React from "react";

// eslint-disable-next-line react/prop-types
function RequestInfo({shipment}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    // eslint-disable-next-line react/prop-types
    const userProfile = shipment?.userProfile;

    return (
        <>
            <Button onClick={onOpen} variant='link' colorScheme='twitter'>Информация о заказчике</Button>

            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{userProfile ? userProfile.companyName : 'Unknown'}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {userProfile && (
                            <>
                                <Text>
                                    <Text fontWeight='bold' as="span">Email:</Text> {userProfile.email}
                                </Text>
                                <Text>
                                    <Text fontWeight='bold' as="span">Телефон:</Text> {userProfile.phone}
                                </Text>
                                <Text>
                                    <Text fontWeight='bold' as="span">ИНН:</Text> {userProfile.INN}
                                </Text>
                                <Text>
                                    <Text fontWeight='bold' as="span">ОГРН:</Text> {userProfile.OGRN}
                                </Text>
                                <Text>
                                    <Text fontWeight='bold' as="span">Адрес:</Text> {`${userProfile.country}, ${userProfile.region}, ${userProfile.city}, ${userProfile.street}, ${userProfile.houseNumber}`}
                                </Text>
                            </>
                        )}
                    </ModalBody>

                    {/*<ModalFooter>*/}
                    {/*    <Button colorScheme='blue' mr={3} onClick={onClose}>*/}
                    {/*        Закрыть*/}
                    {/*    </Button>*/}
                    {/*</ModalFooter>*/}
                </ModalContent>
            </Modal>
        </>
    )
}

export default RequestInfo;