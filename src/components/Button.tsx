import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonProps = {
  variant?: "outline" | "filled";
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = ({
  variant = "filled",
  children,
  className,
  ...rest
}: ButtonProps) => {
  const buttonVariantClasses = {
    outline: "outline px-5 py-2 rounded-md gap-2 hover:shadow-lg",
    filled: "bg-gray-800 px-5 py-2 rounded-md text-white hover:bg-slate-700",
  };

  return (
    <button
      className={`${buttonVariantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
