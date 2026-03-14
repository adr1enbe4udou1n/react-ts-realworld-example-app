import { type HandleValidation, type ValidationProblemDetails } from "@/api";
import { type SubmitEvent, type JSX, useState } from "react";
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

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
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
