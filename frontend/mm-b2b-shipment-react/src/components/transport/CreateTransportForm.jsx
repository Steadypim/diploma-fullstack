import {Form, Formik, useField} from 'formik';
import * as Yup from 'yup';
import {Alert, AlertIcon, Box, Button, FormLabel, Input, Select, Stack} from "@chakra-ui/react";
import {errorNotification, successNotification} from "../../services/notification.js";
import {jwtDecode} from "jwt-decode";
import {LuSave} from "react-icons/lu";
import React from "react";
import {saveTransport} from "../../services/transport.js";

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

const CreateTransportForm = ({fetchTransports}) => {
    return (
        <>
            <Formik
                initialValues={{
                    transportType: '',
                    liftingCapacity: '',
                    holdingVolume: '',
                    averageSpeed: '',
                    packagingRequirements: ''
                }}
                validationSchema={Yup.object({
                                                 transportType: Yup.string()
                                                             .required('Обязательное поле'),
                                                 liftingCapacity: Yup.number()
                                                            .required('Обязательное поле'),
                                                 holdingVolume: Yup.number()
                                                          .required('Обязательное поле'),
                                                 averageSpeed: Yup.number()
                                                            .required('Обязательное поле'),
                                                 packagingRequirements: Yup.string()
                                             })}
                onSubmit={(transport, {setSubmitting}) => {
                    setSubmitting(true);
                    let token = localStorage.getItem("access_token");
                    if(token){
                        token = jwtDecode(token);
                        saveTransport(transport, token.sub)
                            .then(res => {
                                console.log(res);
                                successNotification(
                                    "Транспорт добавлен",
                                )
                                fetchTransports()
                            }).catch(err => {
                            console.log(err);
                            errorNotification(
                                err.code,
                                "Ошибка сохранения"
                            )
                        }).finally(() => {
                            setSubmitting(false);
                        })
                    }
                }}
            >
                {({isValid, isSubmitting}) => (
                    <Form>
                        <Stack spacing={"24px"}>

                            <MySelect label="Вид транспорта" name="transportType">
                                <option value="">Тип транспорта</option>
                                <option value="SHIP">Водный транспорт</option>
                                <option value="TRAIN">Железнодорожный транспорт</option>
                                <option value="CAR">Автомобиль</option>
                                <option value="PLANE">Авиа</option>
                            </MySelect>

                            <MyTextInput
                                label="Грузоподъёмность (кг)"
                                name="liftingCapacity"
                                type="liftingCapacity"
                                placeholder="Введите грузоподъёмность"
                            />

                            <MyTextInput
                                label="Вмещаемый объём (м³)"
                                name="holdingVolume"
                                type="holdingVolume"
                                placeholder="Введите вмещаемый объём"
                            />

                            <MyTextInput
                                label="Средняя скорость (км/ч)"
                                name="averageSpeed"
                                type="averageSpeed"
                                placeholder="Введите среднюю скорость движения транспорта"
                            />

                            <MyTextInput
                                label="Требования к упаковке посылки"
                                name="packagingRequirements"
                                type="packagingRequirements"
                                placeholder="Введите требования к упаковке посылки"
                            />

                            <Button disabled={!isValid || isSubmitting} type="submit" leftIcon={<LuSave />}>Сохранить</Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CreateTransportForm;