import React, { FunctionComponent } from "react";
import { BsChatLeftTextFill } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";
import { RiCompassDiscoverFill } from "react-icons/ri";

const Section3: FunctionComponent = () => {
  let data: Array<any> = [
    {
      image: (
        <>
          <BsChatLeftTextFill className='text-green-600 text-lg' />
        </>
      ),
      name: "Easy Communication",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam reiciendis alias molestias, nulla, velit sint, tempora perspiciatis architecto explicabo.",
      color: "bg-green-200",
    },
    {
      image: (
        <>
          <HiUserGroup className='text-yellow-600 text-lg' />
        </>
      ),
      name: "Community Support",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam reiciendis alias molestias, nulla, velit sint, tempora perspiciatis architecto explicabo.",
      color: "bg-yellow-200",
    },
    {
      image: (
        <>
          {" "}
          <RiCompassDiscoverFill className='text-blue-600 text-lg' />
        </>
      ),
      name: "Discover Channel",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam reiciendis alias molestias, nulla, velit sint, tempora perspiciatis architecto explicabo.",
      color: "bg-blue-200",
    },
  ];

  return (
    <section className='py-40'>
      <h1 className='text-6xl w-[45%] font-bold text-gray-800 mx-auto text-center'>
        Some of our features will help you
      </h1>
      <div className='w-[85%] flex justify-between mx-auto mt-5'>
        {data?.map((el) => {
          return (
            <div className='pt-5 w-[30%]'>
              <p className={`p-1.5 ${el.color} rounded-lg w-[2rem] mt-3`}>
                {el.image}
              </p>
              <h4 className='text-xl font-medium text-gray-600 mt-3'>
                {el.name}
              </h4>
              <p className='text-gray-500 mt-3'>{el.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Section3;
