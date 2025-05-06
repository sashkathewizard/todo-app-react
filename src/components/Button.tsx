import React from "react";

interface ButtonProps {
  text: string;
  className?: string;
  type?: "button" | "submit" | "reset";

  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ text, className, type, onClick }) => {
  return (
    <button className={className} type={type} onClick={onClick}>
      {text}
    </button>
  );
};
