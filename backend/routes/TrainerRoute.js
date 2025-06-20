import express from "express"
import { CreateTrainer, DeleteTrainer, getAllTrainer, UpdateTrainer } from "../controller/TrainerController.js"
import { auth } from "../middleware/AuthMiddleware.js"


const router = express.Router()

router.post("/createtrainer", auth, CreateTrainer)
router.put("/updatetrainer/:id", auth, UpdateTrainer)
router.delete("/deletetrainer/:id", auth, DeleteTrainer)


//not user auth middleware because it can use by user and admin aboth can user that so we not add Authmiddleware
router.get("/getAlltrainer", getAllTrainer)


export default router
