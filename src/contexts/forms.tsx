import { createContext, Dispatch, SetStateAction, useState } from "react";

export type Errors = {
  title: string;
  errors: { [key: string]: string[] };
};

const FormsContext = createContext<{
  errors: Errors | null;
  reset: () => void;
  setErrors: Dispatch<SetStateAction<Errors | null>>;
} | null>(null);

const FormsProvider = ({ children }: { children: JSX.Element }) => {
  const [errors, setErrors] = useState<Errors | null>(null);

  const reset = () => {
    setErrors(null);
  };

  return (
    <FormsContext.Provider value={{ errors, reset, setErrors }}>
      {children}
    </FormsContext.Provider>
  );
};

export { FormsContext, FormsProvider };
