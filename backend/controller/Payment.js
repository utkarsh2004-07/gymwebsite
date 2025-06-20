import crypto from "crypto";
import razorpay from "razorpay";
import Payment from "../Schema/Payment.js";
import UserSchema from "../Schema/User.Schema.js";

const razorpayInstance = new razorpay({
    key_id: "rzp_test_SMZCi5l8zd0Bln",
    key_secret: "cOPsrLBEspTr5AVcS4WmlkQi"
});

export const payment = async (req, res) => {
    res.json([
        {
            id: "basic",
            name: "Premium",
            description: "7 Day Trial then $9.99/mo",
            price: 9.99,
            features: [
              "Complete Exercise Library",
              "Fitness Tools",
              "AI Generated Workouts",
              "Workout Tracking",
              "Workout Plans",
              "Routines",
              "Ad Free Experience"
            ]
          } 
    ]);
}

export const createorder = async (req, res) => {
    const { planId,userId } = req.body;
    // const userId = "66e06efac7861e9fe2effc4c" // Assume user ID is available through authentication middleware

    const membershipPlans = {
        basic: { price: 29.99, description: 'Basic' },
        premium: { price: 49.99, description: 'Premium Plan' },
        vip: { price: 79.99, description: 'VIP Plan' },
    };

    const plan = membershipPlans[planId];
    if (!plan) {
        return res.status(400).json({ error: 'Invalid plan ID' });
    }

    // Convert the price from INR to paise by multiplying by 100 and rounding it off
    const amount = Math.round(plan.price * 100); // Convert to paise

    try {
        const order = await razorpayInstance.orders.create({
            amount: amount, // Ensure this is an integer value
            currency: 'INR',
            receipt: `receipt_order_${Math.random().toString(36).substring(2, 15)}`,
        });

        // Save payment with status 'pending'
        const payment = new Payment({
            userId,
            planId,
            amount: plan.price,
            currency: 'INR',
            razorpayOrderId: order.id,
            paymentStatus: 'pending',
        });
        await payment.save();

        res.json({ orderId: order.id, amount: plan.price, currency: 'INR', plan });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ error: 'Error creating Razorpay order' });
    }
}

export const verifypayment = async (req, res) => {
    const { order_id, payment_id, razorpay_signature } = req.body;

    try {
        const payment = await Payment.findOne({ razorpayOrderId: order_id });
        if (!payment) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Verify the payment signature
        const hmac = crypto.createHmac('sha256', "cOPsrLBEspTr5AVcS4WmlkQi"); // Use key_secret here
        hmac.update(order_id + '|' + payment_id);
        const generatedSignature = hmac.digest('hex');

        console.log("Generated Signature:", generatedSignature);
        console.log("Received Signature:", razorpay_signature);

        if (generatedSignature === razorpay_signature) {
            payment.razorpayPaymentId = payment_id;
            payment.paymentStatus = 'completed';
            await payment.save();

            // Find the user and update their membership
            const user = await UserSchema.findById(payment.userId);
            
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Update user's membership if they already have one
            const currentDate = new Date();
            const newEndDate = user.membershipEndDate && user.membershipEndDate > currentDate
                ? new Date(user.membershipEndDate.setMonth(user.membershipEndDate.getMonth() + 1))
                : new Date(currentDate.setMonth(currentDate.getMonth() + 1));

            user.membershipPlan = payment.planId;
            user.membershipStartDate = currentDate;
            user.membershipEndDate = newEndDate;
            await user.save();

            res.json({ success: true, message: 'Payment successful and membership updated!' });
        } else {
            res.status(400).json({ success: false, message: 'Invalid signature, payment verification failed.' });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ error: 'Error verifying payment.' });
    }
}
