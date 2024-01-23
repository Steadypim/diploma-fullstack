import {Form, Formik, useField} from 'formik';
import * as Yup from 'yup';
import {Alert, AlertIcon, Box, Button, FormLabel, Input, Select, Stack} from "@chakra-ui/react";
import {errorNotification, successNotification} from "../../services/notification.js";
import {getAllWarehouses} from "../../services/warehouse.js";
import {jwtDecode} from "jwt-decode";
import {updateTransportationRoute} from "../../services/transportationRoute.js";
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

const UpdateTransportationRouteForm = ({fetchEntity, entity}) => {

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
                initialValues={
                    entity
                }
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
                        updateTransportationRoute(transportationRoute, entity.id)
                            .then(res => {
                                console.log(res);
                                successNotification(
                                    "Перевозка обновлена",
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

                            <MySelect label="Склад отправления" name="sourceWarehouseId">
                                <option value="">{entity.sourceWarehouseName}</option>
                                {warehouses.map((warehouse) => (
                                    <option key={warehouse.warehouseId} value={warehouse.warehouseId}>
                                        {warehouse.address.city}, {warehouse.address.street}
                                    </option>
                                ))}
                            </MySelect>

                            <MySelect label="Склад получения" name="destinationWarehouseId">
                                <option value="">{entity.destinationWarehouseName}</option>
                                {warehouses.map((warehouse) => (
                                    <option key={warehouse.warehouseId} value={warehouse.warehouseId}>
                                        {warehouse.address.city}, {warehouse.address.street}
                                    </option>
                                ))}
                            </MySelect>

                            <MySelect label="Транспорт" name="transportId">
                                <option value="">{transportTranslation[entity.transportName] || entity.transportName}</option>
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
                                label="Цена"
                                name="price"
                                type="price"
                                placeholder="Введите стоимость перевозки"
                            />

                            <Button disabled={!(isValid && dirty) || isSubmitting} type="submit" leftIcon={<LuSave />}>Изменить</Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </>
    );
};


export default UpdateTransportationRouteForm;