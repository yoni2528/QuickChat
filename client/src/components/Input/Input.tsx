import React from "react";

const Input: React.FC<{
  placeholder: string;
  type: string;
  onChange: (value: string) => void;
  onValidate: (value: string) => boolean;
}> = ({ placeholder, type, onChange, onValidate }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onValidate(e.target.value)) return;
    onChange(e.target.value);
  };

  return (
    <input
      className="py-2 px-2 border-b-2 border-[#eee] focus:outline-0 text-sm"
      placeholder={placeholder}
      type={type}
      onChange={handleInputChange}
    ></input>
  );
};

export default Input;
