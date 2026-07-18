import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const createConversation = async (req, res) => {
    try {
        console.log(" m aaya hu");
        
        const userId = req.headers['x-user-id'];
        console.log("user id in pwh: ", userId );
        const conversation = await Conversation.create({
            userId : userId
        });
        
        return res.status(200).json({message : "conversation created", conversation});
    } catch (error) {
        console.log("error in creating conversation: ", error.message);
        return res.status(500).json({message : "error in creating conversation"})
    }
}

export const getConversations = async (req, res) => {
    try {
        console.log(" m aaya hu");
        
        const userId = req.headers['x-user-id'];
        console.log("user id:", userId);
        
        const conversation = await Conversation.find({userId}).sort({createdAt : -1});
        console.log("fetched get conversations: ", conversation);
        
        return res.status(200).json({message : "conversation fetched successfully", conversation});
    } catch (error) {
        console.log("error in geting conversation: ", error.message);
        return res.status(500).json({message : "error in geting conversation"})
    }
}

export const saveMessge = async (req, res) => {
    try {
        const {conversationId, role, content, images} = req.body;
        if(!conversationId || !role || !content) {
            return res.status(400).json({message : "missing data"})
        }
        const message = await Message.create({
            conversationId : conversationId, role : role, content : content, images
        });


        return res.status(200).json({message : "message saved successfully", message});
    } catch (error) {
         console.log("error in saving message: ", error.message);
        return res.status(500).json({message : "error in saving message"})
    }
}

export const getMessages = async (req, res) => {
    try {
        
         
         const messages = await Message.find({conversationId : req.params.conversationId}).sort({createdAt : 1});
         return res.status(200).json({message : "messages fetched successfully", messages});
    } catch (error) {
         console.log("error in fetching messages: ", error.message);
        return res.status(500).json({message : "error in fetching messages"})
    }
}

export const updateConversation = async (req, res) => {
    try {
        const {id, title} = req.body;
        const conversation = await Conversation.findByIdAndUpdate(id, {title}, {new : true});
        return res.status(200).json({message : "conversation updated successfully", conversation}); 

    }
    catch (error) {
        console.log("error in updating conversation: ", error.message);
        return res.status(500).json({message : "error in updating conversation"})
    }
}