import React from 'react'
import SearchInput from './SearchInput'
import Conversation from './Conversation'
import Logout_Btn from './Logout_Btn'

function Sidebar() {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
        <SearchInput />
        <div className='divider px-3'></div>
        <Conversation />
        <Logout_Btn />
    </div>
  )
}

export default Sidebar