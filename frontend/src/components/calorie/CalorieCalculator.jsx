import React, { useState } from 'react';
import CircularSlider from '@fseehawer/react-circular-slider';
import './CalorieCalculator.css';

const CalorieCalculator = () => {
    const [sex, setSex] = useState('');
    const [age, setAge] = useState(25);
    const [weight, setWeight] = useState(70);
    const [height, setHeight] = useState(170);
    const [exercise, setExercise] = useState('');
    const [calories, setCalories] = useState(null);
    const [error, setError] = useState('');

    const calculateCalories = (e) => {
        e.preventDefault();
        if (!sex) {
            setError('Please select your sex (male or female).');
            return;
        }
        setError('');
        let BMR;

        if (sex === 'male') {
            BMR = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else if (sex === 'female') {
            BMR = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        }

        let calorieNeeds;

        switch (exercise) {
            case 'none':
                calorieNeeds = BMR * 1.2;
                break;
            case 'light':
                calorieNeeds = BMR * 1.375;
                break;
            case 'moderate':
                calorieNeeds = BMR * 1.55;
                break;
            case 'heavy':
                calorieNeeds = BMR * 1.725;
                break;
            case 'very heavy':
                calorieNeeds = BMR * 1.9;
                break;
            default:
                calorieNeeds = BMR * 1.2;
        }

        setCalories(calorieNeeds);
    };

    return (
        <div className="calculator-container">
            <h1>Calorie Calculator</h1>
            <form onSubmit={calculateCalories}>
                <div className="form-group">
                    <label>Sex:</label>
                    <select value={sex} onChange={(e) => setSex(e.target.value)}>
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    {error && <p className="error">{error}</p>}
                </div>
                <div className="slider-row">
                    <div className="form-group slider-item">
                        <label>Age: {age}</label>
                        <CircularSlider
                            label="Age"
                            trackSize={24}
                            min={1}
                            max={100}
                            dataIndex={age - 1}
                            onChange={(value) => setAge(value)}
                        />
                    </div>
                    <div className="form-group slider-item">
                        <label>Weight (kg): {weight}</label>
                        <CircularSlider
                            label="Weight"
                            trackSize={24}
                            min={1}
                            max={200}
                            dataIndex={weight - 1}
                            onChange={(value) => setWeight(value)}
                        />
                    </div>
                    <div className="form-group slider-item">
                        <label>Height (cm): {height}</label>
                        <CircularSlider
                            label="Height"
                            trackSize={24}
                            min={1}
                            max={250}
                            dataIndex={height - 1}
                            onChange={(value) => setHeight(value)}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Exercise Level:</label>
                    <select value={exercise} onChange={(e) => setExercise(e.target.value)}>
                        <option value="">Select</option>
                        <option value="none">No exercise</option>
                        <option value="light">Light exercise (1-3 days per week)</option>
                        <option value="moderate">Moderate exercise (3-5 days per week)</option>
                        <option value="heavy">Heavy exercise (6-7 days per week)</option>
                        <option value="very heavy">Very heavy exercise (twice per day, extra heavy workouts)</option>
                    </select>
                </div>
                <button type="submit">Calculate</button>
            </form>
            {calories && (
                <div className="result">
                    <h2>Daily Caloric Needs: {calories.toFixed(0)} calories</h2>
                </div>
            )}
        </div>
    );
};

export default CalorieCalculator;
