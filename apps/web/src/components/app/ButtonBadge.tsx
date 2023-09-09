import React, { FunctionComponent } from "react";
import { ButtonBadgeProps } from "../../types";

const ButtonBadge: FunctionComponent<ButtonBadgeProps> = ({
  icon,
  bgColor,
}) => {
  return (
    <div>
      <button
        className={`transform p-6 transition-all mx-auto rounded-lg duration-300 ease-out cursor-pointer channel-icon ${bgColor}`}
      >
        {icon}
      </button>
    </div>
  );
};

export default ButtonBadge;
