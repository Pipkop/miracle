import { useNavigate, useParams } from "react-router-dom"
import { Header } from "../Components/Header"
import { Block, Button, List, ListItem } from "konsta/react"
import { useEffect } from "react"
import { useBackButton } from "@tma.js/sdk-react"


const mineList = ['First', 'Second', 'Third']

const BackButton = () => {
    const backButton = useBackButton()
    const navigate = useNavigate()

    useEffect(() => {
        backButton.show()

        const handler = () => {
            backButton.off('click', handler)
            navigate(-1)
            backButton.hide()
        }

        backButton.on('click', handler)
    }, [backButton])

    return null
}

export const Mine = () => {
    const { mine } = useParams()

    if (!mine) {
        return <p>Not Found</p>
    }


    return (<div className='flex flex-col h-screen w-screen text-gray-200'>
        <Header />
        <BackButton />
        <Block className="flex h-full flex-col-reverse">
            <Button>Mine</Button>
            <List>
                {[mineList.map((mine) => <ListItem>{mine}</ListItem>)]}
            </List>
        </Block>
    </div>)

}