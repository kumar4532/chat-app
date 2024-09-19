import React, {useState} from 'react'
import SearchInput from './SearchInput'
import Conversation from './Conversation'
import Logout_Btn from './Logout_Btn'

function Sidebar() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className='lg:w-min border-r border-slate-500 p-4 flex flex-col'>
        <SearchInput setSelectedUser={setSelectedUser} />
        <div className='divider px-3'></div>
        <Conversation selectedUser={selectedUser} />
        <Logout_Btn />
    </div>
  )
}

export default Sidebar