import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Link, Progress, Text } from "@chakra-ui/react";
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
                Scan the above QR Code to generate proof using <Link href="https://docs.reclaimprotocol.org/installing-reclaim-wallet" target="_blank">Reclaim Wallet <ExternalLinkIcon mx='2px' /></Link>
            </Text>
            <Progress isIndeterminate size={'xs'} bgColor={'gray.700'} />
        </Box>
        </>
    )
}

export default ShowLink