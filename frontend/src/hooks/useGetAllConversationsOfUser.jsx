import React, { useEffect, useState } from 'react'

function useGetAllConversationsOfUser() {
    const [loading, setLoading] = useState(false)
    const [currentConversations, setCurrentConversations] = useState([]);

  useEffect(() => {
    const getAllConversation = async() => {
        setLoading(true);
        try {
            const res = await fetch("/api/messages/");
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error)
            }
            setCurrentConversations(data);
        } catch (error) {
            toast.error(error.message)
        } finally{
            setLoading(false)
        }
    }

    getAllConversation();
  }, [])

  return {loading, currentConversations};
}

export default useGetAllConversationsOfUser