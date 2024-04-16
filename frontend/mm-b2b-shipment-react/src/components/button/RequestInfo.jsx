import {
    Button,
    Divider,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
    useDisclosure
} from "@chakra-ui/react";
// eslint-disable-next-line no-unused-vars
import React from "react";

// eslint-disable-next-line react/prop-types
function RequestInfo({shipment}) {
    const {isOpen, onOpen, onClose} = useDisclosure()
    // eslint-disable-next-line react/prop-types
    const userProfile = shipment?.userProfile;

    return (
        <>
            <Button onClick={onOpen} variant='link' colorScheme='twitter'>Информация о грузе и заказчике</Button>

            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Text align={'center'}
                              fontSize={'2xl'}>{userProfile ? userProfile.companyName : 'Unknown'}</Text>
                        <Divider mb={'10px'}/>
                        {userProfile && (
                            <>
                                <Text>
                                    <Text fontSize={'lg'} fontWeight='bold' as="span"
                                          style={{whiteSpace: 'nowrap', fontSize: '18px'}}>Email: </Text>
                                    <span style={{fontSize: '18px'}}>{userProfile.email}</span>
                                </Text>
                                <Text>
                                    <Text fontSize={'lg'} fontWeight='bold' as="span"
                                          style={{whiteSpace: 'nowrap', fontSize: '18px'}}>Телефон: </Text>
                                    <span style={{fontSize: '18px'}}>{userProfile.phone}</span>
                                </Text>
                                <Text>
                                    <Text fontSize={'lg'} fontWeight='bold' as="span"
                                          style={{whiteSpace: 'nowrap', fontSize: '18px'}}>ИНН: </Text>
                                    <span style={{fontSize: '18px'}}>{userProfile.INN}</span>
                                </Text>
                                <Text>
                                    <Text fontSize={'lg'} fontWeight='bold' as="span"
                                          style={{whiteSpace: 'nowrap', fontSize: '18px'}}>ОГРН: </Text>
                                    <span style={{fontSize: '18px'}}>{userProfile.OGRN}</span>
                                </Text>
                                <Text>
                                    <Text fontSize={'lg'} fontWeight='bold' as="span"
                                          style={{whiteSpace: 'nowrap', fontSize: '18px'}}>Адрес: </Text>
                                    <span style={{fontSize: '18px'}}>
                    {`${userProfile.country}, ${userProfile.region}, ${userProfile.city}, ${userProfile.street}, ${userProfile.houseNumber}`}
                </span>
                                </Text>
                            </>
                        )}
                        <Divider mt={'10px'} mb={'10px'}/>

                        <Text align={'center'} fontSize={'xl'}>{shipment ? shipment.name : 'Unknown'}</Text>
                        {shipment && (
                            <>
                                <Text>
                                    <Text fontSize={'lg'} fontWeight='bold' as="span"
                                          style={{whiteSpace: 'nowrap', fontSize: '18px'}}>Вес: </Text>
                                    <span style={{fontSize: '18px'}}>{shipment.weight} кг</span>
                                </Text>
                                <Text>
                                    <Text fontSize={'lg'} fontWeight="bold" as="span"
                                          style={{whiteSpace: 'nowrap', fontSize: '18px'}}>Описание: </Text>
                                    <span style={{fontSize: '18px'}}>
                    {shipment.description ? shipment.description : "Заказчик не указал дополнительного описания"}
                </span>
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