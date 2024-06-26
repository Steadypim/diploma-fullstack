import React from 'react';
import {
    Avatar,
    Box,
    CloseButton,
    Drawer,
    DrawerContent,
    Flex,
    HStack,
    Icon,
    IconButton,
    Image,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useColorModeValue,
    useDisclosure,
    VStack
} from '@chakra-ui/react';
import {FiChevronDown, FiMenu,} from 'react-icons/fi';

import {LuCalculator, LuHome, LuShip, LuTruck, LuWarehouse} from "react-icons/lu";
import {useAuth} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {MdOutlineRequestQuote} from "react-icons/md";
import {SlSettings} from "react-icons/sl";


export default function SidebarWithHeader({children}) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent
                onClose={() => onClose}
                display={{base: 'none', md: 'block'}}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose}/>
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav onOpen={onOpen}/>
            <Box ml={{base: 0, md: 60}} p="4">
                {children}
            </Box>
        </Box>
    );
}


const SidebarContent = ({onClose, ...rest}) => {

    const {userProfile} = useAuth();

    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{base: 'full', md: 60}}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" flexDirection="column" alignItems="center" mx="8" mb={150} mt={2}
                  justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" mb={5}>
                    B2B Shipment
                </Text>
                <Image
                    boxSize='170px'
                    src='2.png'
                    alt='B2B Shipment'
                />
                <CloseButton display={{base: 'flex', md: 'none'}} onClick={onClose}/>
            </Flex>
            {userProfile?.userType != "ADMIN" ? (
                <NavItem icon={LuHome} to={"/main"}>
                    Главная
                </NavItem>
            ) : null}
            {userProfile?.userType == "LOGISTICIAN" ? (
                <NavItem icon={LuCalculator} to={"/calculate"}>
                    Расчёт маршрутов
                </NavItem>
            ) : null}
            {userProfile?.userType == "LOGISTICIAN" ? (
                <NavItem icon={LuCalculator} to={"/myrequests"}>
                    Управление заявками
                </NavItem>
            ) : null}
            {userProfile?.userType == "TRANSPORT_COMPANY_REP" ? (
                <NavItem icon={LuShip} to={"/service"}>
                    Перевозки
                </NavItem>
            ) : null}
            {userProfile?.userType == "TRANSPORT_COMPANY_REP" ? (
                <NavItem icon={MdOutlineRequestQuote} to={"/servicereqs"}>
                    Управление заявками
                </NavItem>
            ) : null}
            {userProfile?.userType == "WAREHOUSE_REP" ? (
                <NavItem icon={LuWarehouse} to={"/warehouse"}>
                    Склады
                </NavItem>
            ) : null}
            {userProfile?.userType == "WAREHOUSE_REP" ? (
                <NavItem icon={MdOutlineRequestQuote} to={"/warehousereqs"}>
                    Управление заявками
                </NavItem>
            ) : null}
            {userProfile?.userType == "TRANSPORT_COMPANY_REP" ? (
                <NavItem icon={LuTruck} to={"/transport"}>
                    Транспорт
                </NavItem>
            ) : null}
            {userProfile?.userType != "ADMIN" ? (
                <NavItem icon={SlSettings} to={"/profile"}>
                    Настройки
                </NavItem>) : null}
        </Box>
    );
};


const NavItem = ({icon, children, to, ...rest}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (to) {
            navigate(to);
        }
    };

    return (
        <Flex
            align="center"
            p="4"
            mx="4"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            _hover={{
                bg: 'gray.600',
                color: 'white',
            }}
            onClick={handleClick}
            {...rest}>
            {icon && (
                <Icon
                    mr="4"
                    fontSize="16"
                    _groupHover={{
                        color: 'white',
                    }}
                    as={icon}
                />
            )}
            {children}
        </Flex>
    )
        ;
};

const userTypeTranslation = {
    LOGISTICIAN: 'ЛОГИСТИКА',
    TRANSPORT_COMPANY_REP: 'ПЕРЕВОЗКИ',
    WAREHOUSE_REP: 'ХРАНЕНИЕ',
};


const MobileNav = ({onOpen, ...rest}) => {
    const {logout, userProfile} = useAuth();

    return (
        <Flex
            ml={{base: 0, md: 60}}
            px={{base: 4, md: 4}}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{base: 'space-between', md: 'flex-end'}}
            {...rest}>
            <IconButton
                display={{base: 'flex', md: 'none'}}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu/>}
            />

            <Text
                display={{base: 'flex', md: 'none'}}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold">
                Logo
            </Text>

            <HStack spacing={{base: '0', md: '6'}}>

                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{boxShadow: 'none'}}>
                            <HStack>
                                <Avatar
                                    size={'sm'}
                                    src={
                                        userProfile?.userType == "TRANSPORT_COMPANY_REP"
                                        ? "transp.png"
                                        : userProfile?.userType == "LOGISTICIAN"
                                          ? "logist.png"
                                          : userProfile?.userType == "WAREHOUSE_REP"
                                            ? 'wh.png'
                                            : ''
                                    }
                                />
                                <VStack
                                    display={{base: 'none', md: 'flex'}}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2">
                                    <Text fontSize="sm">
                                        {userProfile?.email}
                                    </Text>
                                    <Text fontSize="xs" color="gray.600">
                                        {userTypeTranslation[userProfile?.userType] || userProfile?.userType}
                                    </Text>
                                </VStack>
                                <Box display={{base: 'none', md: 'flex'}}>
                                    <FiChevronDown/>
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue('white', 'gray.900')}
                            borderColor={useColorModeValue('gray.200', 'gray.700')}>
                            <MenuItem onClick={logout}>
                                Выйти
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};