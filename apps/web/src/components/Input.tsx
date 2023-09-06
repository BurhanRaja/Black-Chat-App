import React from "react";

type InputType = {
  type: string;
  label: string;
  name: string;
  value: string | number;
  color: string;
  textColor: string;
  setValue: Function;
};

const Input = ({
  type,
  label,
  name,
  value,
  setValue,
  color = "gray",
  textColor,
}: InputType) => {
  const cssInputColor = `bg-${color}-50 border border-${color}-300 ${textColor} sm:text-sm rounded-lg focus:ring-${color}-400 focus:outline-none focus:border-${color}-400 block w-full p-2.5`;

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
