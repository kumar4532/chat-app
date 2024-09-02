import React, {useEffect} from 'react'
import useCoversation from '../../zustand/useConversation';

function SeperateConversations({conversation, lastIdx}) {
    const {selectedConversation, setSelectedConversation} = useCoversation()
    const isSelected = selectedConversation?._id === conversation._id;
 
  return (
    <>
    <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 cursor-pointer
        ${isSelected ? "bg-sky-400" : ""}`} 
        onClick={() => setSelectedConversation(conversation)}>
        <div className='avatar online'>
            <div className='w-12 rounded-full'>
                <img src={conversation.profilePic} alt="user avatar" />
            </div>
        </div>
        <div className='flex flex-col flex-1'>
            <div className='flex gap-3 justify-between'>
                <p className='font-bold text-gray-200'>{conversation.fullname}</p>
            </div>
        </div>
    </div>
    {!lastIdx ? <div className='divider my-0 py-0 h-1'></div> : null}
    </>
  )
}

export default SeperateConversations;