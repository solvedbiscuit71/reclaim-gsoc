import { Box, Button, Text } from "@chakra-ui/react"
import { CheckCircleIcon } from "@chakra-ui/icons"
import { useEffect, useState } from "react"

import Form from "./components/Form"
import Hero from "./components/Hero"
import Loading from "./components/Loading"

const BACKEND_URL = 'http://localhost:3000'

function App() {
  const [FormVisible, setFormVisible] = useState(false)
  const [currentOrg, setCurrentOrg] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [organisers, setOrganisers] = useState([])
  const [url, setUrl] = useState("")
  const [callbackId, setCallbackId] = useState("")

  /* Helper functions */
  const handleClick = () => {
    if (organisers.length == 0) {
      return
    }

    setFormVisible(true)
  }

  const handleSubmit = async () => {
    if (!currentOrg) {
      return
    }

    const res = await fetch(BACKEND_URL + '/verify', {
      method: 'POST',
      body: JSON.stringify({repo: getRepository()})
    })
    const jsonData = await res.json()
    console.log(jsonData)

    setUrl(jsonData.url)
    setCallbackId(jsonData.callbackId)
    setIsSubmitted(true)
  }

  const getRepository = () => {
    const currentOrgTuple = organisers.filter(organiser => organiser[0] == currentOrg)[0]
    return currentOrgTuple[1]
  }

  /* TODO: get status from backend using setInterval() */
  useEffect(() => {
    if (isSubmitted) {
      setTimeout(() => {
        setIsVerified(true)
      }, 5000)
    }
  }, [isSubmitted])

  useEffect(() => {
    (async () => {
      const res = await fetch(BACKEND_URL + '/organisers')
      const jsonData = await res.json()

      setOrganisers(jsonData.organisers)
    })();

    return () => {}
  }, [])

  return (
    <>
      <Box position='relative' w='100vw' h='100vh' pl='52px' pt='52px' fontFamily={'Inter, sans-serif'}>
        <Hero/>

        {
          !isSubmitted ?
          !FormVisible ?
          <Button onClick={handleClick}  fontWeight='medium' bgColor='hsl(214 82% 50%)' borderRadius='4px' color='whiteAlpha.900' px='32px' py='18px' _hover={{ bg: 'hsl(214 82% 48%)' }}>Show your contribution</Button>
          :
          <Form 
            listOfOrganiser={organisers}
            organiser={currentOrg} 
            setOrganiser={setCurrentOrg}
            handleSubmit={handleSubmit}
          />
          :
          !isVerified ?
          <Loading url={url}/>
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
