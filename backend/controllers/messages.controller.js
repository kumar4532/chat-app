import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const {message} = req.body;
        const {id: receiverUser} = req.params;
        const senderUser = req.user._id;

        let conversation = await Conversation.findOne({
            participents: { $all: [senderUser, receiverUser] }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participents: [senderUser, receiverUser]
            })
        }

        const newMessage = new Message({
            senderId: senderUser,
            receiverId: receiverUser,
            message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }

        // await conversation.save();
        // await newMessage.save();

        await Promise.all([conversation.save(), newMessage.save()])

        const receiverSocketId = getReceiverSocketId(receiverUser);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

        return res
        .status(200)
        .json({
            newMessage
        })

    } catch (error) {
        console.log("Error in sendMessage controller");
        throw error
    }
}

export const getMessages = async(req, res) => {
    try {
        const { id:userToChatId } = req.params
        const senderId = req.user._id

        const conversation = await Conversation.findOne({
            participents: {$all : [senderId, userToChatId]}
        }).populate("messages");

        if (!conversation) {
            return res.status(200).json("Please send a message to start a conversation.");
        }

        return res
        .status(200)
        .json({
            messages: conversation.messages
        })
    } catch (error) {
        console.log("Error in get message controller");
        throw error
    }
}