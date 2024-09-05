import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar';
import MessageContainer from '../../components/messages/MessageContainer';

function Home() {
  return (
    <div className='flex max-h-[80vh] lg:w-full rounded-lg overflow-hidden'>
      <Sidebar />
      <MessageContainer />
    </div>
  )
}

export default Home;