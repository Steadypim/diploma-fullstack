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
    const {address, warehouseId, price} = entity;
    const country = address.country
    const region = address.region
    const city = address.city
    const street = address.street
    const postalCode = address.postalCode
    const houseNumber = address.houseNumber
    return (
        <>
            <Formik
                initialValues={
                    {
                        country: country,
                        region: region,
                        city: city,
                        street: street,
                        postalCode: postalCode,
                        houseNumber: houseNumber,
                        price: price
                    }
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
                                                 houseNumber: Yup.string(),
                                                 price: Yup.number().required('Не забудьте указать цену!')

                                             })}
                onSubmit={(values, {setSubmitting}) => {
                    setSubmitting(true);
                    let token = localStorage.getItem("access_token");
                    if (token) {
                        token = jwtDecode(token);
                        const warehouseDTO = {
                            address: {
                                country: values.country,
                                region: values.region,
                                city: values.city,
                                street: values.street,
                                postalCode: values.postalCode,
                                houseNumber: values.houseNumber
                            },
                            price: values.price
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

                            <MyTextInput
                                label="Цена за киллограм"
                                name="price"
                                type="price"
                                placeholder="Укажите цену за хранение киллограма груза"
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