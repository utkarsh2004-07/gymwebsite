import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MealPlanner = () => {
    const [formData, setFormData] = useState({
        dietaryPreferences: '',
        totalCalories: '',
        mealsPerDay: ''
    });
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isBasicPlan, setIsBasicPlan] = useState(false); // To track if user has a basic plan

    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    // Fetch the user plan type from localStorage
    useEffect(() => {
        const userPlan = localStorage.getItem('plan');
        if (userPlan === 'Basic') {
            setIsBasicPlan(true);
        } else {
            setIsBasicPlan(false);
        }
        fetchExistingPlans();
    }, []);

    const fetchExistingPlans = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/diet/getDietPlan/${userId}`);
            setPlans(response.data.dietPlans);
        } catch (error) {
            setError('Failed to fetch existing plans');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Check if the user has a basic plan
            if (!isBasicPlan && plans.length >= 1) {
                setError('You can only generate one meal plan. For further process, you can go with the Premium plan.');
                setLoading(false);
                return;
            }

            const response = await axios.post('http://localhost:5000/api/diet/generate', {
                userId,
                ...formData
            });
            setPlans([...plans, response.data.mealPlan]);
            setFormData({ dietaryPreferences: '', totalCalories: '', mealsPerDay: '' });
        } catch (error) {
            setError(error.response?.data?.error || 'Failed to generate meal plan');
        } finally {
            setLoading(false);
        }
    };

    const handleCustomDietPlan = () => {
        if (isBasicPlan) {
            navigate('/customdietplanner');
        } else {
           
            alert('Upgrade to Premium to access the Custom Diet Plan feature.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl p-8">
                    <div className='flex justify-between items-center'>
                        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
                            Personalized Meal Planner
                        </h1>
                        <button
                            onClick={handleCustomDietPlan}
                            className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 px-4 rounded-xl hover:opacity-90 transition-opacity"
                        >
                            Custom Diet Plan
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Diet Preferences
                                    </label>
                                    <select
                                        value={formData.dietaryPreferences}
                                        onChange={(e) => setFormData({ ...formData, dietaryPreferences: e.target.value })}
                                        className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500"
                                        required
                                    >
                                        <option value="">Select preference</option>
                                        <option value="vegetarian">Vegetarian</option>
                                        <option value="vegan">Vegan</option>
                                        <option value="keto">Keto</option>
                                        <option value="mediterranean">Mediterranean</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Daily Calories
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.totalCalories}
                                        onChange={(e) => setFormData({ ...formData, totalCalories: e.target.value })}
                                        className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500"
                                        placeholder="e.g. 2000"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Meals Per Day
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.mealsPerDay}
                                        onChange={(e) => setFormData({ ...formData, mealsPerDay: e.target.value })}
                                        className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500"
                                        min="1"
                                        max="6"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                                >
                                    {loading ? 'Generating Plan...' : 'Generate Meal Plan'}
                                </button>
                            </form>

                            {error && (
                                <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
                                    {error}
                                </div>
                            )}
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold text-gray-800">Your Meal Plans</h2>

                            {/* Make this container scrollable when there are many meal plans */}
                            <div className="max-h-96 overflow-y-auto">
                                {plans.map((plan, planIndex) => (
                                    <div key={planIndex} className="bg-gray-50 rounded-2xl p-6 shadow-sm mb-4">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                            Plan {planIndex + 1} - {plan.dietaryPreferences}
                                        </h3>

                                        <div className="space-y-4">
                                            {plan.mealPlan.map((meal, mealIndex) => (
                                                <div key={mealIndex} className="bg-white p-4 rounded-xl shadow-sm">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <h4 className="font-semibold text-gray-700">{meal.name}</h4>
                                                        <span className="text-sm text-green-600 font-medium">
                                                            {meal.calories} calories
                                                        </span>
                                                    </div>

                                                    <ul className="space-y-1">
                                                        {meal.items.map((item, itemIndex) => (
                                                            <li key={itemIndex} className="text-gray-600 text-sm">
                                                                • {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                {plans.length === 0 && !loading && (
                                    <div className="text-center py-12 text-gray-500">
                                        No meal plans generated yet. Create your first plan!
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealPlanner;
