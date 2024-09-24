import React, {useState} from 'react'
import SearchInput from './SearchInput'
import Conversation from './Conversation'
import Logout_Btn from './Logout_Btn'
import { CgProfile } from "react-icons/cg"
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  return (
    <div className='lg:w-min border-r border-slate-500 p-4 flex flex-col'>
        <SearchInput setSelectedUser={setSelectedUser} />
        <div className='divider px-3'></div>
        <Conversation selectedUser={selectedUser} />
        <div className='flex flex-row justify-between mt-auto'>
          <Logout_Btn />
          <button 
          className='tooltip text-2xl hover:bg-white rounded-full' 
          data-tip="Profile" 
          onClick={() => navigate("/profile")}>
            <CgProfile />
          </button>
        </div>
    </div>
  )
}

export default Sidebar