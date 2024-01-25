import {Form, Formik, useField} from 'formik';
import * as Yup from 'yup';
import {Alert, AlertIcon, Box, Button, FormLabel, Select, Stack} from "@chakra-ui/react";
import {errorNotification, successNotification} from "../../services/notification.js";
import {getAllWarehouses} from "../../services/warehouse.js";
import {jwtDecode} from "jwt-decode";
import {useEffect, useState} from "react";
import {LuSave} from "react-icons/lu";
import {saveShipment} from "../../services/shipment.js";


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


const CreateShipmentForm = () => {

    const [warehouses, setWarehouses] = useState([]);
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


    return (
        <>
            <Formik
                initialValues={{
                    sourceWarehouse: '',
                    destinationWarehouse: ''
                }}
                validationSchema={Yup.object({
                                                 sourceWarehouse: Yup.string()
                                                                       .required('Обязательное поле'),
                                                 destinationWarehouse: Yup.string()
                                                                            .required('Обязательное поле')
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

                            <MySelect label="Склад отправления" name="sourceWarehouse">
                                <option value="">Выбрать склад</option>
                                {warehouses.map((warehouse) => (
                                    <option key={warehouse.warehouseId} value={warehouse.warehouseId}>
                                        {warehouse.address.city}, {warehouse.address.street}
                                    </option>
                                ))}
                            </MySelect>

                            <MySelect label="Склад получения" name="destinationWarehouse">
                                <option value="">Выбрать склад</option>
                                {warehouses.map((warehouse) => (
                                    <option key={warehouse.warehouseId} value={warehouse.warehouseId}>
                                        {warehouse.address.city}, {warehouse.address.street}
                                    </option>
                                ))}
                            </MySelect>

                            <Button disabled={!isValid || isSubmitting} type="submit" leftIcon={<LuSave />}>Сохранить</Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CreateShipmentForm;