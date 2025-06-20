// routes/dietRoutes.js
import express from 'express';
// import { generateDietPlanController } from '../controllers/dietController.js';
import { generateDietPlanController, getDietplan } from "../controller/dietController.js"
import { auth } from '../middleware/AuthMiddleware.js';

const router = express.Router();

// POST /api/diet/generate - Generate diet plan based on user input
router.post('/generate', generateDietPlanController);
// router.post('/workouts', workoutgenerate);
router.get('/getDietPlan/:userId', getDietplan);

export default router;
