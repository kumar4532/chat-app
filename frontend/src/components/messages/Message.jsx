import React from 'react'

function Message() {
  return (
    <div className='chat chat-end'>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img src="/bg.jpg" alt="tailwind css chat bubb;e component" />
        </div>
      </div>
      <div className='chat-bubble text-white bg-blue-500'>
        Yo!!! What the fuck.....
      </div>
      <div className='chat-footer opacity-60 text-red-100 text-xs flex gap-1 items-center'>
        12:42
      </div>
    </div>
  )
}

export default Message