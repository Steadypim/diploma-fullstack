import {Alert, AlertIcon, Avatar, Box, Button, Flex, FormLabel, Grid, Image, Input, Spinner} from "@chakra-ui/react";

import {Form, Formik, useField} from 'formik';
import * as Yup from 'yup';
import {jwtDecode} from "jwt-decode";
import {useEffect, useState} from "react";
import {LuSave} from "react-icons/lu";
import {getUserProfileByEmail, updateUser} from "../services/userProfile.js";
import SidebarWithHeader from "../components/shared/SideBar.jsx";
import {errorNotification, successNotification} from "../services/notification.js";

// eslint-disable-next-line react/prop-types
const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <Box margin={'0'}>
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Input className="text-input" {...field} {...props}/>
            {meta.touched && meta.error ? (
                <Alert className="error" status={"error"} mt={2}>
                    <AlertIcon/>
                    {meta.error}
                </Alert>
            ) : null}
        </Box>
    );
};


const UserProfile = ({fetchEntity, entity}) => {

    const [userProfile, setUserProfile] = useState([]);
    const [loading, setLoading] = useState(false);
    const [, setError] = useState("");
    const phoneRegExp = /^\+(?:[0-9] ?){6,14}[0-9]$/;

    const fetchUserProfile = () => {
        setLoading(true);
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
                setLoading(false)
            })
        }
    }

    useEffect(() => {
        fetchUserProfile();
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
            <Formik
                initialValues={
                    userProfile
                }
                validationSchema={Yup.object({
                                                 email: Yup.string()
                                                           .email('Это должен быть email')
                                                           .required('Обязательное поле'),
                                                 firstName: Yup.string(),
                                                 lastName: Yup.string(),
                                                 patronymic: Yup.string(),
                                                 password: Yup.string(),
                                                 phone: Yup.string().matches(phoneRegExp, 'Номер не действительный').max(12, "Номер должен состоять из 11 цифр"),
                                                 profilePicture: Yup.mixed()
                                             })}
                onSubmit={(updateDto, {setSubmitting}) => {
                    setSubmitting(true);
                    let token = localStorage.getItem("access_token");
                    token = jwtDecode(token)
                    if (token) {
                        updateUser(token.sub, updateDto)
                            .then(res => {
                                console.log(res);
                                successNotification(
                                    "Профиль обновлен",
                                )
                            }).catch(err => {
                            console.log(err);
                            errorNotification(
                                err.code,
                                "Ошибка обновления"
                            )
                        }).finally(() => {
                            setSubmitting(false);
                        })
                    }
                }}
            >
                {({isValid, isSubmitting, dirty}) => (
                    <Form>
                        <Grid templateColumns="1fr 2fr" gap={6} alignItems="center"  p={"5%"}>
                            <Flex gridColumn={1} justifyContent="center">
                                <Image w={256} h={256}
                                        src={
                                            userProfile?.userType == "TRANSPORT_COMPANY_REP"
                                            ? "transp.png"
                                            : userProfile?.userType == "LOGISTICIAN"
                                              ? "logist.png"
                                              : userProfile?.userType == "WAREHOUSE_REP"
                                                ? 'wh.png'
                                                : ''}
                                />
                            </Flex>
                            <Flex direction="column" gridColumn="2 / span 2">
                                <MyTextInput
                                    label="Эл.почта"
                                    name="email"
                                    type="email"
                                    placeholder="Укажите электронную почту"
                                />
                                <MyTextInput
                                    label="Фамилия"
                                    name="lastName"
                                    type="lastName"
                                    placeholder="Укажите вашу фамилию"
                                />
                                <MyTextInput
                                    label="Имя"
                                    name="firstName"
                                    type="firstName"
                                    placeholder="Укажите ваше имя"
                                />
                                <MyTextInput
                                    label="Отчество"
                                    name="patronymic"
                                    type="patronymic"
                                    placeholder="Укажите ваше отчество"
                                />
                                <MyTextInput
                                    label="Номер телефона"
                                    name="phone"
                                    type="phone"
                                    placeholder="Укажите ваш номер телефона"
                                />
                                <MyTextInput
                                    label="Пароль"
                                    name="password"
                                    type="password"
                                    placeholder="Можете обновить пароль"
                                />
                            </Flex>
                        </Grid>
                        <Flex justifyContent="center">
                            <Button
                                colorScheme='telegram'
                                variant='solid'
                                width={'30%'}
                                size={'md'}
                                mt={4}
                                disabled={!(isValid && dirty) || isSubmitting}
                                type="submit"
                                leftIcon={<LuSave />}
                            >
                                Сохранить
                            </Button>
                        </Flex>
                    </Form>
                )}
            </Formik>
        </SidebarWithHeader>
    );
};


export default UserProfile;