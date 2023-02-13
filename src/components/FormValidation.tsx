import { ValidationProblemDetails } from "@/api";
import { FormEvent, useState } from "react";
import AlertMessage from "./AlertMessage";

const FormValidation = ({
  children,
  action,
  className,
}: {
  children: JSX.Element[];
  action: () => Promise<ValidationProblemDetails | undefined>;
  className?: string;
}) => {
  const [errors, setErrors] = useState<ValidationProblemDetails | null>(null);

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
