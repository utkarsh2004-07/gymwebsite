// models/DietPlan.js
import mongoose from 'mongoose';

const DietPlanSchema = new mongoose.Schema({
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dietaryPreferences: {
    type: String,
    enum: ['vegetarian', 'vegan', 'non-vegetarian', 'keto', 'Mediterranean'],
    required: true,
  },
  mealsPerDay: { type: Number, default: 3 },
  totalCalories: { type: Number, required: true },
  mealPlan: { type: Array },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } 
});

export default mongoose.model('DietPlan', DietPlanSchema);
