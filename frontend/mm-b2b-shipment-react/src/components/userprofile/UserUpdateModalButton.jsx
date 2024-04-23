import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";
import {useState} from "react";
import {activate, deactivate} from "../../services/userProfile.js";

const UserUpdateModalButton = ({user}) => {

    const [showModal, setShowModal] = useState(false);
    const {email, userStatus} = user


    const handleModalOpen = () => {
        setShowModal(true);
    };

    const handleConfirmation = () => {
        if (userStatus === 'INACTIVE') {
            activate(email).then(response => {
                console.log("activated")
            }).catch(error => {
                console.error('Error activating user:', error);
            });
        } else {
            deactivate(email).then(response => {
                console.log("deactivated")
            }).catch(error => {
                console.error('Error deactivating user:', error);
            });
        }
        setShowModal(false);
    };

    return (
        <>
            <Button colorScheme={userStatus === "INACTIVE"? 'green' : 'red'} onClick={handleModalOpen} size={'sm'} variant={'outline'}>
                {userStatus === 'INACTIVE' ? 'Активировать' : 'Деактивировать'}
            </Button>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Подтвердите действие</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        Вы уверены, что
                        хотите {userStatus === 'INACTIVE' ? 'активировать' : 'деактивировать'} пользователя?
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleConfirmation}>
                            Подтвердить
                        </Button>
                        <Button onClick={() => setShowModal(false)}>Отмена</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )

}

export default UserUpdateModalButton;