import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";
import IncomingCallModal from '../components/alert/IncomingCall';

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [incomingCall, setIncomingCall] = useState(null);
    const [currentCall, setCurrentCall] = useState(null);
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser) {
            const socket = io("https://yo-chat-edg8.onrender.com", {
                query: {
                    userId: authUser._id
                }
            });

            setSocket(socket);

            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            socket.on("callError", ({ message }) => {
                alert(message);
            });

            socket.on("incomingVideoCall", (data) => {
                setIncomingCall({ ...data, type: 'video' });
            });

            socket.on("incomingVoiceCall", (data) => {
                setIncomingCall({ ...data, type: 'voice' });
            });

            socket.on("callAccepted", ({ accepterId, accepterName, roomId }) => {
                setCurrentCall({ accepterId, accepterName, roomId });
                // Join the room when the call is accepted
                socket.emit("joinRoom", { roomId });
            });

            return () => socket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    const generateRoomId = (callerId, otherUserId) => {
        return `${callerId}-${otherUserId}-${Date.now()}`;
    };

    const makeVideoCall = (otherUserId) => {
        const roomId = generateRoomId(authUser._id, otherUserId);
        if (socket) {
            socket.emit("outGoingVideoCall", {
                userId: authUser._id,
                otherUserId: otherUserId,
                roomId: roomId
            });
            setCurrentCall({ roomId, type: 'video' });
        } else {
            console.error("Socket not available");
        }
    };

    const makeVoiceCall = (otherUserId) => {
        const roomId = generateRoomId(authUser._id, otherUserId);
        if (socket) {
            socket.emit("outGoingVoiceCall", {
                userId: authUser._id,
                otherUserId: otherUserId,
                roomId: roomId
            });
            setCurrentCall({ roomId, type: 'voice' });
        } else {
            console.error("Socket not available");
        }
    };

    const acceptCall = (roomId) => {
        if (socket) {
            socket.emit("acceptCall", {
                roomId,
                accepterId: authUser._id,
                accepterName: authUser.fullname
            });
            // Join the room when accepting the call
            socket.emit("joinRoom", { roomId });
        }
        setIncomingCall(null);
    };

    const rejectCall = () => {
        if (socket && incomingCall) {
            socket.emit("rejectCall", { callerSocketId: incomingCall.callerSocketId });
        }
        setIncomingCall(null);
    };

    return (
        <SocketContext.Provider value={{ 
            socket, 
            onlineUsers, 
            makeVideoCall, 
            makeVoiceCall, 
            incomingCall,
            currentCall,
            acceptCall,
            rejectCall,
            setIncomingCall
        }}>
            {children}
            <IncomingCallModal />
        </SocketContext.Provider>
    );
};