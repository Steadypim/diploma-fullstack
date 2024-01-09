import {Form, Formik, useField} from 'formik';
import * as Yup from 'yup';
import {Alert, AlertIcon, Box, Button, FormLabel, Input, Stack} from "@chakra-ui/react";
import {successNotification, errorNotification} from "../../services/notification.js";
import {saveWarehouse} from "../../services/warehouse.js";

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

const CreateUserProfileForm = () => {
    return (
        <>
            <Formik
                initialValues={{
                    country: '',
                    region: '',
                    city: '',
                    street: '',
                    postalCode: '',
                    houseNumber: ''
                }}
                validationSchema={Yup.object({
                    country: Yup.string()
                        .required('Обязательное поле'),
                    region: Yup.string()
                        .required('Обязательное поле'),
                    city: Yup.string()
                        .required('Обязательное поле'),
                    street: Yup.string()
                        .required('Обязательное поле'),
                    postalCode: Yup.string(),
                    houseNumber: Yup.string()
                })}
                onSubmit={(warehouse, {setSubmitting}) => {
                    setSubmitting(true);
                    saveWarehouse(warehouse)
                        .then(res => {
                            console.log(res);
                            successNotification(
                                "Склад добавлен",
                            )
                        }).catch(err => {
                        console.log(err);
                        errorNotification(
                            err.code,
                            "Ошибка сохранения"
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
                                label="Почтовый индекс"
                                name="postalCode"
                                type="postalCode"
                                placeholder="Введите почтовый индекс"
                            />

                            <MyTextInput
                                label="Номер дома"
                                name="houseNumber"
                                type="houseNumber"
                                placeholder="Введите номер дома"
                            />

                            <Button disabled={!isValid || isSubmitting} type="submit">Сохранить</Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CreateUserProfileForm;