import { HandleValidation, ValidationProblemDetails } from "@/api";
import { FormEvent, JSX, useState } from "react";
import AlertMessage from "./AlertMessage";

const FormValidation = ({
  children,
  action,
  className,
}: {
  children: JSX.Element[];
  action: (handleValidation: HandleValidation) => void;
  className?: string;
}) => {
  const [errors, setErrors] = useState<
    ValidationProblemDetails | undefined | null
  >(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    action((errors) => {
      setErrors(errors);
    });
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <AlertMessage errors={errors} onClose={() => setErrors(null)} />
      {...children}
    </form>
  );
};

export default FormValidation;
