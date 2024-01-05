import {useAuth} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {Flex, Heading, Image, Link, Stack} from "@chakra-ui/react";
import CreateUserProfileForm from "../shared/CreateUserProfileForm.jsx";

const Signup = () => {
    const { userProfile, setUserProfileFromToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if ( userProfile ) {
            navigate("/main");
        }

    })

    return (
        <Stack minH={'100vh'} direction={{base: 'column', md: 'row'}}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={4} w={'full'} maxW={'md'}>
                    <Heading fontSize={'2xl'} mb={15}>Зарегистрируйтесь 🚢</Heading>
                    <CreateUserProfileForm onSuccess={(token) => {
                        localStorage.setItem("access_token", token)
                        setUserProfileFromToken()
                        navigate("/main")
                    }}/>
                    <Link color={"blue.500"} href={"/"}>
                        Уже есть аккаунт? Войти.
                    </Link>
                </Stack>
            </Flex>
            <Flex flex={1}>
                <Image
                    alt={'Login Image'}
                    objectFit={'cover'}
                    src={
                        'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    }
                />
            </Flex>
        </Stack>
    )
}

export default Signup;