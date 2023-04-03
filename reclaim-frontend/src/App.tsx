import { Box, Button, Image, Text } from "@chakra-ui/react"

function App() {
  return (
    <>
      <Box position='relative' width='100vw' height='100vh' pl='72px' pt='72px'>
        <Image position='absolute' zIndex='-1' height='100vh' width='100vw' top='0' left='0' src="/background.jpg" />

        <Box fontFamily={'Inter, sans-serif'} color='whiteAlpha.900'>
          <Text fontWeight='bold' fontSize='52px'>
            Google
            <Text ml='8px' fontWeight='medium' fontSize='28px' verticalAlign='2px' display='inline-block'>Summer of Code</Text>
          </Text>
          <Text fontWeight='black' fontSize='96px' position='relative' top='-24px'>2023</Text>
        </Box>

        <Box>
          <Button fontFamily={'Inter, sans-serif'} fontWeight={'medium'} bgColor='hsl(214 82% 50%)' color='whiteAlpha.900' px='32px' py='18px' _hover={{ bg: 'hsl(214 82% 48%)' }}>Show your contribution</Button>
        </Box>

        <Text fontFamily={'Inter, sans-serif'} fontWeight={'bold'} color='whiteAlpha.900' position='absolute' bottom='16px' right='16px' fontSize='12px'>Powered by ReClaim Protocol</Text>
      </Box>
    </>
    )
  }

  export default App
