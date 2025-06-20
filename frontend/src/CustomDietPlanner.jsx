import React, { useState } from 'react';
import { Plus, Minus, ArrowRight, ArrowLeft, Save, Trash2 } from 'lucide-react';
import jsPDF from 'jspdf';


const DietPlanner = () => {




    const [step, setStep] = useState(1);
    const [personalInfo, setPersonalInfo] = useState({
        weight: '',
        height: '',
        age: '',
        goal: 'maintain',
        activityLevel: 'moderate'
    });



    const [meals, setMeals] = useState([
        {
            name: 'Breakfast',
            foods: []
        },
        {
            name: 'Lunch',
            foods: []
        },
        {
            name: 'Dinner',
            foods: []
        }
    ]);

    const [newFood, setNewFood] = useState({
        name: '',
        protein: '',
        carbs: '',
        fats: '',
        calories: ''
    });

    const calculateDailyCalories = () => {
        let bmr = 0;
        const weight = parseFloat(personalInfo.weight);
        const height = parseFloat(personalInfo.height);
        const age = parseFloat(personalInfo.age);

        bmr = 10 * weight + 6.25 * height - 5 * age + 5;

        const activityMultipliers = {
            sedentary: 1.2,
            light: 1.375,
            moderate: 1.55,
            active: 1.725,
            veryActive: 1.9
        };

        let calories = bmr * activityMultipliers[personalInfo.activityLevel];

        if (personalInfo.goal === 'lose') {
            calories -= 500;
        } else if (personalInfo.goal === 'gain') {
            calories += 500;
        }

        return Math.round(calories);
    };

    const addFoodToMeal = (mealIndex) => {
        if (!newFood.name || !newFood.protein || !newFood.carbs || !newFood.fats || !newFood.calories) {
            return;
        }

        const updatedMeals = [...meals];
        updatedMeals[mealIndex].foods.push({ ...newFood });
        setMeals(updatedMeals);
        setNewFood({
            name: '',
            protein: '',
            carbs: '',
            fats: '',
            calories: ''
        });
    };

    const removeFoodFromMeal = (mealIndex, foodIndex) => {
        const updatedMeals = [...meals];
        updatedMeals[mealIndex].foods.splice(foodIndex, 1);
        setMeals(updatedMeals);
    };


    const handleSavePlan = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text('Custom Gym Diet Plan', 10, 10);

        doc.setFontSize(14);
        doc.text('Personal Information:', 10, 20);
        doc.setFontSize(12);
        doc.text(`Weight: ${personalInfo.weight} kg`, 10, 30);
        doc.text(`Height: ${personalInfo.height} cm`, 10, 40);
        doc.text(`Age: ${personalInfo.age}`, 10, 50);
        doc.text(`Goal: ${personalInfo.goal}`, 10, 60);
        doc.text(`Activity Level: ${personalInfo.activityLevel}`, 10, 70);

        doc.setFontSize(14);
        doc.text('Daily Nutrition Targets:', 10, 80);
        doc.setFontSize(12);
        doc.text(`Calories: ${calculateDailyCalories()} kcal`, 10, 90);
        doc.text(`Protein: ${Math.round(calculateDailyCalories() * 0.3 / 4)}g`, 10, 100);
        doc.text(`Carbs: ${Math.round(calculateDailyCalories() * 0.4 / 4)}g`, 10, 110);
        doc.text(`Fats: ${Math.round(calculateDailyCalories() * 0.3 / 9)}g`, 10, 120);

        meals.forEach((meal, mealIndex) => {
            doc.setFontSize(14);
            doc.text(`${meal.name}:`, 10, 130 + mealIndex * 30);
            meal.foods.forEach((food, foodIndex) => {
                doc.setFontSize(12);
                doc.text(
                    `- ${food.name}: ${food.calories} kcal, P: ${food.protein}g, C: ${food.carbs}g, F: ${food.fats}g`,
                    10,
                    140 + mealIndex * 30 + foodIndex * 10
                );
            });
        });

        doc.save('diet-plan.pdf');
    };















    const renderPersonalInfoStep = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                    <input
                        type="number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={personalInfo.weight}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, weight: e.target.value })}
                        placeholder="Enter weight"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                    <input
                        type="number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={personalInfo.height}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, height: e.target.value })}
                        placeholder="Enter height"
                    />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={personalInfo.age}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, age: e.target.value })}
                    placeholder="Enter age"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Goal</label>
                <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={personalInfo.goal}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, goal: e.target.value })}
                >
                    <option value="lose">Lose Weight</option>
                    <option value="maintain">Maintain Weight</option>
                    <option value="gain">Gain Weight</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
                <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={personalInfo.activityLevel}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, activityLevel: e.target.value })}
                >
                    <option value="sedentary">Sedentary</option>
                    <option value="light">Lightly Active</option>
                    <option value="moderate">Moderately Active</option>
                    <option value="active">Very Active</option>
                    <option value="veryActive">Extremely Active</option>
                </select>
            </div>
        </div>
    );

    const renderMealPlanningStep = () => (
        <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Daily Targets</h3>
                <div className="grid grid-cols-2 gap-4">
                    <p>Calories: {calculateDailyCalories()} kcal</p>
                    <p>Protein: {Math.round(calculateDailyCalories() * 0.3 / 4)}g</p>
                    <p>Carbs: {Math.round(calculateDailyCalories() * 0.4 / 4)}g</p>
                    <p>Fats: {Math.round(calculateDailyCalories() * 0.3 / 9)}g</p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Food Name</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={newFood.name}
                            onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
                            placeholder="Enter food name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Calories</label>
                        <input
                            type="number"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={newFood.calories}
                            onChange={(e) => setNewFood({ ...newFood, calories: e.target.value })}
                            placeholder="kcal"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Protein (g)</label>
                        <input
                            type="number"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={newFood.protein}
                            onChange={(e) => setNewFood({ ...newFood, protein: e.target.value })}
                            placeholder="g"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Carbs (g)</label>
                        <input
                            type="number"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={newFood.carbs}
                            onChange={(e) => setNewFood({ ...newFood, carbs: e.target.value })}
                            placeholder="g"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Fats (g)</label>
                        <input
                            type="number"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={newFood.fats}
                            onChange={(e) => setNewFood({ ...newFood, fats: e.target.value })}
                            placeholder="g"
                        />
                    </div>
                </div>
            </div>

            {meals.map((meal, mealIndex) => (
                <div key={meal.name} className="bg-white rounded-lg shadow p-6 mt-6">
                    <h3 className="text-xl font-semibold mb-4">{meal.name}</h3>
                    <button
                        onClick={() => addFoodToMeal(mealIndex)}
                        className="mb-4 inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        <Plus className="w-4 h-4 mr-2" /> Add Food to {meal.name}
                    </button>

                    <div className="space-y-2">
                        {meal.foods.map((food, foodIndex) => (
                            <div key={foodIndex} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-medium">{food.name}</p>
                                    <p className="text-sm text-gray-600">
                                        {food.calories}kcal | P: {food.protein}g | C: {food.carbs}g | F: {food.fats}g
                                    </p>
                                </div>
                                <button
                                    onClick={() => removeFoodFromMeal(mealIndex, foodIndex)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );

    const renderSummaryStep = () => {
        const totalNutrients = meals.reduce((acc, meal) => {
            const mealTotals = meal.foods.reduce((mealAcc, food) => ({
                calories: mealAcc.calories + Number(food.calories),
                protein: mealAcc.protein + Number(food.protein),
                carbs: mealAcc.carbs + Number(food.carbs),
                fats: mealAcc.fats + Number(food.fats)
            }), { calories: 0, protein: 0, carbs: 0, fats: 0 });

            return {
                calories: acc.calories + mealTotals.calories,
                protein: acc.protein + mealTotals.protein,
                carbs: acc.carbs + mealTotals.carbs,
                fats: acc.fats + mealTotals.fats
            };
        }, { calories: 0, protein: 0, carbs: 0, fats: 0 });

        return (
            <div className="space-y-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-xl font-semibold mb-4">Daily Nutrition Summary</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <p className="font-medium text-lg">Target</p>
                            <p>Calories: {calculateDailyCalories()} kcal</p>
                            <p>Protein: {Math.round(calculateDailyCalories() * 0.3 / 4)}g</p>
                            <p>Carbs: {Math.round(calculateDailyCalories() * 0.4 / 4)}g</p>
                            <p>Fats: {Math.round(calculateDailyCalories() * 0.3 / 9)}g</p>
                        </div>
                        <div className="space-y-2">
                            <p className="font-medium text-lg">Actual</p>
                            <p>Calories: {Math.round(totalNutrients.calories)} kcal</p>
                            <p>Protein: {Math.round(totalNutrients.protein)}g</p>
                            <p>Carbs: {Math.round(totalNutrients.carbs)}g</p>
                            <p>Fats: {Math.round(totalNutrients.fats)}g</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {meals.map((meal) => (
                        <div key={meal.name} className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-xl font-semibold mb-4">{meal.name}</h3>
                            <div className="space-y-2">
                                {meal.foods.map((food, index) => (
                                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                                        <p className="font-medium">{food.name}</p>
                                        <p className="text-sm text-gray-600">
                                            {food.calories}kcal | P: {food.protein}g | C: {food.carbs}g | F: {food.fats}g
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg">
                <div className="p-6 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-900">Custom Gym Diet Planner</h1>
                </div>

                {/* Previous code remains the same until the return statement's div className="p-6" */}

                <div className="p-6">
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex space-x-2">
                                <div className={`h-2 w-16 rounded ${step >= 1 ? 'bg-blue-500' : 'bg-gray-200'}`} />
                                <div className={`h-2 w-16 rounded ${step >= 2 ? 'bg-blue-500' : 'bg-gray-200'}`} />
                                <div className={`h-2 w-16 rounded ${step >= 3 ? 'bg-blue-500' : 'bg-gray-200'}`} />
                            </div>
                            <p className="text-sm text-gray-600">Step {step} of 3</p>
                        </div>

                        {step === 1 && renderPersonalInfoStep()}
                        {step === 2 && renderMealPlanningStep()}
                        {step === 3 && renderSummaryStep()}

                        <div className="flex justify-between mt-8">
                            <button
                                onClick={() => setStep(step - 1)}
                                disabled={step === 1}
                                className={`inline-flex items-center px-6 py-2 rounded-lg ${step === 1
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" /> Previous
                            </button>

                            {step < 3 ? (
                                <button
                                    onClick={() => setStep(step + 1)}
                                    className="inline-flex items-center px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    Next <ArrowRight className="w-4 h-4 ml-2" />
                                </button>
                            ) : (
                                <button className="inline-flex items-center px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                    onClick={handleSavePlan}  >
                                    <Save className="w-4 h-4 mr-2" /> Save Plan
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DietPlanner;