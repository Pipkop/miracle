import { Block } from "konsta/react"

const Avatar = () =>
    <Block className="h-6 w-6">
        <img className="rounded-full" src="https://www.electronic-sirens.com/wp-content/uploads/2022/06/Risks-in-Mining.jpg" />
    </Block>

const Text = () =>
    <span className='text-color-50 text-lg'>Alexsey IxII</span>

export const Header = () => {
    return <div className='flex gap-x-4 items-center p-4 text-tg-subtitle-text bg-gray-700'>
        <Avatar></Avatar>
        <Text></Text>
    </div>
}