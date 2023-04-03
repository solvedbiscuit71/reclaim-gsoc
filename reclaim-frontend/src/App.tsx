import { Box, Button, Text } from "@chakra-ui/react"
import { useState } from "react"

import SelectOrganiser from "./components/Form"
import Hero from "./components/Hero"

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
  const [selectOrganiser, setSelectOrganiser] = useState("")

  return (
    <>
      <Box position='relative' width='100vw' height='100vh' pl='72px' pt='72px'>
        <Hero/>

        {
          !showForm ?
          <Button onClick={_ => setShowForm(true)} fontFamily={'Inter, sans-serif'} fontWeight='medium' bgColor='hsl(214 82% 50%)' borderRadius='4px' color='whiteAlpha.900' px='32px' py='18px' _hover={{ bg: 'hsl(214 82% 48%)' }}>Show your contribution</Button>
          :
          <SelectOrganiser listOfOrganiser={listOfOrganiser} organiser={selectOrganiser} setOrganiser={setSelectOrganiser} />
        }

        <Text fontFamily={'Inter, sans-serif'} fontWeight={'bold'} color='whiteAlpha.900' position='absolute' bottom='16px' right='16px' fontSize='12px'>Powered by ReClaim Protocol</Text>
      </Box>
    </>
  )
}

export default App
