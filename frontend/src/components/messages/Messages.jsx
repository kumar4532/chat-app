import React, { useRef, useEffect, useMemo, useCallback } from 'react';
import Message from './Message';
import useGetMessages from '../../hooks/useGetMessages';
import Skeleton from '../skeleton/Skeleton';
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

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [messages]);


  

  console.log(messages);
  const userConvoId = messages.length > 0 ? messages[0].conversationId : null;

  useEffect(() => {
		const lastMessageIsFromOtherUser = messages.length && messages[messages.length - 1].sender !== authUser._id;
		if (lastMessageIsFromOtherUser) {
			socket.emit("markMessagesAsSeen", {
				conversationId: userConvoId,
				userId: selectedConversation._id,
			});
		}

		socket.on("messagesSeen", ({ conversationId }) => {
      console.log(conversationId);
      
				setMessages((prev) => {
					const updatedMessages = prev.map((message) => {
						if (!message.seen) {
							return {
								...message,
								seen: true,
							};
						}
						return message;
					});
					return updatedMessages;
				});
			}
		);
	}, [socket, authUser._id, messages, selectedConversation, userConvoId]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <Skeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
}

export default Messages;