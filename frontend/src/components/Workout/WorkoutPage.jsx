import React, { useState } from 'react';
import axios from 'axios';

const WorkoutPage = () => {
    // const [userId, setUserId] = useState('');
    const [workoutType, setWorkoutType] = useState('');
    const [duration, setDuration] = useState('');
    const [intensity, setIntensity] = useState('');
    const [workoutPlan, setWorkoutPlan] = useState(null);
    const [error, setError] = useState('');
    const userId = localStorage.getItem('userId');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/work/workout', {
                userId,
                workoutType,
                duration,
                intensity
            });
            setWorkoutPlan(response.data.plan);
            setError('');
        } catch (error) {
            setError('Failed to generate workout plan');
            setWorkoutPlan(null);
        }
    };

    return (
        <div className="container">
            <h1>Workout Plan Generator</h1>
            <form onSubmit={handleSubmit}>
                {/* <div>
                    <label>User ID:</label>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                </div> */}
                <div>
                    <label>Workout Type:</label>
                    <select
                        value={workoutType}
                        onChange={(e) => setWorkoutType(e.target.value)}
                        required
                    >
                        <option value="">Select Workout Type</option>
                        <option value="Strength">Strength</option>
                        <option value="Cardio">Cardio</option>
                        <option value="Flexibility">Flexibility</option>
                    </select>
                </div>
                <div>
                    <label>Duration (e.g., 30 minutes):</label>
                    <input
                        type="text"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Intensity:</label>
                    <select
                        value={intensity}
                        onChange={(e) => setIntensity(e.target.value)}
                        required
                    >
                        <option value="">Select Intensity</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
                <button type="submit">Generate Workout Plan</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {workoutPlan && (
                <div>
                    <h2>Workout Plan</h2>
                    <p>Workout Type: {workoutPlan.workoutType}</p>
                    <p>Duration: {workoutPlan.duration}</p>
                    <p>Intensity: {workoutPlan.intensity}</p>
                    <h3>Exercises:</h3>
                    <ul>
                        {workoutPlan.exercises.map((exercise, index) => (
                            <li key={index}>
                                {exercise.name} - {exercise.sets} sets of {exercise.reps}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default WorkoutPage;
