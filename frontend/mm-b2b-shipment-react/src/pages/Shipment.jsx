import SidebarWithHeader from "../components/shared/SideBar.jsx";
import CreateShipmentForm from "../components/shipment/CreateShipmentForm.jsx";
import {Card, CardBody, CardHeader, Heading} from "@chakra-ui/react";

const Shipment = () => {

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