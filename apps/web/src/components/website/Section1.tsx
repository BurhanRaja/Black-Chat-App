import React from "react";
import Image from "next/image";

const Section1 = () => {
  return (
    <section>
      <div className="relative h-[30rem] bg-gray-950">
        <div className="absolute bottom-[-22rem] w-[100%]">
          <Image
            src={"/images/websitebanner-2.png"}
            alt="websitebanner"
            width={1100}
            height={1100}
            className="mx-auto shadow-xl shadow-gray-800 rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Section1;
