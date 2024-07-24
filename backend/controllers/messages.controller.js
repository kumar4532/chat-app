import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"

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

        return res
        .status(200)
        .json({
            Message: "New message created successfully",
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

        return res
        .status(200)
        .json({
            message: "Messages gotten successfully",
            messages: conversation.messages
        })
    } catch (error) {
        console.log("Error in get message controller");
        throw error
    }
}