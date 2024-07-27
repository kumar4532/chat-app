import React from 'react'
import SeperateConversations from './SeperateConversations'

function Conversation() {
  return (
    <div className='py-2 flex flex-col overflow-auto'>
        <SeperateConversations />
        <SeperateConversations />
        <SeperateConversations />
        <SeperateConversations />
        <SeperateConversations />
    </div>
  )
}

export default Conversation