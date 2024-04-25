import { List } from "konsta/react";
import { Link } from "react-router-dom";
import { Body, Header } from "../Components";
import mineIcon from "../assets/mining.png";
import { userStore } from "../store";

export const Home = () => {
  const mines = userStore((state) => state.mines);

  return (
    <div className="flex flex-col h-full w-full text-gray-200">
      <Header avatarSrc={mineIcon} title="resources" />

      <Body>
        <List strong className="bg-tg-primary">
          {Object.keys(mines).map((mineName) => {
            const mine = mines[mineName as keyof typeof mines];

            if (mine === undefined) return null;

            return (
              <Link
                key={mine.id}
                className="flex w-100 items-center justify-between px-2"
                to={`/mine/${mine.id}`}
              >
                <div className="flex items-center">
                  <img className="h-10 w-10 m-2" src={mine.resource.image} />
                  <span flex-1>{mine.resource.name}</span>
                </div>
                <span>
                  {mine.store}/{mine.maxStore}
                </span>
              </Link>
            );
          })}
        </List>
      </Body>
    </div>
  );
};
