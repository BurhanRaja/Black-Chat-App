import React from "react";
import { InpType } from "../../types";


const Input = ({
  type,
  label,
  name,
  value,
  setValue,
  bgColor = "gray",
  textColor,
}: InpType) => {
  const cssInputColor = `bg-${bgColor}-50 border border-gray-300 ${textColor} sm:text-sm rounded-lg focus:outline-gray-400 block w-full p-2.5`;

  return (
    <>
      <label
        htmlFor={name}
        className={`block mb-2 text-sm font-medium ${textColor}`}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={cssInputColor}
      />
    </>
  );
};

export default Input;
