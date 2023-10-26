"use client";

interface OptionArray {
  value: string;
  name: string;
  key: string;
}

interface SelectProps {
  label: string;
  name: string;
  labelTextColor?: string;
  value: string;
  setValue: (val: string) => void;
  selectBackgroundColor?: string;
  selectTextColor?: string;
  options: Array<OptionArray>;
}

const Select = ({
  label,
  labelTextColor,
  value,
  setValue,
  selectBackgroundColor,
  selectTextColor,
  options,
  name,
}: SelectProps) => {
  return (
    <>
      <div>
        <label
          className={`text-[15px] font-medium leading-[35px] ${
            labelTextColor ? labelTextColor : "text-white"
          }`}
        >
          {label}
        </label>
        <select
          className={`p-2.5 w-[100%] rounded-md ${
            selectBackgroundColor ? selectBackgroundColor : "bg-[rgb(43,43,47)]"
          } outline-none ${
            selectTextColor ? selectTextColor : "text-zinc-300"
          } channel-search`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          name={name}
        >
          {options.map((el) => {
            return (
              <option key={el.key} className="p-2 my-2" value={el.value}>
                {el.name}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};

export default Select;
