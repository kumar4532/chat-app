import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({

}, {timestamps: true})

export default Message = mongoose.model("message", messageSchema)