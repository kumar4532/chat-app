import { Server } from "socket.io";
import http from "http";
import express from "express";
// import Message from "../models/message.model.js";

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
	// console.log("a user connected", socket.id);

	const userId = socket.handshake.query.userId;
	if (userId != "undefined") userSocketMap[userId] = socket.id;

	// io.emit() is used to send events to all the connected clients
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	// socket.on("markMessagesAsSeen", async ({ messageId, userId }) => {
	// 	try {
	// 		const message = await Message.findOneAndUpdate(
	// 			{ _id: messageId },
	// 			{ $set: { seen: true } },
	// 			{ new: true }
	// 		).lean();			  
	  
	// 	  if (message) {
	// 		console.log("Message found and updated:", message);
	// 		console.log("Emitting to user with socket:", userSocketMap[userId]);
	// 		io.to(userSocketMap[userId]).emit("messagesSeen", { 
	// 		  messageId: message._id,
	// 		  conversationId: message.conversationId 
	// 		});
	// 	  } else {
	// 		console.log("Message not found or already seen");
	// 	  }
	// 	} catch (error) {
	// 	  console.error("Error marking message as seen:", error);
	// 	}
	//   });
	  

	// socket.on() is used to listen to the events. can be used both on client and server side
	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, io, server };