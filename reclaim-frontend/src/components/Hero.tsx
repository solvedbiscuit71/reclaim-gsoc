import { Box,  Image, Text } from "@chakra-ui/react"

function Hero() {
    return (
        <>
        <Image position='absolute' zIndex='-1' height='100vh' width='100vw' top='0' left='0' src="/background.jpg" />

        <Box fontFamily={'Inter, sans-serif'} color='whiteAlpha.900'>
          <Text fontWeight='bold' fontSize='36px' display='inline-block'>Google</Text>
          <Text ml='8px' fontWeight='medium' fontSize='18px' verticalAlign='2px' display='inline-block'>Summer of Code</Text>
          <Text fontWeight='black' fontSize='72px' position='relative' top='-24px'>2023</Text>
        </Box>
        </>
    )
}

export default Hero