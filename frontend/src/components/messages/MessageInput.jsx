import React, { useState } from 'react'
import {BsSend} from 'react-icons/bs'
import useSendMessage from '../../hooks/useSendMessage'
import { MdEmojiEmotions } from "react-icons/md";
import { IoDocumentAttach } from "react-icons/io5";
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"

function MessageInput() {
  const {loading, sendMessage} = useSendMessage();
  const [message, setMessage] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);

  const handleShowEmoji = (e) => {
    e.preventDefault();
    setShowEmojis(!showEmojis)
  }

  const addEmoji = (e) => {
    const sym = e.unified.split("_");
    const emojiArray = sym.map(el => parseInt("0x" + el, 16));
    const emoji = String.fromCodePoint(...emojiArray);
    setMessage(prevMessage => prevMessage + emoji);
  }

  const handleSendMessage = async(e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage('');
  }
  
  return (
  <>
    <div>
      {showEmojis && <Picker data={data} emojiSize={20} emojiButtonSize={30} onEmojiSelect={addEmoji} />}
    </div>
    <form className='px-4 my-3 flex flex-row' onSubmit={handleSendMessage}>
        <div className='flex felx row text-xl'>
          <button className='mr-2'>
            <IoDocumentAttach />
          </button>
          <button className='mr-2' onClick={handleShowEmoji}>
            <MdEmojiEmotions />
          </button>
        </div>
        <div className='w-full relative'>
            <input type="text" 
            className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white' 
            placeholder='Send a message...' 
            value={message}
            onChange={(e) => setMessage(e.target.value)} />
            <button type='submit' disabled={!message.trim()} className='absolute inset-y-0 end-0 flex items-center pe-3'>
                {loading ? <span className='loading loading-spinner'></span> : <BsSend />}
            </button>
        </div>
    </form>
  </>
  )
}

export default MessageInput