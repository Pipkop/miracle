import { create } from "zustand";
import config from "./config.json";

export const resourceList = config.map(({ id }) => id);

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
  fabric: number;
  maxFabric: number;
  levelFabric: number;
};

export const availableMines = config;

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
  mines: {},
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
