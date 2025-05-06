import React from "react";

interface InputProps {
  type: string;
  placeholder: string;
  className?: string;
  inputValue: string;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({ type, placeholder, className, name, inputValue, onChange }) => {
  return <input type={type} name={name} placeholder={placeholder} className={className} value={inputValue} onChange={onChange} />;
};
