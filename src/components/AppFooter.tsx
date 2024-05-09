import { Link } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";

const AppFooter = () => {
  const [isDarkMode, setColorScheme] =
    useLocalStorageState<boolean>("color-scheme-dark");

  return (
    <footer className="bg-gray-100 dark:bg-gray-800">
      <div className="container py-4 flex items-center gap-4">
        <Link to={"/"} className="font-brand text-green font-bold">
          conduit
        </Link>
        <div className="ml-auto flex flex-row items-center">
          <p className="text-gray-300 text-sm font-sans text-right hidden lg:block">
            An interactive learing project from
            <a href="https://thinkster.io/" className="text-green">
              Thinkster
            </a>
            . Code & design licensed under MIT.
          </p>
          <button
            title="Toggle dark mode"
            type="button"
            className="flex items-center justify-center ml-4 dark:text-white"
            onClick={() => {
              setColorScheme(!isDarkMode);
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
