import {Form, Formik, useField} from 'formik';
import * as Yup from 'yup';
import {Alert, AlertIcon, Box, Button, FormLabel, Input, Select, Stack, Text} from "@chakra-ui/react";
import {errorNotification, successNotification} from "../../services/notification.js";
import {getAllWarehouses} from "../../services/warehouse.js";
import {jwtDecode} from "jwt-decode";
import React, {useEffect, useState} from "react";
import {LuSave} from "react-icons/lu";
import {saveShipment} from "../../services/shipment.js";
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import {Icon} from 'leaflet'
import "leaflet/dist/leaflet.css"
import "../../index.css"

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

const customIcon = new Icon({
                                iconUrl: "https://cdn-icons-png.flaticon.com/128/12348/12348520.png",
                                iconSize: [38, 38]
                            });

const CreateShipmentForm = () => {
    const [warehouses, setWarehouses] = useState([]);
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);

    useEffect(() => {
        const fetchWarehouses = async () => {
            try {
                const response = await getAllWarehouses();
                setWarehouses(response.data);
            } catch (err) {
                errorNotification(
                    err.code,
                    err.response.data.message
                );
            }
        };

        fetchWarehouses();
    }, []);

    const handleMarkerClick = (warehouse) => {
        setSelectedWarehouse(warehouse);
    };

    return (
        <>
            <Formik
                initialValues={{
                    sourceWarehouse: '',
                    destinationWarehouse: '',
                    weight: '',
                    name: '',
                    description: ''
                }}
                validationSchema={Yup.object({
                                                 sourceWarehouse: Yup.string().required('Укажите точку отправления'),
                                                 destinationWarehouse: Yup.string().required('Укажите точку получения'),
                                                 weight: Yup.number().required('Укажите вес посылки, он влияет на цену!'),
                                                 name: Yup.string().required('Укажите название посылки'),
                                                 description: Yup.string().notRequired()
                                             })}
                onSubmit={(shipment, {setSubmitting}) => {
                    setSubmitting(true);
                    let token = localStorage.getItem("access_token");
                    if (token) {
                        token = jwtDecode(token);
                        saveShipment(shipment, token.sub)
                            .then(res => {
                                console.log(res);
                                successNotification(
                                    "Заявка оформлена",
                                );
                            }).catch(err => {
                            console.log(err);
                            errorNotification(
                                "К сожалению, мы пока не можем доставить туда"
                            );
                        }).finally(() => {
                            setSubmitting(false);
                        });
                    }
                }}
            >
                {({isValid, isSubmitting, setFieldValue}) => (
                    <Form>
                        {warehouses.length <= 0 ? <Text align={'center'} fontSize='xl' >К сожалению, пока нет доступных складов для перевозки</Text> : ''}
                        <Stack spacing={"24px"}>
                            <MySelect label="Склад отправления" name="sourceWarehouse">
                                <option value="">Выбрать склад</option>
                                {warehouses.map((warehouse) => (
                                    <option key={warehouse.warehouseId} value={warehouse.warehouseId}>
                                        {warehouse.address.city}, {warehouse.address.street}, {warehouse.address.houseNumber}
                                    </option>
                                ))}
                            </MySelect>

                            <MySelect label="Склад получения" name="destinationWarehouse">
                                <option value="">Выбрать склад</option>
                                {warehouses.map((warehouse) => (
                                    <option key={warehouse.warehouseId} value={warehouse.warehouseId}>
                                        {warehouse.address.city}, {warehouse.address.street}, {warehouse.address.houseNumber}
                                    </option>
                                ))}
                            </MySelect>

                            <div style={{height: "400px" , marginBottom: "20px"}}>
                                <Text align={'center'} fontSize='xl' >Вы можете выбрать точки маршрута на карте</Text>
                                <MapContainer center={[57.071625, 87.597474]} zoom={3} style={{height: "100%"}}>
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    {warehouses.map((warehouse) => (
                                        <Marker key={warehouse.warehouseId}
                                                position={[warehouse.latitude, warehouse.longitude]} icon={customIcon}
                                                eventHandlers={{
                                                    click: () => {
                                                        handleMarkerClick(warehouse);
                                                        // setFieldValue('sourceWarehouse', warehouse.warehouseId);
                                                    }
                                                }}>
                                            <Popup>
                                                {warehouse.address.city}, {warehouse.address.street}, {warehouse.address.houseNumber}
                                                <Button onClick={() => {
                                                    setFieldValue('sourceWarehouse', warehouse.warehouseId);
                                                    setSelectedWarehouse(null);
                                                }} style={{
                                                    margin: "5px",
                                                    padding: "8px",
                                                    backgroundColor: "#3182ce",
                                                    color: "#fff",
                                                    border: "none",
                                                    cursor: "pointer"
                                                }}>Сделать пунктом отправления</Button>
                                                <Button onClick={() => {
                                                    setFieldValue('destinationWarehouse', warehouse.warehouseId);
                                                    setSelectedWarehouse(null);
                                                }} style={{
                                                    margin: "5px",
                                                    padding: "8px",
                                                    backgroundColor: "#3182ce",
                                                    color: "#fff",
                                                    border: "none",
                                                    cursor: "pointer"
                                                }}>Сделать пунктом получения</Button>
                                            </Popup>
                                        </Marker>
                                    ))}
                                </MapContainer>
                            </div>

                            <MyTextInput
                                label="Название"
                                name="name"
                                type="name"
                                placeholder="Укажите название посылки. Что это?"
                            />

                            <MyTextInput
                                label="Вес (кг)"
                                name="weight"
                                type="weight"
                                placeholder="Укажите вес посылки, от него зависит цена на перевозку!"
                            />

                            <MyTextInput
                                label="Описание"
                                name="description"
                                type="description"
                                placeholder="Здесь вы можете подробнее описать ваш груз, указав требования к упаковке или другую важную информацию"
                            />

                            <Button disabled={!isValid || isSubmitting} type="submit"
                                    leftIcon={<LuSave/>}>Сохранить</Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CreateShipmentForm;
