import React, { FunctionComponent } from "react";
import { InpType } from "../../types";

const Input: FunctionComponent<InpType> = ({
  type,
  label,
  name,
  value,
  setValue,
  bgColor = "gray",
  textColor,
  labelColor,
  placeHolder,
  border,
}) => {
  const cssInputColor = `${bgColor} border ${border} ${textColor} sm:text-sm rounded-lg focus:outline-none block w-full p-2.5`;

  return (
    <>
      <label
        htmlFor={name}
        className={`block mb-2 text-sm font-medium ${labelColor}`}
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
        placeholder={placeHolder}
      />
    </>
  );
};

export default Input;