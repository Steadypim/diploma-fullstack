import {Box, SimpleGrid, Spinner, Text} from "@chakra-ui/react";
import SidebarWithHeader from "../components/shared/SideBar.jsx";
import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {errorNotification} from "../services/notification.js";
import {getTransportByUserEmail} from "../services/transport.js";
import CreateTransportDrawer from "../components/transport/CreateTransportDrawer.jsx";
import TransportCard from "../components/transport/card/TransportCard.jsx";
import {getUserProfileByEmail} from "../services/userProfile.js";

const Transport = () => {

    const [transports, setTransports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [, setError] = useState("");
    const [userProfileStatus, setUserProfileStatus] = useState([]);

    const fetchUserProfile = () => {
        let token = localStorage.getItem("access_token");
        if (token) {
            token = jwtDecode(token);
            getUserProfileByEmail(token.sub).then(res => {
                setUserProfileStatus(res.data)
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


    const fetchTransports = () => {
        setLoading(true);
        let token = localStorage.getItem("access_token");
        if (token) {
            token = jwtDecode(token);
            getTransportByUserEmail(token.sub).then(res => {
                setTransports(res.data)
            }).catch(err => {
                setError(err.response.data.message)
                errorNotification(
                    err.code,
                    err.response.data.message
                )
            }).finally(() => {
                setLoading(false)
            })
        }
    }

    useEffect(() => {
        fetchTransports();
    }, [])


    if (loading) {
        return (
            <SidebarWithHeader>
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
            </SidebarWithHeader>
        )
    }

    return (
        <SidebarWithHeader>
            {userProfileStatus.userStatus === 'INACTIVE' ? (
                <Text fontSize="3xl" textAlign="center" as='em'>
                    Пожалуйста, заполните и отправьте заявку на сотрудничество с нашей компанией на указанную
                    электронную почту, скачав её на главной странице.
                    После рассмотрения вашей заявки, мы предоставим вам доступ к управлению вашим транспортом.
                    Благодарим за ваше внимание и сотрудничество.
                </Text>
            ) : (transports.length <= 0 ?
                 <> <CreateTransportDrawer
                    fetchTransports={fetchTransports}
                />
                <Text>Вы еще не добавили ни один транспорт</Text> </>:
                <>
                    <Box mb={4}><CreateTransportDrawer
                        fetchTransports={fetchTransports}
                    /></Box>
                    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                        {transports.map((transport) => (

                            <TransportCard transport={transport} fetchTansports={fetchTransports} key={transport.id}/>

                        ))}</SimpleGrid>
                </>
                )}
                </SidebarWithHeader>
             )
            }

            export default Transport;