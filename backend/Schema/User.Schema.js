import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true
    },
    otp: { type: String },
    otpExpiry: { type: Date },
    password: {
        type: String,
        required: true,
    },
    verify: {
        type: Boolean,
        default: false
    },
    confirmPassword: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: Number,
        required: true,
    },
    membershipPlan: {
        type: String,
        enum: ['basic', 'premium', 'vip'],
        default: null,
    },

    membershipStartDate: { type: Date },
    membershipEndDate: { type: Date },


    dietPlans: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'DietPlan' }
    ],

    isAdmin: {
        type: Boolean,
        // required: true,
        default: false
    },
    joinDate:{
        type:Date,
        default:Date.now
    }
    // trainer: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Trainer'
    // },
}, {
    timestamps: true
})




userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

export default mongoose.model('User', userSchema)