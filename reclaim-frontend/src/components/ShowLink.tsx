import { Box, Progress, Spinner, Text } from "@chakra-ui/react";
import { QRCodeSVG } from "qrcode.react"

interface Props {
    url: string;
}

function ShowLink(props: Props) {
    return (
        <>
        <Box p='16px' bgColor='whiteAlpha.900' width={'min-content'} borderRadius={'4px'}>
            <QRCodeSVG value={props.url}/>
        </Box>
        <Box width={'max-content'}>
            <Text mt={'24px'} mb={'16px'} fontFamily={'Inter, sans-serif'} fontSize={'16px'} fontWeight={'semibold'} color={'whiteAlpha.900'} mr={'16px'}>
                Scan the above QR Code to verify your work
            </Text>
            <Progress isIndeterminate size={'xs'} bgColor={'gray.700'} />
        </Box>
        </>
    )
}

export default ShowLink