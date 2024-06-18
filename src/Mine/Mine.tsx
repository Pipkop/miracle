import { Link, useParams } from "react-router-dom";
import { Button } from "konsta/react";
import clsx from "clsx";
import { Body, Header } from "../Components";
import { BackButton } from "../Components";
import barsIcon from "../assets/bars.png";
// import dwarfSrc from "../assets/dwarf.jpeg";
import { MineType, ResourceId, resourceList, userStore } from "../store"; // Assuming you have a 'types' file that defines the 'MineType' type

const isMineType = (str?: string): ResourceId | null =>
  resourceList.includes(str as ResourceId) ? (str as ResourceId) : null;

export const Mine = () => {
  const { mine } = useParams();
  const mines = userStore((state) => state.mines);
  const mineId = isMineType(mine);

  if (mineId === null) {
    return <p>Not Found</p>;
  }
  const mineInstance = mines[mineId];

  if (mineInstance === undefined) {
    return <p>Not Found</p>;
  }

  return <MineBase mine={mineInstance} />;
};

const MineBase = ({ mine }: { mine: MineType }) => {
  const coin = userStore((state) => state.coin);
  const mines = userStore((state) => state.mines);
  const toMine = userStore((state) => state.toMine);
  const sellStore = userStore((state) => state.sellStore);
  const updateMine = userStore((state) => state.updateMine);

  const disabledMine =
    mine.store >= mine.maxStore ||
    mine.resource.craftResource.some(
      ({ id, count }) => (mines[id]?.store ?? 0) < count
    );

  const disabledSell = mine.store <= 0;
  const disabledUpdate =
    mine.levelStore >= mine.updatePrice.length ||
    mine.updatePrice[mine.levelStore] > coin;

  return (
    <div className="flex flex-col h-full w-full text-gray-200">
      <Header avatarSrc={barsIcon} title={mine.resource.name} />
      <BackButton />
      <Body className="flex h-full flex-col px-1 py-3">
        <div className="flex-1">
          <div className="flex w-full items-center justify-between">
            <img className="w-12 h-12 rounded-full" src={mine.resource.image} />
            <span className="text-white text-4xl">{mine.store}</span>
            <div className="flex flex-col w-1/3 items-center">
              <Button
                disabled={disabledSell}
                onClick={() => {
                  sellStore(mine);
                }}
              >
                Sell all
              </Button>
              {/* TODO: move this calculation to a selector */}
              <span>${mine.store * mine.sellPrice}</span>
            </div>
          </div>

          <div className="flex w-full items-center justify-between">
            {/* <img className="w-12 h-12 rounded-full" src={dwarfSrc} /> */}
            <div className="flex flex-col">
              <span className="text-2xl text-white">Max:{mine.maxStore}</span>
              <span className="text-2xl text-gray-200">
                store: {mine.levelStore + 1} level
              </span>
            </div>
            <Button
              className="w-1/3"
              disabled={disabledUpdate}
              onClick={() => {
                updateMine(mine);
              }}
            >
              Update: ${mine.updatePrice[mine.levelStore]}
            </Button>
          </div>
        </div>

        <div className="flex justify-between px-4 py-2 items-center">
          {["order-3", "order-2", "order-4", "order-1", "order-5"].map(
            (order, index) => {
              const resource = mine.resource.craftResource[index];

              if (resource === undefined) {
                return (
                  <div
                    key={order}
                    className={clsx(
                      "w-12 h-12 rounded-full bg-gray-900",
                      order
                    )}
                  />
                );
              }

              const resourceMine = mines[resource.id];

              return (
                <div key={order} className={order}>
                  <Link
                    className="flex flex-col items-center"
                    to={resourceMine ? `/mine/${resourceMine.id}` : "."}
                  >
                    <span>{resourceMine ? resourceMine.store : "N/A"}</span>
                    <img
                      src={resource.image}
                      className="w-12 h-12 rounded-full border-2 border-gray-600"
                    />
                    <span>{resource.count}</span>
                  </Link>
                </div>
              );
            }
          )}
        </div>

        <Button
          disabled={disabledMine}
          onClick={() => {
            toMine(mine);
          }}
        >
          Mine
        </Button>
      </Body>
    </div>
  );
};
