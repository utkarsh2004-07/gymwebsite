import express from "express"
import { createorder, payment, verifypayment } from "../controller/Payment.js"
import { auth } from "../middleware/AuthMiddleware.js"


const router = express.Router()
router.get('/plans', payment)
router.post('/create-order', createorder)

router.post("/verify-payment", verifypayment)


export default router