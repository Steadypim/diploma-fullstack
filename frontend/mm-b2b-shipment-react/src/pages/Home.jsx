import {Flex, Grid, GridItem, Heading, Text} from "@chakra-ui/react";
import SidebarWithHeader from "../components/shared/SideBar.jsx";
import {useAuth} from "../components/context/AuthContext.jsx";
import React from "react";
import InfoCard from "../components/home/card/InfoCard.jsx";

const Home = () => {

    const {userProfile} = useAuth();

    return (
        <SidebarWithHeader>
            <Grid
                h="100vh" // Вы можете настроить высоту сетки в соответствии с вашими потребностями
                templateRows="repeat(2, 1fr)" // Две строки с одинаковой высотой
                templateColumns="1fr" // Один столбец
                gap={4} // Пространство между элементами в сетке
            >
                {/* Первая строка */}
                <GridItem rowSpan={1} colSpan={1}>
                    <Flex
                        direction="column"
                        justify="center"
                        align="center"
                        h="100%"
                        px={8}
                        boxShadow="lg"
                        border="1px solid"
                        borderColor="gray.200"
                        borderRadius="md"
                        bgGradient="linear(to-r, gray.800, gray.900)"
                        color="white"
                    >
                        <Heading as="h1" size="2xl" mb={4}>
                            Добро пожаловать в B2B Shipment!
                        </Heading>
                        <Text fontSize="xl" textAlign="center">
                            B2B Shipment - это инновационная платформа для логистов,
                            предоставляющая доступ к сети компаний, предлагающих услуги по хранению
                            и транспортировке грузов. Логисты могут использовать нашу систему
                            для поиска оптимальных маршрутов и выбора лучших поставщиков услуг
                            с помощью нашего эффективного алгоритма. Присоединяйтесь к нам сегодня
                            и оптимизируйте вашу логистику!
                        </Text>
                    </Flex>
                </GridItem>

                {/* Вторая строка */}
                {userProfile?.userType == "WAREHOUSE_REP" ? (
                    <GridItem rowSpan={1} colSpan={1} justifySelf="center" // Выравнивание по горизонтали
                              alignSelf="center">
                        <Grid
                            templateColumns={{
                                base: "1fr",
                                md: "repeat(3, 1fr)"
                            }} // Один столбец на мобильных устройствах, три столбца на более крупных устройствах
                            gap={{base: 4, md: 8}}
                        >
                            <InfoCard
                                imageUrl="infoCard/storage.png"
                                title="Склады"
                                description="Управляйте своими складскими пространствами в одном месте. Добавляйте, удаляйте и редактируйте их в соответствии с вашими потребностями."
                                to="/warehouse"
                            />
                            <InfoCard
                                imageUrl="infoCard/application.png"
                                title="Управление заявками"
                                description="Будьте в курсе всех заявок на хранение. Легко отслеживайте, управляйте и обрабатывайте запросы к вашей компании в удобной форме."
                                to="/warehousereqs"
                            />
                            <InfoCard
                                imageUrl="infoCard/settings.png"
                                title="Настройки"
                                description="Настройте ваш профиль и данные в соответствии с вашими предпочтениями. Обновляйте личную информацию и управляйте доступом к вашему аккаунту для безопасности и удобства."
                                to="/profile"
                            />
                        </Grid>
                    </GridItem>
                ) : null}
                {userProfile?.userType == "TRANSPORT_COMPANY_REP" ? (
                    <GridItem rowSpan={1} colSpan={1} justifySelf="center" // Выравнивание по горизонтали
                              alignSelf="center">
                        <Grid
                            templateColumns={{base: "1fr", md: "repeat(4, 1fr)"}}
                            gap={{base: 4, md: 8}}
                        >
                            <InfoCard
                                imageUrl="infoCard/transportation.png"
                                title="Перевозки"
                                description="Управляйте вашими перевозками в одном месте. Добавляйте, удаляйте и настраивайте информацию о ваших транспортировках с легкостью."
                                to="/service"
                            />
                            <InfoCard
                                imageUrl="infoCard/application.png"
                                title="Управление заявками"
                                description="Будьте в курсе всех заявок на перевозку. Легко отслеживайте, управляйте и обрабатывайте запросы к вашей компании в удобной форме."
                                to="/servicereqs"
                            />
                            <InfoCard
                                imageUrl="infoCard/transport.png"
                                title="Транспорт"
                                description="Управляйте вашим транспортным парком в одном месте. "
                                to="/transport"
                            />
                            <InfoCard
                                imageUrl="infoCard/settings.png"
                                title="Настройки"
                                description="Настройте ваш профиль и данные в соответствии с вашими предпочтениями. Обновляйте личную информацию и управляйте доступом к вашему аккаунту для безопасности и удобства."
                                to="/profile"
                            />
                        </Grid>
                    </GridItem>
                ) : null}
                {userProfile?.userType == "LOGISTICIAN" ? (
                    <GridItem rowSpan={1} colSpan={1} justifySelf="center" // Выравнивание по горизонтали
                              alignSelf="center">
                        <Grid
                            templateColumns={{base: "1fr", md: "repeat(3, 1fr)"}}
                            gap={{base: 4, md: 8}}
                        >
                            <InfoCard
                                imageUrl="infoCard/calculateroute.png"
                                title="Расчёт маршрутов"
                                description="Используйте нашу платформу для расчета оптимальных маршрутов доставки. Просто укажите точку отправления и получения, и наш алгоритм предоставит вам самый дешевый и эффективный маршрут."
                                to="/calculate"
                            />
                            <InfoCard
                                imageUrl="infoCard/application.png"
                                title="Управление заявками"
                                description="Просматривайте и обрабатывайте все свои заявки с помощью нашей удобной платформы."
                                to="/myrequests"
                            />
                            <InfoCard
                                imageUrl="infoCard/settings.png"
                                title="Настройки"
                                description="Настройте ваш профиль и данные в соответствии с вашими предпочтениями. Обновляйте личную информацию и управляйте доступом к вашему аккаунту для безопасности и удобства."
                                to="/profile"
                            />
                        </Grid>
                    </GridItem>
                ) : null}
            </Grid>
        </SidebarWithHeader>
    )
}

export default Home;