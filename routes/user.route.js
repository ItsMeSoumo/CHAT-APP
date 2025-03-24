import express from 'express';
import { getProfile, login, register, logout, getOtherUsers } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/getprofile', isAuthenticated , getProfile);
router.post('/logout', isAuthenticated, logout );
router.get('/getOtherUsers', isAuthenticated, getOtherUsers );

export default router;