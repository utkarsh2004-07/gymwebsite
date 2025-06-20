import axios from 'axios';
import mongoose from 'mongoose';

import DietPlan from "../Schema/Meal.js";
import UserSchema from '../Schema/User.Schema.js';

const GEMINI_API_KEY = "AIzaSyDHzxPkKlgKzBtNX9iYWwqsyJexp6rROPM"
// --- FIX APPLIED HERE ---
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
export const generateDietPlan = async (prompt) => {
    if (!GEMINI_API_KEY) {
        throw new Error('Gemini API key is not set');
    }

    try {
        const response = await axios.post(
            `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                }
            },
            { headers: { 'Content-Type': 'application/json' } }
        );

        if (!response.data || !response.data.candidates || !response.data.candidates[0].content) {
            throw new Error('Unexpected response format from Gemini API');
        }

        const content = response.data.candidates[0].content.parts[0].text;
        return parseMeals(content);
    } catch (error) {
        console.error('Gemini API Error:', error.response?.data || error.message);
        throw new Error('Failed to generate diet plan from Gemini API');
    }
};


const parseMeals = (content) => {
    const lines = content.split('\n').filter(line => line.trim() !== '');

    const meals = [];
    let currentMeal = null;

    lines.forEach(line => {
        if (line.includes(':')) {
            if (currentMeal) {
                meals.push(currentMeal);
            }
            const [name, caloriesStr] = line.split(':').map(part => part.trim());
            const calories = parseInt(caloriesStr.replace(/[^\d]/g, ''), 10) || 0;
            currentMeal = { name, calories, items: [] };
        } else if (currentMeal) {
            currentMeal.items.push(line.trim());
        }
    });

    if (currentMeal) {
        meals.push(currentMeal);
    }

    return meals;
};

export const generateDietPlanController = async (req, res) => {
    const { userId, dietaryPreferences, totalCalories, mealsPerDay } = req.body; // Retrieve userId from req.body

    if (!userId || !dietaryPreferences || !totalCalories || !mealsPerDay) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const prompt = `Create a meal plan based on the following preferences:
        Dietary Preferences: ${dietaryPreferences}
        Total Calories: ${totalCalories}
        Meals per Day: ${mealsPerDay}

        Please format the response as follows:
        Meal Name: Calories
        - Food item 1
        - Food item 2
        ...

        Repeat for each meal.`;

        const mealPlan = await generateDietPlan(prompt);


        // Save to the database
        const newDietPlan = new DietPlan({
            userId,
            dietaryPreferences,
            totalCalories,
            mealsPerDay,
            mealPlan,
        });

        const savedDietPlan = await newDietPlan.save();

        // Update the user's dietPlans array by pushing the new diet plan ID
        await UserSchema.findByIdAndUpdate(
            userId,
            { $push: { dietPlans: savedDietPlan._id } },
            { new: true } // Return the updated user
        );

        res.status(200).json({ mealPlan: savedDietPlan });

    } catch (error) {
        console.error('Error in generateDietPlanController:', error);
        res.status(500).json({ error: error.message || 'Failed to generate diet plan. Please try again.' });
    }
};

export const getDietplan = async (req, res) => {
    const { userId } = req.params;

    // Log the userId to verify its value
    console.log(`userId from req.params: ${userId}`);

    // Validate the userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid userId format' });
    }

    try {
        // Find the user and populate their diet plans
        const user = await UserSchema.findById(userId).populate('dietPlans');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ dietPlans: user.dietPlans });
    } catch (error) {
        console.error('Error fetching diet plans:', error);
        res.status(500).json({ error: 'Error fetching diet plans' });
    }
};