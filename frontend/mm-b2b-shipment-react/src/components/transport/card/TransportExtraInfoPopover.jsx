import {
    Box, Button, ButtonGroup, IconButton,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent, PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Text
} from "@chakra-ui/react";
import {IoEllipsisHorizontalOutline} from "react-icons/io5";
import React from "react";

const TransportExtraInfoPopover = ({packagingRequirements}) => {
    const initialFocusRef = React.useRef()
    return (
        <Popover
            initialFocusRef={initialFocusRef}
            placement='bottom'
            closeOnBlur={false}
        >
            <PopoverTrigger>
                <Button size={'lg'} variant='link'>...</Button>
            </PopoverTrigger>
            <PopoverContent color='white' bg='gray.700'>
                <PopoverHeader pt={4} fontWeight='bold' border='0'>
                    Требования к упаковке:
                </PopoverHeader>
                <PopoverCloseButton/>
                <PopoverBody>
                    <Text as={'samp'}>
                        {packagingRequirements}
                    </Text>
                </PopoverBody>

            </PopoverContent>
        </Popover>
    )
}

export default TransportExtraInfoPopover;