import React from 'react'
import SeperateConversations from './SeperateConversations'
import useGetAllConversationsOfUser from '../../hooks/useGetAllConversationsOfUser';
import { useAuthContext } from '../../context/AuthContext';

function Conversation({ selectedUser }) {
  const {authUser} = useAuthContext();
  const {loading, currentConversations} = useGetAllConversationsOfUser();

  const users = currentConversations.map(conversation => 
    conversation.participents.find(user => user._id !== authUser._id)
  );

  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {selectedUser && !users.some(user => user._id === selectedUser._id) && (
        <SeperateConversations
          key={selectedUser._id}
          conversation={selectedUser}
          lastIdx={false}
        />
      )}
      {users.map((user, idx) => (
        <SeperateConversations
          key={user._id}
          conversation={user}
          lastIdx={idx === users.length - 1}
        />
      ))}
      {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
    </div>
  )
}

export default Conversation;