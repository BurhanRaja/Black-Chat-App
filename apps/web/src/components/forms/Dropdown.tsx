import React, { FunctionComponent, useState } from "react";
import { DropdownProps } from "../../types";

const Dropdown: FunctionComponent<DropdownProps> = ({
  color,
  name,
  mappedData,
}) => {
  const [openDrop, setOpenDrop] = useState(false);

  return (
    <>
      <div className="relative mb-0.5 px-1">
        <button
          className={`text-white w-[100%] ${color} focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-between`}
          type="button"
          onClick={() => setOpenDrop(!openDrop)}
        >
          <span>{name}</span>
          <svg
            className="w-2.5 h-2.5 ml-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        {openDrop && (
          <div
            id="dropdown"
            className="z-10 absolute top-10 bg-black divide-y divide-gray-100 rounded-lg shadow w-[95%] mr-3"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              {mappedData?.map((el) => {
                return (
                  <li>
                    <a
                      href={el?.link}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white mx-2 rounded-lg"
                    >
                      {el?.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Dropdown;
