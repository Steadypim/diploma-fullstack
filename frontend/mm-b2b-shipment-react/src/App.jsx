import SidebarWithHeader from "./components/shared/SideBar.jsx";
import {Button} from "@chakra-ui/react";

function App() {

    return (
        <SidebarWithHeader>
            <Button variant='outline' colorScheme='teal'>Click me</Button>
        </SidebarWithHeader>
    )
}

export default App
