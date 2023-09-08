import Link from "next/link";
import React, { FunctionComponent } from "react";

const Header: FunctionComponent = () => {
  return (
    <>
      <header className='text-gray-600 body-font px-20 bg-gray-950'>
        <div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
          <a className='flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              className='w-10 h-10 text-white p-2 bg-indigo-500 rounded-full'
              viewBox='0 0 24 24'
            >
              <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'></path>
            </svg>
            <span className='ml-3 text-xl text-white'>BlackChat</span>
          </a>
          <nav className='md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center'></nav>
          <Link href='/signup'>
            <button
              type='button'
              className='text-gray-400 bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-3xl px-5 py-3 mr-2 mb-2 hover:bg-gray-100 hover:text-gray-900 border border-gray-500'
            >
              Create Account
            </button>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
