import { ReactNode } from "react";

const SuccessMessage = ({ children }: { children: ReactNode }) => {
  return <div className="bg-green p-4 rounded text-white">{children}</div>;
};

export default SuccessMessage;
