import express from 'express';
import { verifyOtp } from '../controller/User.Controller.js';

const router = express.Router();

router.post('/verify', verifyOtp);

export default router;
