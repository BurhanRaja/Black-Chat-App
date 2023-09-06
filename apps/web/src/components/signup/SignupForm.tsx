import React from "react";
import SignupImage from "./SignupImage";

const SignupForm = () => {
  return (
    <div className='w-[48%] bg-white'>
      <div className='w-[90%] mx-auto bg-white rounded-lg shadow-lg shadow-gray-300'>
        <a
          href='#'
          className='flex items-center mb-1 p-5 pb-0 text-2xl font-semibold text-gray-900'
        >
          <img
            className='w-8 h-8 mr-2'
            src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg'
            alt='logo'
          />
          Flowbite
        </a>
        <div className='p-6 pt-2 space-y-4 md:space-y-6 sm:p-8'>
          <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl '>
            Create an account
          </h1>
          <form className='space-y-4 md:space-y-6' action='#'>
            <div className='grid grid-cols-2 grid-flow-col gap-4'>
              <div>
                <label
                  htmlFor='username'
                  className='block mb-2 text-sm font-medium text-gray-900 '
                >
                  Username
                </label>
                <input
                  type='text'
                  name='username'
                  id='username'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                />
              </div>
              <div>
                <label
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium text-gray-900 '
                >
                  Email
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                />
              </div>
            </div>
            <div className='grid grid-cols-2 grid-flow-col gap-4'>
              <div>
                <label
                  htmlFor='country'
                  className='block mb-2 text-sm font-medium text-gray-900 '
                >
                  Country
                </label>
                <input
                  type='text'
                  name='country'
                  id='country'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                />
              </div>
              <div>
                <label
                  htmlFor='phone'
                  className='block mb-2 text-sm font-medium text-gray-900 '
                >
                  Phone
                </label>
                <input
                  type='text'
                  name='phone'
                  id='phone'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                />
              </div>
            </div>
            <div className='grid grid-cols-2 grid-flow-col gap-4'>
              <div>
                <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium text-gray-900 '
                >
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                />
              </div>
              <div>
                <label
                  htmlFor='confirm-password'
                  className='block mb-2 text-sm font-medium text-gray-900 '
                >
                  Confirm Password
                </label>
                <input
                  type='password'
                  name='confirm-password'
                  id='confirm-password'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                />
              </div>
            </div>
            <div className='flex items-start'>
              <div className='flex items-center h-5'>
                <input
                  id='terms'
                  aria-describedby='terms'
                  type='checkbox'
                  className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300'
                />
              </div>
              <div className='ml-3 text-sm'>
                <label htmlFor='terms' className='font-light text-gray-500'>
                  I accept the{" "}
                  <a
                    className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                    href='#'
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>
            <button
              type='submit'
              className='w-full text-white bg-blue-600 hover:bg-slate-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
            >
              Create an account
            </button>
            <p className='text-sm font-light text-gray-500'>
              Already have an account?{" "}
              <a href='#' className='font-medium text-blue-600 hover:underline'>
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
