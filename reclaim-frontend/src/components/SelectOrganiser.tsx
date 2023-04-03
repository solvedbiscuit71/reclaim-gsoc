import { Button, Select } from "@chakra-ui/react"

interface Props {
    listOfOrganiser: {};
    organiser: string;
    setOrganiser: (arg0: string) => void;
    handleSubmit: () => void;
}

function Form(props: Props) {
    return (
        <form>
        <Select onChange={e => props.setOrganiser(e.target.value)} fontSize='16px' fontWeight='medium' bgColor='whiteAlpha.900' borderRadius='4px' width='400px' color='blackAlpha.700' placeholder="Select an organisation" display='inline-block' mr='16px'>
            {Object.keys(props.listOfOrganiser).map(org => <option key={org}>{org}</option>)}
        </Select>
        <Button onClick={props.handleSubmit} fontFamily={'Inter, sans-serif'} fontWeight='medium' bgColor='hsl(214 82% 50%)' borderRadius='4px' color='whiteAlpha.900' px='32px' py='18px' _hover={{ bg: 'hsl(214 82% 48%)' }}>Submit</Button>
        </form>
)
}

export default Form