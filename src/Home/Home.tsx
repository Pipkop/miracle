import { PropsWithChildren } from 'react'
import { Block, List, ListButton } from 'konsta/react'
import { Link } from 'react-router-dom'
import { Header } from '../Components/Header'

const Body = ({ children }: PropsWithChildren) => {
    return <div className='h-full bg-gray-600 w-100'>{children}</div>
}

export const Home = () => {
    return <div className='flex flex-col h-screen w-screen text-gray-200'>
        <Header />
        <Body>
            <List strong outlineIos className='bg-tg-primary'>
                {['First', 'Second', 'Third'].map((mine) =>
                    <Link to={`/mine/${mine}`}>
                        <ListButton>{mine}</ListButton>
                    </Link>
                )}
            </List>
        </Body>
    </div>
}