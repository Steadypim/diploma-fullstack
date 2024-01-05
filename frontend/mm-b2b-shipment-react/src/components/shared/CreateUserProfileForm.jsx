import {Form, Formik, useField} from 'formik';
import * as Yup from 'yup';
import {Alert, AlertIcon, Box, Button, FormLabel, Input, Select, Stack} from "@chakra-ui/react";
import {saveUser} from "../../services/userProfile";
import {successNotification, errorNotification} from "../../services/notification.js";

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
    );
};

const MySelect = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <Box>
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Select {...field} {...props} />
            {meta.touched && meta.error ? (
                <Alert className="error" status={"error"} mt={2}>
                    <AlertIcon/>
                    {meta.error}
                </Alert>
            ) : null}
        </Box>
    );
};

const CreateUserProfileForm = ({ onSuccess }) => {
    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    type: '',
                    password: ''
                }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email('Введите действительную электронную почту')
                        .required('Обязательное поле'),
                    password: Yup.string()
                        .min(4, 'Пароль должен содержать не меньше 4 символов')
                        .max(15, 'Пароль должен содержать не больше 15 символов')
                        .required('Обязательное поле'),
                    type: Yup.string()
                        .oneOf(
                            ['LOGISTICIAN', 'TRANSPORT_COMPANY_REP', 'WAREHOUSE_REP'],
                            'Неверно выбран тип компании'
                        )
                        .required('Обязательное поле'),
                })}
                onSubmit={(userProfile, {setSubmitting}) => {
                    setSubmitting(true);
                    saveUser(userProfile)
                        .then(res => {
                            console.log(res);
                            successNotification(
                                "Аккаунт создан",
                                `${userProfile.email} успешно создан`
                            )
                            onSuccess(res.headers["authorization"]);
                        }).catch(err => {
                        console.log(err);
                        errorNotification(
                            err.code,
                            "Ошибка входа"
                        )
                    }).finally(() => {
                        setSubmitting(false);
                    })
                }}
            >
                {({isValid, isSubmitting}) => (
                    <Form>
                        <Stack spacing={"24px"}>

                            <MyTextInput
                                label="Адрес электронной почты"
                                name="email"
                                type="email"
                                placeholder="example@shipment.com"
                            />

                            <MyTextInput
                                label="Пароль"
                                name="password"
                                type="password"
                                placeholder={"Введите надежный пароль"}
                            />

                            <MySelect label="Тип компании" name="type">
                                <option value="">Выбрать тип компании</option>
                                <option value="LOGISTICIAN">Логист</option>
                                <option value="TRANSPORT_COMPANY_REP">Представитель транспортной компании</option>
                                <option value="WAREHOUSE_REP">Представитель склада</option>
                            </MySelect>

                            <Button disabled={!isValid || isSubmitting} type="submit">Зарегистрироваться</Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CreateUserProfileForm;