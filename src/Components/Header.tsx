import { userStore } from "../store";

const Avatar = ({ imageSrc }: { imageSrc: string }) => (
  <img className="h-12 w-12" src={imageSrc} />
);

const Text = ({ title }: { title: string }) => (
  <span className="text-color-50 text-lg flex-1">{title}</span>
);

const CoinStatus = () => {
  const coin = userStore((state) => state.coin);

  return (
    <div className="flex">
      <div className="flex bg-blue-300 text-gray-800 items-center">
        <span className="p-2">$</span>
      </div>
      <div className="bg-gray-800 py-2 px-6">
        <span>{coin}</span>
      </div>
    </div>
  );
};

interface HeadersProps {
  avatarSrc: string;
  title: string;
}

export const Header = ({ avatarSrc, title }: HeadersProps) => {
  return (
    <div className="flex gap-x-4 items-center p-4 text-tg-subtitle-text bg-gray-700">
      <Avatar imageSrc={avatarSrc}></Avatar>
      <Text title={title}></Text>
      <CoinStatus />
    </div>
  );
};
