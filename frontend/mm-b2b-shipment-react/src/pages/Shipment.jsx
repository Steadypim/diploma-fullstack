import SidebarWithHeader from "../components/shared/SideBar.jsx";
import CreateShipmentForm from "../components/shipment/CreateShipmentForm.jsx";
import {Box, Card, CardBody, CardHeader, Heading} from "@chakra-ui/react";

const Shipment = () => {

    const CustomCard = ({ children, ...rest }) => (
        <Box
            bg="white"
            borderRadius="lg"
            boxShadow="md"
            p={6}
            {...rest}
        >
            {children}
        </Box>
    );

    return (
        <SidebarWithHeader>
            <Card variant={'outline'}>
                <CardHeader style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Heading size={'lg'}>Построение маршрута</Heading>
                </CardHeader>
                <CardBody><CreateShipmentForm/></CardBody>
            </Card>
        </SidebarWithHeader>
    )
}

export default Shipment;