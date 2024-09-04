import React, { useEffect } from 'react'
import {useSocketContext} from "../context/SocketContext"
import useConversation from "../zustand/useConversation"

function useListenMessages() {
  const {socket} = useSocketContext()
  const {messages, setMessages, selectedConversation} = useConversation()

  useEffect(() => {
    
    socket?.on("newMessage", (newMessage) => {
        if (selectedConversation?._id === newMessage.senderId) {
            newMessage.shouldShake = true;
            setMessages([...messages, newMessage]);
        }
    })

    return () => socket?.off("newMessage")
  }, [socket, messages, setMessages])
}

export default useListenMessages