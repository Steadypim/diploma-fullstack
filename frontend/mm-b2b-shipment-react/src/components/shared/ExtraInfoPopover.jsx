import {Button, Popover, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger, Text} from "@chakra-ui/react";
import React from "react";

const ExtraInfoPopover = ({info}) => {
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
                <PopoverCloseButton/>
                <PopoverBody>
                    <Text as={'samp'}>
                        {info}
                    </Text>
                </PopoverBody>

            </PopoverContent>
        </Popover>
    )
}

export default ExtraInfoPopover;