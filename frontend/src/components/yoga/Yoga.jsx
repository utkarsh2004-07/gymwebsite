// src/pages/Yoga.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import yoga from '../data/yoga'; // Your yoga data

const Yoga = () => {
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const exercisesPerPage = 3; // Number of exercises to display per page

    // Calculate the indices for the current page exercises
    const indexOfLastExercise = currentPage * exercisesPerPage;
    const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
    const currentYoga = yoga.slice(indexOfFirstExercise, indexOfLastExercise);

    // Calculate the total number of pages
    const totalPages = Math.ceil(yoga.length / exercisesPerPage);

    // Handle page change
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold text-center mb-6">Yoga Exercises</h1>
            {currentYoga.map(exercise => (
                <Link to={`/yoga/${exercise.id}`} key={exercise.id} className='no-underline'>
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8 cursor-pointer">
                    <div className="p-6">
                        <h2 className="text-2xl font-semibold mb-4 text-blue-800">{exercise.exercise_name}</h2>
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
                        <div className="space-y-4">
                            {exercise.steps?.map((step, index) => (
                                <div key={index} className="flex items-start">
                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-full font-bold text-lg">
                                        {index + 1}
                                    </div>
                                    <p className="ml-4 text-gray-700">{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    </div>
                </Link>
            ))}
            <div className="flex justify-between items-center mt-6 w-full">
                <div className='show'>
                    <span className="text-lg font-semibold">
                        Page {currentPage} of {totalPages}
                    </span>
                </div>
                <div className="bothbutton flex mr-3">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-md text-white ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                            }`}
                    >
                        Previous
                    </button>

                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-md text-white ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                            }`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Yoga;
