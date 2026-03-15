import { Link } from "@tanstack/react-router";

const ArticlesNav = ({
  items,
}: {
  items: { link: string; name: string }[];
}) => {
  return (
    <nav className="flex text-gray-200">
      {items.map((link, i) => (
        <Link
          key={i}
          to={link.link as never}
          className="px-4 py-2 -mb-[1px]"
          activeProps={{
            className: "text-green-500 border-b-2 border-green-500",
          }}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

export default ArticlesNav;
