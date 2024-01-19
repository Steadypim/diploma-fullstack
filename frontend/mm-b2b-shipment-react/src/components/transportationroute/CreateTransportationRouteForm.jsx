import {Form, Formik, useField} from 'formik';
import * as Yup from 'yup';
import {Alert, AlertIcon, Box, Button, FormLabel, Input, Select, Stack} from "@chakra-ui/react";
import {errorNotification, successNotification} from "../../services/notification.js";
import {getAllWarehouses} from "../../services/warehouse.js";
import {jwtDecode} from "jwt-decode";
import {saveTransportationRoute} from "../../services/transportationRoute.js";
import {useEffect, useState} from "react";
import {getTransportByUserEmail} from "../../services/transport.js";

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


const CreateTransportationRouteForm = () => {

    const [departureWarehouse, setDepartureWarehouse] = useState('');
    const [arrivalWarehouse, setArrivalWarehouse] = useState('');
    const [warehouses, setWarehouses] = useState([]);
    const [transports, setTransports] = useState([]);
    const [selectedTransport, setSelectedTransport] = useState('');
    const [, setError] = useState("");

    useEffect(() => {
        const fetchWarehouses = async () => {
            try {
                const response = await getAllWarehouses();
                setWarehouses(response.data);
            } catch (error) {
                console.error('Ошибка при получении данных о складах:', error);
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

    const transportTranslation = {
        SHIP: 'Корабль',
        TRAIN: 'Поезд',
        CAR: 'Автомобиль',
        PLANE: 'Самолет',
    };


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

                            <Select
                                placeholder="Выберите склад отправления"
                                value={departureWarehouse}
                                onChange={(e) => setDepartureWarehouse(e.target.value)}
                            >
                                {warehouses.map((warehouse) => (
                                    <option key={warehouse.warehouseId} value={warehouse.warehouseId}>
                                        {warehouse.address.city}
                                    </option>
                                ))}
                            </Select>

                            <Select
                                placeholder="Выберите склад получения"
                                value={arrivalWarehouse}
                                onChange={(e) => setArrivalWarehouse(e.target.value)}
                            >
                                {warehouses.map((warehouse) => (
                                    <option key={warehouse.warehouseId} value={warehouse.warehouseId}>
                                        {warehouse.address.city}
                                    </option>
                                ))}
                            </Select>

                            <Select
                                placeholder="Выберите транспорт"
                                value={selectedTransport}
                                onChange={(e) => setSelectedTransport(e.target.value)}
                            >
                                {transports.map((transport) => (
                                    <option key={transport.id} value={transport.transportType}>
                                        {`${transportTranslation[transport.transportType] || transport.transportType} - 
                                         Грузоподъемность: ${transport.liftingCapacity} кг, 
                                         Объем: ${transport.holdingVolume} л, 
                                         Средняя скорость: ${transport.averageSpeed} км/ч`}
                                    </option>
                                ))}
                            </Select>

                            <MyTextInput
                                label="Цена"
                                name="price"
                                type="price"
                                placeholder="Укажите цену перевозки"
                            />

                            <Button disabled={!isValid || isSubmitting} type="submit">Сохранить</Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CreateTransportationRouteForm;