import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar';
import Login from "../login/Login"
import MessageContainer from '../../components/messages/MessageContainer';

function Home() {
  return (
    <div className='flex h-min lg:w-full rounded-lg overflow-hidden'>
      <Sidebar />
      <MessageContainer />
    </div>
  )
}

export default Home;