import express from 'express';
import { Login, logout, Signup } from '../controller/User.Controller.js';
import { auth } from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.post('/signup', Signup);
router.post('/login', Login);
router.post('/logout', logout)
// router.get('/check',checkauth)









export default router;
