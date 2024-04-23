import SidebarWithHeader from "../components/shared/SideBar.jsx";
import CreateShipmentForm from "../components/shipment/CreateShipmentForm.jsx";
import {Box, Card, CardBody, CardHeader, Heading, Text} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {getUserProfileByEmail} from "../services/userProfile.js";
import {errorNotification} from "../services/notification.js";

const Shipment = () => {

    const CustomCard = ({ children, ...rest }) => (
        <Box
            bg="white"
            borderRadius="lg"
            boxShadow="md"
            p={6}
            {...rest}
        >
            {children}
        </Box>
    );

    const [userProfile, setUserProfile] = useState([]);

    const fetchUserProfile = () => {
        let token = localStorage.getItem("access_token");
        if (token) {
            token = jwtDecode(token);
            getUserProfileByEmail(token.sub).then(res => {
                setUserProfile(res.data)
            }).catch(err => {
                setError(err.response.data.message)
                errorNotification(
                    err.code,
                    err.response.data.message
                )
            }).finally(() => {
            })
        }
    }

    useEffect(() => {
        fetchUserProfile();
    }, [])

    return (
        <SidebarWithHeader>
            {userProfile.userStatus === 'INACTIVE' ? (
                <Text fontSize="3xl" textAlign="center" as='em'>
                    Пожалуйста, заполните и отправьте заявку на сотрудничество с нашей компанией на указанную электронную почту, скачав её на главной странице.
                    После рассмотрения вашей заявки, мы предоставим вам доступ к расчёту маршрутов.
                    Благодарим за ваше внимание и сотрудничество.
                </Text>
            ) : (
                 <>
            <Card variant={'outline'}>
                <CardHeader style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Heading size={'lg'}>Построение маршрута</Heading>
                </CardHeader>
                <CardBody><CreateShipmentForm/></CardBody>
            </Card>
                 </>
            )}
        </SidebarWithHeader>
    )
}

export default Shipment;