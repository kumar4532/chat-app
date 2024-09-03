import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import useGetCoversations from '../../hooks/useGetCoversation';
import useConversation from "../../zustand/useConversation"
import toast from 'react-hot-toast';

function SearchInput() {
  const [search, setSearch] = useState()
  const {conversations} = useGetCoversations();
  const {setSelectedConversation} = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) {
      setSelectedConversation(null)
      return
    };

    const normalSearch = search.toLowerCase();
    const matchedConvo = conversations.find((convo) => {
      const fullname = convo.fullname.toLowerCase();
      return fullname.includes(normalSearch)
    })

    if (matchedConvo) {
      setSelectedConversation(matchedConvo);
      setSearch("");
    } else {
      toast.error("No such user found");
      setSearch("");
    }
  }
  
  return (
    <div>
        <form onSubmit={handleSubmit} className='flex items-center gap-2'>
            <input
            type="text" 
            placeholder='Search...' 
            className='input input-bordered rounded-full'
            value={search}
            onChange={(e) => setSearch(e.target.value)} />
            <button type='submit' className='btn btn-circle bg-gray-800 text-white'><CiSearch  className='w-7 h-7 outline-none' /></button>
        </form>
    </div>
  )
}

export default SearchInput