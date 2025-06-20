// src/pages/YogaDetailPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import yoga from '../data/yoga'; // Your yoga data

const YogaDetailPage = () => {
    const { id } = useParams(); // Get the exercise ID from the URL parameter
    const exercise = yoga.find(ex => ex.id === parseInt(id)); // Find the exercise by ID

    // Debugging: Log the ID and exercise data
    // console.log('Exercise ID:', id);
    // console.log('Exercise Data:', exercise);

    if (!exercise) {
        return <div>Exercise not found</div>;
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold text-center mb-6">{exercise.exercise_name}</h1>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
                <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        {exercise.videoURL.map((url, index) => (
                            <div key={index} className="relative">
                                <video src={url} autoPlay className="w-full rounded-md" />
                                <span className="absolute top-0 left-0 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-br-lg">
                                    {exercise.Difficulty}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-4 mb-6">
                        {exercise.steps.map((step, index) => (
                            <div key={index} className="flex items-start">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-full font-bold text-lg">
                                    {index + 1}
                                </div>
                                <p className="ml-4 text-gray-700">{step}</p>
                            </div>
                        ))}
                    </div>
                    <div className="text-gray-700 mb-4">
                        {/* <p><strong>Category:</strong> {exercise.Category}</p> */}
                        <p><strong>Difficulty:</strong> {exercise.Difficulty}</p>
                        <p><strong>Force:</strong> {exercise.Force}</p>
                        <p><strong>Primary Target:</strong> {exercise.target.Primary.join(', ')}</p>
                        <p><strong>Secondary Target:</strong> {exercise.target.Secondary.join(', ')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YogaDetailPage;
