import {Form, Formik, useField} from 'formik';
import * as Yup from 'yup';
import {Alert, AlertIcon, Box, Button, FormLabel, Input, Stack} from "@chakra-ui/react";
import {successNotification, errorNotification} from "../../services/notification.js";
import {saveWarehouse, updateWarehouse} from "../../services/warehouse.js";
import {jwtDecode} from "jwt-decode";
import {LuSave} from "react-icons/lu";
import React from "react";

const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <Box>
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

const UpdateWarehouseForm = ({fetchEntity, entity}) => {
    const {address, warehouseId} = entity;
    return (
        <>
            <Formik
                initialValues={
                    address
                }
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
                onSubmit={(values, {setSubmitting}) => {
                    setSubmitting(true);
                    let token = localStorage.getItem("access_token");
                    if (token) {
                        token = jwtDecode(token);
                        const warehouseDTO = {
                            address: values
                        };
                        updateWarehouse(warehouseDTO, warehouseId)
                            .then(res => {
                                console.log(res);
                                successNotification(
                                    "Склад обновлен",
                                )
                                fetchEntity()
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

                            <Button disabled={!(isValid && dirty) || isSubmitting} type="submit"
                                    leftIcon={<LuSave/>}>Изменить</Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default UpdateWarehouseForm;