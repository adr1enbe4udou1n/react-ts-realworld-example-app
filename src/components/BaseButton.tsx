import classNames from "classnames";
import { Link } from "react-router-dom";

const BaseButton = ({
  to,
  size = "md",
  variant = "primary",
  type = "submit",
  children,
  onClick,
  className,
  ...rest
}: {
  to?: string;
  size?: "sm" | "md";
  variant?: "primary" | "secondary";
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  children: React.ReactNode;
  className?: string | undefined;
  onClick?: () => void;
}) => {
  const classes = classNames(
    className,
    "rounded inline-flex items-center gap-1",
    {
      "py-1 px-2 text-sm": size === "sm",
      "p-4 text-xl": size === "md",
      "bg-green text-white": variant === "primary",
      "bg-gray-300 text-black": variant === "secondary",
    },
  );

  return to ? (
    <Link to={to} className={classes} {...rest}>
      {children}
    </Link>
  ) : (
    <button type={type} className={classes} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export default BaseButton;
