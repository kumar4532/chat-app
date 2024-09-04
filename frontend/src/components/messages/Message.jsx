import React from 'react'
import {useAuthContext} from "../../context/AuthContext"
import useConversation from '../../zustand/useConversation'

function Message({message}) {
  const {authUser} = useAuthContext();
  const {selectedConversation} = useConversation();
  const fromMe = authUser.user._id === message.senderId;
  const chatClass = fromMe ? "chat-end" : "chat-start";
  const bgClr = fromMe ? "bg-blue-500" : null;
  const profilePic = fromMe ? authUser.user.profilePic : selectedConversation?.profilePic;
  const shakeClass = message.shouldShake ? "shake" : "";

  const messageTime = new Date(message.createdAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  return (
    <div className={`chat ${chatClass} mb-1`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img src={profilePic} alt="tailwind css chat bubble component" />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bgClr} ${shakeClass} mb-1`}>
        {message.message}
      </div>
      <div className='chat-footer opacity-60 text-red-100 text-xs flex gap-1 items-center'>
        {messageTime}
      </div>
    </div>
  )
}

export default Message;