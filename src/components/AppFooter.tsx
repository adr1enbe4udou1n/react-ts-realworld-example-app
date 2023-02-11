import { Link } from "react-router-dom";
import { useDarkMode } from "usehooks-ts";

const AppFooter = () => {
  const { isDarkMode, enable, disable } = useDarkMode();

  return (
    <footer className="bg-gray-100 dark:bg-gray-800">
      <div className="container py-4 flex items-center gap-4">
        <Link to={"/"} className="font-brand text-green font-bold">
          conduit
        </Link>
        <div className="ml-auto flex flex-row items-center">
          <p className="text-gray-300 text-sm font-sans text-right hidden lg:block">
            An interactive learing project from&nbsp;
            <a href="https://thinkster.io/" className="text-green">
              Thinkster
            </a>
            . Code & design licensed under MIT.
          </p>
          <button
            className="flex items-center justify-center ml-4 dark:text-white"
            onClick={() => {
              isDarkMode ? disable() : enable();
              document.documentElement.classList.toggle("dark", !isDarkMode);
            }}
          >
            <i className="inline-block dark:i-carbon-moon i-carbon-sun" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
