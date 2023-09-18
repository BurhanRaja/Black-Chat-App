import React, { FunctionComponent } from "react";
import { AiOutlineLoading } from "react-icons/ai";

const SpinLoading: FunctionComponent = () => {
  return (
    <>
      <AiOutlineLoading className='bg-blue-400 text-white animate-spin' />
    </>
  );
};

export default SpinLoading;
