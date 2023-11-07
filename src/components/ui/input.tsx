"use client";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelTextColor?: string;
  inputTextColor?: string;
  inputBackgroundColor?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      labelTextColor,
      inputTextColor,
      inputBackgroundColor,
      type,
      ...props
    },
    ref
  ) => {
    return (
      <>
        <div className={`flex flex-col mx-auto`}>
          <label
            className={`text-[15px] font-medium leading-[35px] ${
              labelTextColor ? labelTextColor : "text-white"
            }`}
          >
            {label}
          </label>
          <input
            ref={ref}
            type={type}
            className={`p-2.5 w-[100%] rounded-md ${
              inputBackgroundColor ? inputBackgroundColor : "bg-[rgb(43,43,47)]"
            } outline-none ${
              inputTextColor ? inputTextColor : "text-zinc-300"
            } channel-search text-sm`}
            {...props}
          />
        </div>
      </>
    );
  }
);

export default Input;