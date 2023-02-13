import { ValidationProblemDetails } from "@/api";

const AlertMessage = ({
  errors,
  onClose,
}: {
  errors?: ValidationProblemDetails | null;
  onClose?: () => void;
}) => {
  if (errors) {
    return (
      <div className="bg-red p-4 rounded text-white relative">
        <button
          type="button"
          className="absolute right-4 top-4"
          onClick={onClose}
        >
          <i className="i-carbon-close block" />
        </button>

        <p className="font-bold">{errors.title}</p>
        <ul>
          {Object.keys(errors.errors).map((name) => (
            <li key={name}>
              <strong>{name} :</strong>
              <ul className="list-inside list-disc">
                {errors?.errors[name]?.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
};

export default AlertMessage;
