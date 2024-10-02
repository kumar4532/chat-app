import mongoose, {Schema} from "mongoose";

const messageSchema = new mongoose.Schema({
    conversationId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Conversation" 
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String
    },
    file: {
        type: String
    },
    seen: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const Message = mongoose.model("Message", messageSchema);

export default Message;