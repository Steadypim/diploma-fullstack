'use client'

import {
    Button,
    Checkbox,
    Flex,
    Text,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Image, Alert, AlertIcon, Box,
} from '@chakra-ui/react'
import {Formik, Form, useField} from "formik";
import * as Yup from 'yup';
import {useAuth} from "../context/AuthContext.jsx";
import {errorNotification} from "../../services/notification.js";

const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <Box>
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <Alert className="error" status={"error"} mt={2}>
                    <AlertIcon/>
                    {meta.error}
                </Alert>
            ) : null}
        </Box>
    )
}

const LoginForm = () => {
    const {login} = useAuth();

    return (
        <Formik
            validateOnMount={true}
            validationSchema={
                Yup.object({
                    username: Yup.string()
                        .email("Введите действительный email")
                        .required("Требуется email"),
                    password: Yup.string()
                        .max(20, "Пароль не может быть больше 20 символов")
                        .required("Требуется пароль")
                })}
            initialValues={{username: '', password: ''}}
            onSubmit={(values, {setSubmitting}) => {
                setSubmitting(true);
                login(values).then(res => {
                    //navigate to main
                    console.log("success login", res)
                }).catch(err => {
                    errorNotification(
                        "Ошибка входа",
                        err.code
                    )
                }).finally(()=> {
                    setSubmitting(false);
                })
            }}>

            {({isValid, isSubmitting}) => (
                <Form>
                    <Stack spacing={15}>
                        <MyTextInput
                            label={"Адрес электронной почты"}
                            name={"username"}
                            type={"email"}
                            placeHolder={"example@shipment.com"}
                        />
                        <MyTextInput
                        label={"Пароль"}
                        name={"password"}
                        type={"password"}
                        placeHolder={"Введите пароль"}
                    />
                        <Button disabled={!isValid || isSubmitting} type={"submit"} colorScheme='teal' textColor='white'>Войти</Button>
                    </Stack>
                </Form>
            )}
        </Formik>
    )
}

const Login = () => {
    return (
        <Stack minH={'100vh'} direction={{base: 'column', md: 'row'}}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={4} w={'full'} maxW={'md'}>
                    <Heading fontSize={'2xl'} mb={15}>Войдите в свой аккаунт</Heading>
                    <LoginForm/>
                </Stack>
            </Flex>
            <Flex flex={1}>
                <Image
                    alt={'Login Image'}
                    objectFit={'cover'}
                    src={
                        'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    }
                />
            </Flex>
        </Stack>
    )
}

export default Login;