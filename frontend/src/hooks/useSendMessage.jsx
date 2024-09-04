import React, { useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from "react-hot-toast"

function useSendMessage() {
  const {messages, setMessages, selectedConversation} = useConversation()
  const [loading, setLoading] = useState(false)
  
  const sendMessage = async(message) => {
    setLoading(true)
    try {
        const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({message})
        })

        const data = await res.json();
        console.log(data.newMessage);
        if (data.error) {
            throw new error
        }
        setMessages([...messages, data.newMessage])
        setLoading(false)
    } catch (error) {
        toast.error(error.message)
    } finally {
        setLoading(false)
    }
  }
  return {loading, sendMessage}
}

export default useSendMessage