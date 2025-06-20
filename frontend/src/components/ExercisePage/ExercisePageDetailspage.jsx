import React from 'react';
import { useParams } from 'react-router-dom';
import exercises from '../data/data.js'; // Your exercise data

const ExerciseDetails = () => {
    const { id } = useParams();
    const exercise = exercises.find(ex => ex.id === parseInt(id));

    if (!exercise) {
        return <h1 className='text-center mt-80'>Exercise not found</h1>;
    }
    // if (!exercise.details){
    //     return <h1 className='text-center mt-80'>Comming Soon ...</h1>
    // }

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

                    <div className="text-gray-700 mt-6">
                        <p><strong>Category:</strong> {exercise.Category}</p>
                        <p><strong>Difficulty:</strong> {exercise.Difficulty}</p>
                        <p><strong>Force:</strong> {exercise.Force}</p>


                        <p><strong>Details:</strong> {exercise.details ? exercise.details : <strong>    Commming soon..</strong>}</p>
                        <p><strong>Primary Target:</strong> {exercise.target.Primary.join(', ')}</p>
                        {exercise.target.Secondary && (
                            <p><strong>Secondary Target:</strong> {exercise.target.Secondary.join(', ')}</p>
                        )}
                        {exercise.Grips && (
                            <p><strong>Grips:</strong> {exercise.Grips}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExerciseDetails;
