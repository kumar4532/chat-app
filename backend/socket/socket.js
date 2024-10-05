import { Server } from "socket.io";
import http from "http";
import express from "express";
import User from "../models/user.model.js";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
    },
});

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId != "undefined") userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("outGoingVideoCall", async ({ userId, otherUserId, roomId }) => {
        const recipientSocketId = userSocketMap[otherUserId];

        if (recipientSocketId) {
            const callingUser = await User.findById(userId);
            io.to(recipientSocketId).emit("incomingVideoCall", {
                caller: callingUser,
                callerSocketId: socket.id,
                roomId: roomId
            });
            // Join the room when initiating the call
            socket.join(roomId);
        } else {
            socket.emit("callError", { message: "The user is not online" });
        }
    });

    socket.on("outGoingVoiceCall", async ({ userId, otherUserId, roomId }) => {
        const recipientSocketId = userSocketMap[otherUserId];

        if (recipientSocketId) {
            const callingUser = await User.findById(userId);
            io.to(recipientSocketId).emit("incomingVoiceCall", {
                caller: callingUser,
                callerSocketId: socket.id,
                roomId
            });
            // Join the room when initiating the call
            socket.join(roomId);
        } else {
            socket.emit("callError", { message: "The user is not online" });
        }
    });

    socket.on('acceptCall', ({ roomId, accepterId, accepterName }) => {
        socket.join(roomId);
        io.to(roomId).emit('callAccepted', { accepterId, accepterName, roomId });
    });

    socket.on('joinRoom', ({ roomId }) => {
        socket.join(roomId);
    });

    socket.on("rejectCall", ({ callerSocketId }) => {        
        io.to(callerSocketId).emit("callHasBeenRejected");
    });

    socket.on("callHasBeenCut", ({receiver}) => {        
        const receiverSocketId = userSocketMap[receiver];
        io.to(receiverSocketId).emit("callCutByCaller");
    });

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { app, io, server };