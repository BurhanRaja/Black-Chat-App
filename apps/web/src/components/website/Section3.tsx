import React from "react";
import Image from "next/image";

const Section3 = () => {
  let data: Array<any> = [
    {
      image: "/images/message.png",
      name: "Easy Communication",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam reiciendis alias molestias, nulla, velit sint, tempora perspiciatis architecto explicabo.",
      color: "bg-green-200",
    },
    {
      image: "/images/community.png",
      name: "Community Support",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam reiciendis alias molestias, nulla, velit sint, tempora perspiciatis architecto explicabo.",
      color: "bg-yellow-200",
    },
    {
      image: "/images/discover.png",
      name: "Discover Channel",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam reiciendis alias molestias, nulla, velit sint, tempora perspiciatis architecto explicabo.",
      color: "bg-blue-200",
    },
  ];

  return (
    <section className='py-32'>
      <h1 className='text-6xl w-[45%] font-bold text-gray-800 mx-auto text-center'>
        Some of our features will help you
      </h1>
      <div className='w-[85%] flex justify-between mx-auto mt-5'>
        {data?.map((el) => {
          return (
            <div className='pt-5 w-[30%]'>
              <p className={`p-1.5 ${el.color} rounded-lg w-[2rem] mt-3`}>
                <Image
                  src={el.image}
                  alt={el.name}
                  width={50}
                  height={50}
                />
              </p>
              <h4 className="text-xl font-medium text-gray-600 mt-3">{el.name}</h4>
              <p className="text-gray-500 mt-3">
                {el.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Section3;
