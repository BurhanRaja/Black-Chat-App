"use client";

interface InputProps {
  value: string;
  setVal: (val: string) => void;
  name: string;
  type: "email" | "password" | "text";
  label: string;
  labelTextColor?: string;
  inputTextColor?: string;
  inputBackgroundColor?: string;
  width?: string;
}

const Input = ({
  value,
  setVal,
  name,
  type,
  label,
  labelTextColor,
  inputTextColor,
  inputBackgroundColor,
  width,
}: InputProps) => {
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
          type={type}
          name={name}
          className={`p-2.5 w-[100%] rounded-md ${
            inputBackgroundColor ? inputBackgroundColor : "bg-[rgb(43,43,47)]"
          } outline-none ${
            inputTextColor ? inputTextColor : "text-zinc-300"
          } channel-search text-sm`}
          value={value}
          onChange={(e) => setVal(e.target.value)}
        />
      </div>
    </>
  );
};

export default Input;
