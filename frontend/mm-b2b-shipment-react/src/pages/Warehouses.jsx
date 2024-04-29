import SidebarWithHeader from "../components/shared/SideBar.jsx";
import CreateWarehouseDrawer from "../components/warehouse/CreateWarehouseDrawer.jsx";
import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {errorNotification} from "../services/notification.js";
import {Box, SimpleGrid, Spinner, Text} from "@chakra-ui/react";
import {getWarehousesByUserEmail} from "../services/warehouse.js";
import WarehouseCard from "../components/warehouse/card/WarehouseCard.jsx";
import {getUserProfileByEmail} from "../services/userProfile.js";

const Warehouses = () => {

    const [warehouses, setWarehouses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [, setError] = useState("");
    const [userProfileStatus, setUserProfileStatus] = useState({});

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


    const fetchWarehouses = () => {
        setLoading(true);
        let token = localStorage.getItem("access_token");
        if (token) {
            token = jwtDecode(token);
            getWarehousesByUserEmail(token.sub).then(res => {
                setWarehouses(res.data)
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
        fetchWarehouses();
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
                    После рассмотрения вашей заявки, мы предоставим вам доступ к управлению вашими складами.
                    Благодарим за ваше внимание и сотрудничество.
                </Text>
            ) : (warehouses.length <= 0 ? <Text>Вы еще не добавили ни один склад</Text> :
                 <>
                     <Box mb={4}><CreateWarehouseDrawer
                         fetchWarehouses={fetchWarehouses}
                     /></Box>
                     <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                         {warehouses.map((warehouse) => (

                             <WarehouseCard key={warehouse.warehouseId} warehouse={warehouse}
                                            fetchWarehouses={fetchWarehouses}/>

                         ))}</SimpleGrid>
                 </>
             )}
        </SidebarWithHeader>
    )
}

export default Warehouses;