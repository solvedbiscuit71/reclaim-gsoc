import { Box, Button, Image, Select, Text } from "@chakra-ui/react"
import { useState } from "react"

const listOfOrganiser = {
  "AsyncAPI":  "asyncapi/spec",
  "Conda": "conda/conda",
  "FluxCD": "fluxcd/flux2",
  "OQ Engine": "gem/oq-engine",
  "Matplotlib": "matplotlib/matplotlib",
  "MicroPython": "micropython/micropython",
  "Numpy": "numpy/numpy",
  "Wagtail": "wagtail/wagtail",
  "WasmEdge": "WasmEdge/WasmEdge",
}

function App() {
  const [showForm, setShowForm] = useState(false)
  const [selectOrg, setSelectOrg] = useState("")

  return (
    <>
      <Box position='relative' width='100vw' height='100vh' pl='72px' pt='72px'>
        <Image position='absolute' zIndex='-1' height='100vh' width='100vw' top='0' left='0' src="/background.jpg" />

        <Box fontFamily={'Inter, sans-serif'} color='whiteAlpha.900'>
          <Text fontWeight='bold' fontSize='52px' display='inline-block'>Google</Text>
          <Text ml='8px' fontWeight='medium' fontSize='28px' verticalAlign='2px' display='inline-block'>Summer of Code</Text>
          <Text fontWeight='black' fontSize='96px' position='relative' top='-24px'>2023</Text>
        </Box>

        {
          !showForm ?
          <Box>
            <Button onClick={_ => setShowForm(true)} fontFamily={'Inter, sans-serif'} fontWeight='medium' bgColor='hsl(214 82% 50%)' borderRadius='4px' color='whiteAlpha.900' px='32px' py='18px' _hover={{ bg: 'hsl(214 82% 48%)' }}>Show your contribution</Button>
          </Box>
          :
          <form>
            <Select onChange={e => setSelectOrg(e.target.value)} fontSize='16px' fontWeight='medium' bgColor='whiteAlpha.900' borderRadius='4px' width='400px' color='blackAlpha.700' placeholder="Select an organisation" display='inline-block' mr='16px'>
              {Object.keys(listOfOrganiser).map(org => <option key={org}>{org}</option>)}
            </Select>
            <Button onClick={_ => console.log(`Selected ${selectOrg}`)} fontFamily={'Inter, sans-serif'} fontWeight='medium' bgColor='hsl(214 82% 50%)' borderRadius='4px' color='whiteAlpha.900' px='32px' py='18px' _hover={{ bg: 'hsl(214 82% 48%)' }}>Submit</Button>
          </form>
        }

        <Text fontFamily={'Inter, sans-serif'} fontWeight={'bold'} color='whiteAlpha.900' position='absolute' bottom='16px' right='16px' fontSize='12px'>Powered by ReClaim Protocol</Text>
      </Box>
    </>
    )
  }

  export default App
