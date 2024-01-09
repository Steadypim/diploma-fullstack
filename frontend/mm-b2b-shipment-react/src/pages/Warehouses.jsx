import SidebarWithHeader from "../components/shared/SideBar.jsx";
import CreateWarehouseDrawer from "../components/warehouse/CreateWarehouseDrawer.jsx";

const Warehouses = () => {

    return (
        <SidebarWithHeader>
            <CreateWarehouseDrawer></CreateWarehouseDrawer>
        </SidebarWithHeader>
    )
}

export default Warehouses;