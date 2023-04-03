import { Box, Button, CheckboxIcon, Text, list } from "@chakra-ui/react"
import { CheckCircleIcon } from "@chakra-ui/icons"
import { useEffect, useState } from "react"

import SelectOrganiser from "./components/SelectOrganiser"
import Hero from "./components/Hero"
import ShowLink from "./components/ShowLink"

const listOfOrganiser = [ 
  ["AsyncAPI",  "asyncapi/spec"],
  ["Conda", "conda/conda"],
  ["FluxCD", "fluxcd/flux2"],
  ["OQ Engine", "gem/oq-engine"],
  ["Matplotlib", "matplotlib/matplotlib"],
  ["MicroPython", "micropython/micropython"],
  ["Numpy", "numpy/numpy"],
  ["Wagtail", "wagtail/wagtail"],
  ["WasmEdge", "WasmEdge/WasmEdge"],
]

function App() {
  const [showForm, setShowForm] = useState(false)
  const [selectOrganiser, setSelectOrganiser] = useState("")
  const [organiserSelected, setOrganiserSelected] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  const handleSubmit = () => {
    if (selectOrganiser.length == 0) {
      return
    }

    setOrganiserSelected(true);
  }

  const getRepository = () => {
    const selected = listOfOrganiser.filter(org => org[0] == selectOrganiser)[0]
    return selected[1]
  }

  /* TODO: get status from backend using setInterval() */
  useEffect(() => {
    if (organiserSelected) {
      setTimeout(() => {
        setIsVerified(true)
      }, 5000)
    }
  }, [organiserSelected])

  return (
    <>
      <Box position='relative' w='100vw' h='100vh' pl='52px' pt='52px' fontFamily={'Inter, sans-serif'}>
        <Hero/>

        {
          !organiserSelected ?
          !showForm ?
          <Button onClick={_ => setShowForm(true)}  fontWeight='medium' bgColor='hsl(214 82% 50%)' borderRadius='4px' color='whiteAlpha.900' px='32px' py='18px' _hover={{ bg: 'hsl(214 82% 48%)' }}>Show your contribution</Button>
          :
          <SelectOrganiser 
            listOfOrganiser={listOfOrganiser}
            organiser={selectOrganiser} 
            setOrganiser={setSelectOrganiser}
            handleSubmit={handleSubmit}
          />
          :
          !isVerified ?
          <ShowLink url={`https://github.com/${getRepository()}`}/>
          :
          <Text fontSize={'36px'} fontWeight={'bold'} color={'whiteAlpha.900'} >
            <CheckCircleIcon w={'44px'} h={'44px'} color={'hsl(214 82% 48% )'} verticalAlign={'-8px'}  mr={'8px'} /> Verified
          </Text>
        }

        <Text fontWeight={'bold'} color='whiteAlpha.900' position='absolute' bottom='16px' right='16px' fontSize='12px'>Powered by ReClaim Protocol</Text>
      </Box>
    </>
  )
}

export default App
