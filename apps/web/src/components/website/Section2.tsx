import React from "react";
import Image from "next/image";

const Section2 = () => {
  return (
    <section className='pt-96 mt-9'>
      <div className='w-[65%] mx-auto'>
        <p className='text-lg font-medium text-gray-700 text-center mb-4'>
          Supported and being used by large companies like
        </p>
        <div className='flex justify-between mt-5'>
          <Image
            src={"/images/logo-1.svg"}
            alt='logo-1'
            width={200}
            height={100}
          />
          <Image
            src={"/images/logo-2.svg"}
            alt='logo-2'
            width={200}
            height={100}
          />
          <Image
            src={"/images/logo-3.svg"}
            alt='logo-3'
            width={120}
            height={100}
          />
          <Image
            src={"/images/logo-4.svg"}
            alt='logo-4'
            width={110}
            height={100}
          />
        </div>
      </div>
    </section>
  );
};

export default Section2;
