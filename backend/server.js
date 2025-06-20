import express from "express"
import cors from "cors"
import connectDB from "./Database/Database.js";
import userRoutes from './routes/User.routes.js'
import otp from "./routes/OTP.routes.js"
import trainerRoute from "./routes/TrainerRoute.js"
import workRoute from "./routes/WorkoutRoutes.js"
import dietgenerate from "./routes/dietRoutes.js"
import payment from "./routes/PaymentRoutes.js"
import adminroute from './routes/adminroute.js'


const app = express();
app.use(cors({
  origin: 'https://gymwebsite-123.onrender.com',
  credentials: true,
}));
const port = process.env.PORT || 5000;

app.use(express.json());

connectDB()


app.use('/api/user', userRoutes)
app.use('/api/user', otp)
app.use('/api/trainer', trainerRoute)
app.use('/api/work', workRoute)
app.use("/api/diet",dietgenerate)
app.use("/api/payment",payment)
app.use("/api",adminroute)








  

















app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
