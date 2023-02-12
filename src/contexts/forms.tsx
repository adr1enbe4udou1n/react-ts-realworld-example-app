import { createContext, useState } from "react";
import { ApiResponse, OpArgType, TypedFetch } from "openapi-typescript-fetch";

export type Errors = {
  title: string;
  errors: { [key: string]: string[] };
};

export class ApiValidationException extends Error {
  constructor(public errors: Errors) {
    super("Validation error");
  }
}

const FormsContext = createContext<{
  errors: Errors | null;
  reset: () => void;
  handleValidation: <T>(
    operation: TypedFetch<T>,
    arg: OpArgType<T>
  ) => Promise<ApiResponse | undefined>;
} | null>(null);

const FormsProvider = ({ children }: { children: JSX.Element }) => {
  const [errors, setErrors] = useState<Errors | null>(null);

  const reset = () => {
    setErrors(null);
  };

  const handleValidation = async <T,>(
    operation: TypedFetch<T>,
    arg: OpArgType<T>
  ) => {
    try {
      return await operation(arg);
    } catch (e) {
      if (e instanceof operation.Error) {
        const error = e.getActualType();
        if (error.status === 400) {
          setErrors(error.data);
        }
      }
    }
  };

  return (
    <FormsContext.Provider value={{ errors, reset, handleValidation }}>
      {children}
    </FormsContext.Provider>
  );
};

export { FormsContext, FormsProvider };
