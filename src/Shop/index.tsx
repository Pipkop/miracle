import { Button } from "konsta/react";
import { Body, Header, BackButton } from "../Components";
import shopSrc from "../assets/shop.png";
import { availableMines, userStore } from "../store";

export const Shop = () => {
  const buyMine = userStore((state) => state.buyMine);
  const mines = userStore((state) => state.mines);
  const coin = userStore((state) => state.coin);

  return (
    <>
      <Header avatarSrc={shopSrc} title="Store" />
      <BackButton />
      <Body>
        {availableMines
          .filter(({ resource: { id } }) => !mines[id])
          .map((mine) => {
            const disabled = !!mines[mine.id] || coin < mine.unlockPrice;

            return (
              <div
                key={mine.resource.id}
                className="flex w-full items-center text-white p-4 gap-x-4 jusitfy-between"
              >
                <img
                  className="h-12 w-12 rounded-full"
                  src={mine.resource.image}
                />
                <span className="flex-1">{mine.resource.name}</span>
                <Button
                  className="w-1/3"
                  colors={{
                    disabledBg: "bg-gray-900",
                    disabledText: "text-gray-500",
                  }}
                  disabled={disabled}
                  onClick={() => {
                    buyMine(mine);
                  }}
                >
                  Buy {mine.unlockPrice}$
                </Button>
              </div>
            );
          })}
      </Body>
    </>
  );
};
