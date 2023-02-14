import classNames from "classnames";
import { NavLink } from "react-router-dom";

const ArticlesNav = ({
  items,
}: {
  items: { link: string; name: string }[];
}) => {
  return (
    <nav className="flex text-gray-200">
      {items.map((link, i) => (
        <NavLink
          key={i}
          to={link.link}
          className={({ isActive }) =>
            classNames("px-4 py-2 -mb-[1px]", {
              "text-green-500 border-b-2 border-green-500": isActive,
            })
          }
        >
          {link.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default ArticlesNav;
