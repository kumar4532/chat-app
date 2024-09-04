import React, { useEffect } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import {TiMessage} from 'react-icons/ti'
import useConversation from "../../zustand/useConversation"
import {useAuthContext} from "../../context/AuthContext"

function MessageContainer() {
  const {authUser} = useAuthContext();
  const { selectedConversation, setSelectedConversation } = useConversation()

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation])
  
  return (
    <div className='w-screen flex flex-col'>
        {
          !selectedConversation ? <NoChatSelected user={authUser} /> : (
            <>
            <div className='bg-slate-200 px-4 py-2 mb-2'>
              <span className='font-semibold text-slate-900 text-base'>To: {selectedConversation.fullname}</span>
            </div>
            <Messages />
            <MessageInput />
            </>
          )
        }
    </div>
  )
}

export default MessageContainer;

const NoChatSelected = ({user}) => {
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
        <p>Welcome 👋 {user.user.fullname} </p>
        <p>Select a chat to start messaging</p>
        <TiMessage className='text-3xl md:text-6xl text-center' />
      </div>
    </div>
  )
}