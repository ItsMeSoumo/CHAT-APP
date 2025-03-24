import Message from '../models/message.model.js';
import Conversation from '../models/conversation.model.js';
import { asyncHandler } from '../utilities/asyncHandler.js';
import {errorHandler} from '../utilities/errorHandler.js';
import {getSocketId, io} from '../socket/socket.js'

export const sendMessage = asyncHandler(async(req,res, next) => {


    const senderId = req.user._id;
    const receiverId = req.params.receiverId;
    const message = req.body.message;

    if(!message || !receiverId || !senderId){
        return next(new errorHandler("All fields are required",400))
    }

    let conversation = await Conversation.findOne({
        participants: {
            $all: [senderId, receiverId]
        }
    })

    if(!conversation){
        conversation = await Conversation.create({
            participants: [senderId, receiverId]
        })
    }

    const newMessage = await Message.create({
        conversationId: conversation._id,
        sender: senderId,
        receiver: receiverId,
        message,
    })

    if(newMessage){
        conversation.messages.push(newMessage._id)
        await conversation.save()
    }

    const socketId = getSocketId(receiverId)
    io.to(socketId).emit("newMessage", newMessage)

res.status(200).json({
    success: true,
    responseData: {
        newMessage,
        
    }
})

})

export const getMessage = asyncHandler(async(req,res, next) => {

    // console.log("Request Body:", req.body);
    // console.log("Receiver ID:", req.params.otherParticipantId);
    // console.log("Sender ID:", req.user ? req.user._id : "User not found");


    const myId = req.user._id;
    const otherParticipantId = req.params.otherParticipantId;


    if( !myId || !otherParticipantId){
        return next(new errorHandler("All fields are required",400))
    }

    let conversation = await Conversation.findOne({
        participants: {
            $all: [myId, otherParticipantId]
        }
    }).populate("messages")


res.status(200).json({
    success: true,
    responseData: conversation
})

})
