import express from 'express';
import { isAuthenticated } from '../middlewares/auth.middleware.js';
import { getMessage, sendMessage } from '../controllers/message.controller.js';

const router = express.Router();

router.post('/send/:receiverId', isAuthenticated, sendMessage);
router.get('/getMessage/:otherParticipantId', isAuthenticated, getMessage);

export default router;