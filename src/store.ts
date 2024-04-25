import { create } from "zustand";
import coal from "./assets/coal.png";
import iron from "./assets/iron.png";
import copper from "./assets/copper.jpeg";
import silver from "./assets/silver.jpeg";
import gold from "./assets/gold.jpeg";
import diamond from "./assets/diamond.jpeg";
import emerald from "./assets/emerald.jpeg";
import ruby from "./assets/ruby.jpeg";
import sapphire from "./assets/sapphire.jpeg";
import amethyst from "./assets/amethyst.jpeg";

export const resourceList = [
  "coal",
  "iron",
  "copper",
  "silver",
  "gold",
  "diamond",
  "emerald",
  "ruby",
  "sapphire",
  "amethyst",
] as const;
export type ResourceId = (typeof resourceList)[number];

export type ResourceType = {
  id: ResourceId;
  name: string;
  image: string;
  craftResource: readonly {
    id: ResourceType["id"];
    image: string;
    count: number;
  }[];
};

export type MineType = {
  id: ResourceId;
  resource: ResourceType;
  updatePrice: number[];
  sellPrice: number;
  unlockPrice: number;
  store: number;
  maxStore: number;
  levelStore: number;
};

export const resources: readonly ResourceType[] = [
  { id: "coal", name: "Coal", image: coal, craftResource: [] },
  {
    id: "iron",
    name: "Iron",
    image: iron,
    craftResource: [{ id: "coal", image: coal, count: 10 }],
  },
  {
    id: "copper",
    name: "Copper",
    image: copper,
    craftResource: [{ id: "iron", image: iron, count: 1 }],
  },
  {
    id: "silver",
    name: "Silver",
    image: silver,
    craftResource: [{ id: "gold", image: gold, count: 1 }],
  },
  {
    id: "gold",
    name: "Gold",
    image: gold,
    craftResource: [{ id: "ruby", image: ruby, count: 1 }],
  },
  { id: "diamond", name: "Diamond", image: diamond, craftResource: [] },
  { id: "emerald", name: "Emerald", image: emerald, craftResource: [] },
  { id: "ruby", name: "Ruby", image: ruby, craftResource: [] },
  { id: "sapphire", name: "Sapphire", image: sapphire, craftResource: [] },
  { id: "amethyst", name: "Amethyst", image: amethyst, craftResource: [] },
] as const;

export const availableMines: MineType[] = resources.map((resource, index) => ({
  id: resource.id,
  resource: resource,
  craftResource: [],
  updatePrice: Array.from(
    { length: 10 },
    (_, i) => Math.pow(2, i) * (index + 1)
  ),
  sellPrice: index + 1,
  unlockPrice: index * 10,
  store: 0,
  maxStore: 10,
  levelStore: 0,
}));

export type UserStoreType = {
  coin: number;
  mines: Partial<Record<ResourceId, MineType>>;
  toMine: (mine: MineType) => void;
  sellStore: (mine: MineType) => void;
  buyMine: (mine: MineType) => void;
  updateMine: (mine: MineType) => void;
};

export const userStore = create<UserStoreType>((set) => ({
  coin: 0,
  mines: {
    coal: availableMines[0],
  },
  toMine: (mine: MineType) => {
    set((state) => ({
      mines: {
        ...state.mines,
        ...mine.resource.craftResource.reduce((acc, { id, count }) => {
          const mine = state.mines[id];

          if (mine === undefined) {
            return acc;
          }

          acc[id] = {
            ...state.mines[id]!,
            store: mine.store - count,
          };
          return acc;
        }, {} as UserStoreType["mines"]),
        [mine.id]: { ...mine, store: mine.store + 1 },
      },
    }));
  },
  sellStore: (mine: MineType) =>
    set((state) => ({
      coin: state.coin + mine.store * mine.sellPrice,
      mines: { ...state.mines, [mine.id]: { ...mine, store: 0 } },
    })),
  buyMine: (mine: MineType) =>
    set((state) => ({
      coin: state.coin - mine.unlockPrice,
      mines: { ...state.mines, [mine.id]: mine },
    })),
  updateMine: (mine: MineType) =>
    set((state) => ({
      coin: state.coin - mine.updatePrice[mine.levelStore],
      mines: {
        ...state.mines,
        [mine.id]: {
          ...mine,
          maxStore: mine.maxStore + 10,
          levelStore: mine.levelStore + 1,
        },
      },
    })),
}));
