import React, { useRef, useEffect } from 'react';
import Message from './Message';
import Skeleton from '../skeleton/Skeleton';
import useGetMessages from '../../hooks/useGetMessages';
import useListenMessages from '../../hooks/useListenMessages';
import { useSocketContext } from '../../context/SocketContext';
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';

function Messages() {
  const { authUser } = useAuthContext();
  const { socket } = useSocketContext();
  const { selectedConversation, messages, setMessages } = useConversation();
  const { loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  // Scroll to the last message
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Handle marking messages as seen
  // useEffect(() => {
  //   if (messages.length === 0) return;

  //   const lastMessage = messages[messages.length - 1];
  //   console.log(lastMessage);
    
  //   if (lastMessage.senderId !== authUser._id && !lastMessage.seen) {
  //     socket.emit("markMessagesAsSeen", {
  //       messageId: lastMessage._id,
  //       userId: authUser._id,
  //     });

  //     const handleMessagesSeen = ({ messageId }) => {
  //       setTimeout(() => {
  //         setMessages((prev) => {
  //           if (!Array.isArray(prev)) return prev; // Return if prev is not an array
      
  //           return prev.map((message) =>
  //             message._id === messageId ? { ...message, seen: true } : message
  //           );
  //         });
  //       }, 2000); // Adjust delay as necessary
  //     };

  //     socket.on("messagesSeen", handleMessagesSeen);
  //     return () => {
  //       socket.off("messagesSeen", handleMessagesSeen);
  //     };
  //   }
  // }, [socket, authUser._id, messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading && messages.length > 0 ? (
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))
      ) : loading ? (
        [...Array(3)].map((_, idx) => <Skeleton key={idx} />)
      ) : (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
}

export default Messages;