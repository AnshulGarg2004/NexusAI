import express from "express"
import { createConversation, getConversations, getMessages, saveMessge, updateConversation } from "../controller/chat.controller.js";

const router = express.Router();

router.get('/create-conversation', createConversation);
router.get('/get-conversations', getConversations);
router.post('/save-message', saveMessge);
router.get('/get-messages/:conversationId', getMessages);
router.post('/update-conversation', updateConversation);


export default router;