import {Alert, AlertIcon, Box, Button, Flex, FormLabel, Grid, Image, Input, Spinner} from "@chakra-ui/react";

import {Form, Formik, useField} from 'formik';
import * as Yup from 'yup';
import {jwtDecode} from "jwt-decode";
import React, {useEffect, useState} from "react";
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
                                                 firstName: Yup.string().required('Укажите имя'),
                                                 lastName: Yup.string().required('Укажите фамилию'),
                                                 patronymic: Yup.string().required('Укажите отчество'),
                                                 password: Yup.string(),
                                                 phone: Yup.string().matches(phoneRegExp, 'Номер не действительный').max(12, "Номер должен состоять из 11 цифр")
                                                           .required('Укажите номер телефона'),
                                                 companyName: Yup.string().required('Укажите название компании'),
                                                 INN: Yup.string()
                                                         .min(10, 'ИНН должен содержать 10 символов')
                                                         .max(10, 'ИНН должен содержать 10 символов')
                                                     .required('Укажите ИНН'),
                                                 OGRN:Yup.string()
                                                         .min(13, 'ОГРН/ОГРНИП должен содержать не менее 13 символов')
                                                         .max(13, 'ОГРН/ОГРНИП должен содержать не более 15 символов')
                                                     .required('Укажите ОГРН/ОГРНИП'),
                                                 country: Yup.string().required('Укажите страну'),
                                                 region: Yup.string().required('Укажите регион'),
                                                 city: Yup.string().required('Укажите город'),
                                                 street: Yup.string().required('Укажите улицу'),
                                                 postalCode: Yup.string().notRequired(),
                                                 houseNumber: Yup.string().required('Укажите номер дома')


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
                        <Grid templateColumns="1fr 1fr 1fr" gap={6} alignItems="center" p={"5%"} >
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
                            <Box gridColumn={2} maxWidth="80%">
                                <Box mb={4} fontSize="3xl" fontWeight="bold" textAlign="center">
                                    Персональные данные
                                </Box>
                                <Flex direction="column" gap={4}>
                                    <MyTextInput
                                        label="Название компании"
                                        name="companyName"
                                        type="companyName"
                                        placeholder="Укажите название компании, которую представляете"
                                    />
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
                                        label="ИНН"
                                        name="INN"
                                        type="INN"
                                        placeholder="Укажите ИНН компании"
                                    />
                                    <MyTextInput
                                        label="ОГРН/ОГРНИП"
                                        name="OGRN"
                                        type="OGRN"
                                        placeholder="Укажите ОГРН/ОГРНИП"
                                    />

                                    <MyTextInput
                                        label="Пароль"
                                        name="password"
                                        type="password"
                                        placeholder="Можете обновить пароль"
                                    />
                                </Flex>
                            </Box>
                            <Box gridColumn={3} maxWidth="80%">
                                <Box mb={4} fontSize="3xl" fontWeight="bold" textAlign="center">
                                    Адрес
                                </Box>
                                <Flex direction="column" gap={4}>
                                    <MyTextInput
                                        label="Страна"
                                        name="country"
                                        type="country"
                                        placeholder="Введите страну"
                                    />

                                    <MyTextInput
                                        label="Регион"
                                        name="region"
                                        type="region"
                                        placeholder="Введите регион"
                                    />

                                    <MyTextInput
                                        label="Город"
                                        name="city"
                                        type="city"
                                        placeholder="Введите город"
                                    />

                                    <MyTextInput
                                        label="Улица"
                                        name="street"
                                        type="street"
                                        placeholder="Введите улицу"
                                    />

                                    <MyTextInput
                                        label="Номер дома"
                                        name="houseNumber"
                                        type="houseNumber"
                                        placeholder="Введите номер дома"
                                    />

                                    <MyTextInput
                                        label="Почтовый индекс"
                                        name="postalCode"
                                        type="postalCode"
                                        placeholder="Введите почтовый индекс"
                                    />
                                </Flex>
                            </Box>
                        </Grid>
                        <Flex justifyContent="center">
                            <Button
                                colorScheme='facebook'
                                variant='solid'
                                width={'30%'}
                                size={'md'}
                                mt={4}
                                disabled={!(isValid && dirty) || isSubmitting}
                                type="submit"
                                leftIcon={<LuSave/>}
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