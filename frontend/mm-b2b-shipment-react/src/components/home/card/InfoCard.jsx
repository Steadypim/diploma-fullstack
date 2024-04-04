import {Card, CardBody, CardHeader, Flex, Heading, Image, Text} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

export default function InfoCard({imageUrl, title, description, to}) {

    const navigate = useNavigate();

    const handleClick = () => {
        if (to) {
            navigate(to);
        }
    };

    return (
        <Card maxW='md' onClick={handleClick}
              size={'sm'}
              variant={"outline"}
              boxShadow="lg"
              borderColor="gray.200"
              borderRadius="md"
              bgGradient="linear(to-r, whiteAlpha.50, blackAlpha.50)"
              color="white">
            <Flex justify="center" align="center" h="150px">
                <Image
                    p="10px"
                    boxSize="150px"
                    objectFit="cover"
                    src={imageUrl}
                    alt={title}
                />
            </Flex>
            <CardHeader>
                <Heading size='md'>{title}</Heading>
            </CardHeader>
            <CardBody>
                <Text>{description}</Text>
            </CardBody>
        </Card>
    )
}