import { Toolbar } from "konsta/react";
import { Link } from "react-router-dom";
import mineIcon from "../assets/mining.png";
import storeIcon from "../assets/shop.png";
import analiticsIcon from "../assets/analitics.png";

export const Navbar = () => (
  <Toolbar top={false} className="bg-gray-800 p-3">
    {[
      { to: "/store", src: storeIcon, children: "Store" },
      { to: "/", src: mineIcon, children: "Mines" },
      { to: "/analitics", src: analiticsIcon, children: "Analitics" },
    ].map(({ to, src, children }) => (
      <Link to={to}>
        <div className="flex flex-col items-center">
          <img className="w-6 h-6" src={src} />
          <span>{children}</span>
        </div>
      </Link>
    ))}
  </Toolbar>
);
