import React from "react";
import { InpType } from "../../types";

interface SelectType extends InpType {
  mappedData: any;
}

const Select = ({
  label,
  name,
  value,
  setValue,
  bgColor = "gray",
  textColor = "text-gray-900",
  mappedData,
}: SelectType) => {
  const cssInputColor = `bg-${bgColor}-50 border border-gray-300 ${textColor} sm:text-sm rounded-lg focus:outline-gray-400 block w-full p-2.5`;

  return (
    <>
      <label
        htmlFor={name}
        className={`block mb-2 text-sm font-medium ${textColor}`}
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(val) => setValue(val)}
        className={cssInputColor}
      >
        {mappedData}
      </select>
    </>
  );
};

export default Select;