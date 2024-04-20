import {Flex, Grid, GridItem, Heading, Text} from "@chakra-ui/react";
import SidebarWithHeader from "../components/shared/SideBar.jsx";
import {useAuth} from "../components/context/AuthContext.jsx";
import React, {useState} from "react";
import InfoCard from "../components/home/card/InfoCard.jsx";
import PdfViewer from "../components/home/PdfViewer.jsx";
import {FaRegFilePdf} from "react-icons/fa";

const Home = () => {

    const {userProfile} = useAuth();
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({numPages}) {
        setNumPages(numPages);
    }

    return (
        <SidebarWithHeader>
            <Grid
                h="100vh"
                templateRows="2fr 2fr 2fr" // Первая и третья строки занимают равную высоту, а вторая строка занимает высоту контента
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
                <GridItem mt={'10px'} mb={'20px'}>
                    <Flex
                        direction="column" // Изменено на column, чтобы элементы располагались вертикально
                        h="100%" // Высота изменена на 100%
                        justify="center"
                        px={8}
                        boxShadow="lg"
                        border="1px solid"
                        borderColor="gray.200"
                        borderRadius="md"
                        bgGradient="linear(to-r, gray.800, gray.900)"
                        color="white"
                        rowGap={'50px'}
                        pl={'30px'}
                        pr={'30px'}
                        pb={'30px'}
                        pt={'20px'}
                    >
                        <Text fontSize="2xl" textAlign={'center'}>
                            Пожалуйста, ознакомьтесь с договором, заполните приложения и отправьте на адрес:
                            <a href="mailto:b2b@shipment.ru" style={{
                                marginLeft: "4px",
                                textDecoration: "underline",
                                color: "white"
                            }}>b2b@shipment.ru</a>
                        </Text>

                        <Flex direction="row" justify="space-between" align="center">
                            <Flex align="center">
                                <FaRegFilePdf size={'36px'}/>
                                <Text fontSize="xl" ml={2}>Договор оферты</Text>
                            </Flex>
                            <PdfViewer pdfUrl={"zyxmwqdobx3333efgzuvye3xva9wg7i4.pdf"}/>
                        </Flex>
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