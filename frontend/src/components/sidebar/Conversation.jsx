import React from 'react'
import SeperateConversations from './SeperateConversations'
import useGetCoversations from '../../hooks/useGetCoversation'

function Conversation() {
  const {loading, conversations} = useGetCoversations(); 
  return (
    <div className='py-2 flex flex-col overflow-auto'>
        {
          conversations.map((convo, idx) => (
            <SeperateConversations 
              key={convo._id}
              conversation={convo}
              lastIdx={idx === conversations.length - 1}
            />
          ))
        }
        {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
    </div>
  )
}

export default Conversation;