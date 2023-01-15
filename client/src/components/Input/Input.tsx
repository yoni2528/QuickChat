import React, { useState } from "react";

const Input: React.FC<{
  placeholder: string;
  type: string;
  defaultValue?: string;
  onChangeAndValidate: (value: string) => boolean;
  invalidMessage?: string;
}> = ({ placeholder, type, onChangeAndValidate, invalidMessage, defaultValue }) => {
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeAndValidate(e.target.value);
    setIsValid(onChangeAndValidate(e.target.value));
    if (!onChangeAndValidate(e.target.value)) return;
  };

  return (
    <>
      <input
        className="py-2 px-2 border-b-2 border-[#ccc] bg-[transparent] focus:outline-0 text-sm w-full"
        placeholder={placeholder}
        type={type}
        onChange={handleInputChange}
        defaultValue={defaultValue}
      ></input>
      {isValid ? "" : <p className="text-xs text-[red]">{invalidMessage}</p>}
    </>
  );
};

export default Input;
