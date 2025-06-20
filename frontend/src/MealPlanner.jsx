import React, { useState } from 'react';
// import FoodSelector from './FoodSelector';
import CustomDietPlanner from './CustomDietPlanner';

const MealPlanner = () => {
  const [step, setStep] = useState(1);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [mealType, setMealType] = useState('breakfast');

  const handleAddFood = (food) => {
    setSelectedFoods(prev => [...prev, { ...food, mealType }]);
  };

  const getTotalNutrition = () => {
    return selectedFoods.reduce((acc, food) => ({
      calories: acc.calories + food.calories,
      protein: Math.round((acc.protein + food.protein) * 10) / 10,
      carbs: Math.round((acc.carbs + food.carbs) * 10) / 10,
      fats: Math.round((acc.fats + food.fats) * 10) / 10
    }), { calories: 0, protein: 0, carbs: 0, fats: 0 });
  };

  const removeFood = (index) => {
    setSelectedFoods(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Diet Planner</h2>
          <div className="flex gap-2">
            {['breakfast', 'lunch', 'dinner', 'snacks'].map((meal) => (
              <button
                key={meal}
                onClick={() => setMealType(meal)}
                className={`px-4 py-2 rounded ${
                  mealType === meal 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {meal.charAt(0).toUpperCase() + meal.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Foods List */}
      {selectedFoods.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Selected Foods</h3>
          <div className="space-y-2">
            {selectedFoods.map((food, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <span className="font-medium">{food.name}</span>
                  <span className="text-sm text-gray-600 ml-2">
                    ({food.quantity} {food.unit}) - {food.mealType}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm">
                    Cal: {food.calories} | P: {food.protein}g | C: {food.carbs}g | F: {food.fats}g
                  </span>
                  <button
                    onClick={() => removeFood(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded">
            <h4 className="font-semibold">Total Nutrition</h4>
            <div className="text-sm">
              {Object.entries(getTotalNutrition()).map(([key, value]) => (
                <span key={key} className="mr-4">
                  {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                  {key !== 'calories' ? 'g' : ''}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Food Selector */}
      {/* <FoodSelector onAddFood={handleAddFood} /> */}
      <CustomDietPlanner onAddFood={handleAddFood}/>
    </div>
  );
};

export default MealPlanner;