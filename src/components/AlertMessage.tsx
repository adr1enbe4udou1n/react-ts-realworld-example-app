import { FormsContext } from "@/contexts/forms";
import { useContext } from "react";

const AlertMessage = () => {
  const formsStore = useContext(FormsContext);

  if (formsStore?.errors) {
    return (
      <div className="bg-red p-4 rounded text-white relative">
        <button
          type="button"
          className="absolute right-4 top-4"
          onClick={() => formsStore.reset()}
        >
          <i className="i-carbon-close block" />
        </button>

        <p className="font-bold">{formsStore.errors.title}</p>
        <ul>
          {Object.keys(formsStore.errors.errors).map((name) => (
            <li key={name}>
              <strong>{name} :</strong>
              <ul className="list-inside list-disc">
                {formsStore.errors?.errors[name].map((error) => (
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
