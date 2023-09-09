import React from 'react'
import ChatInput from './ChatInput'
import ChatList from './ChatList'
import Header from '../Header'

const ChatContent = () => {
  return (
    <>
        <div className='w-[80%] bg-gray-950 flex flex-col'>
            {/* <div className='h-[40rem] w-[95%] mx-auto text-white'>hello</div> */}
            <Header />
            <ChatList />
            <ChatInput />
        </div> 
    </>
  )
}

export default ChatContent
