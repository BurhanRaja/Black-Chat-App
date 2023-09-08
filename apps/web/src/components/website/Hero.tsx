import React, { FunctionComponent } from "react";

const Hero: FunctionComponent = () => {
  return (
    <>
      <section className='text-gray-600 body-font bg-gray-950'>
        <div className='container mx-auto flex px-5 py-24 items-center justify-center flex-col'>
          <div className='text-center lg:w-2/3 w-full'>
            <h1 className='title-font sm:text-8xl mb-0 text-5xl font-poppins font-bold text-gray-100'>
              Connect{" "}
            </h1>
            <h1 className='title-font sm:text-8xl text-5xl mb-4 font-poppins font-bold text-gray-100'>
              with your team
            </h1>
            <p className='my-8 mb-20 leading-relaxed text-gray-400 text-lg font-poppins w-[55%] mx-auto'>
              Black chat is a messaging app for team that will help you connect
              with everyone in an easy and comfortable way
            </p>
            <div className='flex justify-center'>
              <button className='inline-flex text-white drop-shadow-[0_-1px_51px_rgb(0,112,255,0.6)] bg-blue-700 border-0 py-5 px-10 focus:outline-none hover:bg-indigo-600 rounded-3xl text-xl hero-download-btn'>
                Download for Windows
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
