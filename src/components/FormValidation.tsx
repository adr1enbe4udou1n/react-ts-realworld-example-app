import { FormEvent, useState } from "react";
import AlertMessage from "./AlertMessage";

export type Errors = {
  title: string;
  errors: { [key: string]: string[] };
};

const FormValidation = ({
  children,
  action,
  className,
}: {
  children: JSX.Element[];
  action: () => Promise<Errors | null>;
  className?: string;
}) => {
  const [errors, setErrors] = useState<Errors | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errorResponse = await action();

    if (errorResponse) {
      setErrors(errorResponse);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <AlertMessage errors={errors} onClose={() => setErrors(null)} />
      {...children}
    </form>
  );
};

export default FormValidation;
