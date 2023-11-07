"use client";

import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  labelTextColor?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, labelTextColor, ...props }, ref) => {
    return (
      <div className={`flex flex-col mx-auto`}>
        <label
          className={`text-[15px] font-medium leading-[35px] ${
            labelTextColor ? labelTextColor : "text-white"
          }`}
        >
          {label}
        </label>
        <textarea ref={ref} {...props} />
      </div>
    );
  }
);

export default Textarea;
