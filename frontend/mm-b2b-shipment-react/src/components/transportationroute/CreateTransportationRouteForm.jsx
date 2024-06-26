import {Form, Formik, useField} from 'formik';
import * as Yup from 'yup';
import {Alert, AlertIcon, Box, Button, FormLabel, Input, Select, Stack} from "@chakra-ui/react";
import {errorNotification, successNotification} from "../../services/notification.js";
import {getAllWarehouses} from "../../services/warehouse.js";
import {jwtDecode} from "jwt-decode";
import {saveTransportationRoute} from "../../services/transportationRoute.js";
import {useEffect, useState} from "react";
import {getTransportByUserEmail} from "../../services/transport.js";
import {LuSave} from "react-icons/lu";

// eslint-disable-next-line react/prop-types
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

// eslint-disable-next-line react/prop-types
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

const transportTranslation = {
    SHIP: 'Корабль',
    TRAIN: 'Поезд',
    CAR: 'Автомобиль',
    PLANE: 'Самолет',
};

const CreateTransportationRouteForm = ({fetchTransportationRoutes}) => {

    const [warehouses, setWarehouses] = useState([]);
    const [transports, setTransports] = useState([]);
    const [, setError] = useState("");

    useEffect(() => {
        const fetchWarehouses = async () => {
            try {
                const response = await getAllWarehouses();
                setWarehouses(response.data);
            } catch (err) {
                setError(err.response.data.message)
                errorNotification(
                    err.code,
                    err.response.data.message
                )
            }
        };

        fetchWarehouses();
    }, []);

    useEffect(() => {
        const fetchTransports = async () => {
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
                })
            }
        };
        fetchTransports();
    }, [])


    return (
        <>
            <Formik
                initialValues={{
                    sourceWarehouseId: '',
                    destinationWarehouseId: '',
                    transportId: '',
                    price: '',
                }}
                validationSchema={Yup.object({
                                                 sourceWarehouseId: Yup.string()
                                                                       .required('Обязательное поле'),
                                                 destinationWarehouseId: Yup.string()
                                                                            .required('Обязательное поле'),
                                                 transportId: Yup.string()
                                                                 .required('Обязательное поле'),
                                                 price: Yup.number()
                                                           .required('Обязательное поле')
                                             })}
                onSubmit={(transportationRoute, {setSubmitting}) => {
                    setSubmitting(true);
                    let token = localStorage.getItem("access_token");
                    if (token) {
                        token = jwtDecode(token);
                        saveTransportationRoute(transportationRoute, token.sub)
                            .then(res => {
                                console.log(res);
                                successNotification(
                                    "Перевозка добавлена",
                                )
                                fetchTransportationRoutes()
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

                            <MySelect label="Склад отправления" name="sourceWarehouseId">
                                <option value="">Выбрать склад</option>
                                {warehouses.map((warehouse) => (
                                    <option key={warehouse.warehouseId} value={warehouse.warehouseId}>
                                        {warehouse.address.region}, {warehouse.address.city}, {warehouse.address.street},
                                    </option>
                                ))}
                            </MySelect>

                            <MySelect label="Склад получения" name="destinationWarehouseId">
                                <option value="">Выбрать склад</option>
                                {warehouses.map((warehouse) => (
                                    <option key={warehouse.warehouseId} value={warehouse.warehouseId}>
                                        {warehouse.address.region}, {warehouse.address.city}, {warehouse.address.street}
                                    </option>
                                ))}
                            </MySelect>

                            <MySelect label="Транспорт" name="transportId">
                                <option value="">Выбрать транспорт</option>
                                {transports.map((transport) => (
                                    <option key={transport.id} value={transport.id}>
                                        {`${transportTranslation[transport.transportType] || transport.transportType} - 
                                         Грузоподъемность: ${transport.liftingCapacity} кг, 
                                         Объем: ${transport.holdingVolume} л, 
                                         Средняя скорость: ${transport.averageSpeed} км/ч`}
                                    </option>
                                ))}
                            </MySelect>


                            <MyTextInput
                                label="Цена за киллограм"
                                name="price"
                                type="price"
                                placeholder="Укажите цену перевозки"
                            />

                            <Button disabled={!isValid || isSubmitting} type="submit" leftIcon={<LuSave />}>Сохранить</Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CreateTransportationRouteForm;