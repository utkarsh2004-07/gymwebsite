import express from 'express';

// import { Login, Signup } from '../controller/User.Controller.js';
import { auth } from '../middleware/AuthMiddleware.js';
import workoutgenerate from '../controller/Workout.js'

const router = express.Router();


router.post('/workout',workoutgenerate );

export default router;
