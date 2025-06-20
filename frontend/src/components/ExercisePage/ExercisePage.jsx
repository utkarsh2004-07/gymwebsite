import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import exercises from '../data/data.js';
import Front from '../Home/Front.jsx';
import Back from '../Home/Back.jsx';

const ExercisePage = () => {


    const style = {

        
        '@media (maxWidth: 1024)': {
            display: 'none'
        },
    };
    const { bodyPart } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const exercisesPerPage = 3;

    // Filter exercises based on the body part
    const filteredExercises = exercises.filter(exercise =>
        exercise.target.Primary?.includes(bodyPart) ||
        exercise.target.Secondary?.includes(bodyPart) ||
        exercise.target.Tertiary?.includes(bodyPart)
    );

    // Pagination logic
    const indexOfLastExercise = currentPage * exercisesPerPage;
    const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
    const currentExercises = filteredExercises.slice(indexOfFirstExercise, indexOfLastExercise);

    const totalPages = Math.ceil(filteredExercises.length / exercisesPerPage);

    // Handle page navigation
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

    // Reset page number when bodyPart changes
    useEffect(() => {
        setCurrentPage(1);
    }, [bodyPart]);

    return (
        <div className="flex  lg:flex-row p-4 lg:py-8 lg:px-12">
            {/* Main content area */}
            <div className="flex-1 lg:w-3/4 flex flex-col items-center">
                <h1 className="text-2xl lg:text-3xl font-bold text-center mb-4 lg:mb-6">{bodyPart} Exercises</h1>
                {currentExercises.map(exercise => (
                    <Link to={`/exercises/details/${exercise.id}`} key={exercise.id} className='text-decoration-none'>
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6 w-full lg:w-full max-w-full mx-auto min-h-[400px] flex flex-col">
                            <div className="p-6 flex flex-col flex-1">
                                <h2 className="text-xl lg:text-2xl font-semibold mb-4 text-blue-800">{exercise.exercise_name}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 flex-1" style={{ minHeight: '200px' }}>
                                    {exercise.videoURL.length > 0 ? (
                                        exercise.videoURL.map((url, index) => (
                                            <div key={index} className="relative">
                                                <video src={url} autoPlay className="w-full rounded-md" />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-500" >
                                            No videos available
                                        </div>
                                    )}
                                </div>
                                <div className="mt-3">
                                    {exercise.steps?.map((step, index) => (
                                        <div key={index} className="flex items-start mb-2">
                                            <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-full font-bold text-lg">
                                                {index + 1}
                                            </div>
                                            <p className="ml-4">{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
                <div className="flex justify-between items-center w-full mt-6">
                    <span className="text-lg font-semibold">
                        Page {currentPage} of {totalPages}
                    </span>
                    <div className="flex space-x-2">
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

            {/* Sidebar with Front and Back components */}
            <div className="lg:flex hidden lg:flex-col lg:items-center lg:w-1/4 lg:pl-4 space-y-96 mt-8 lg:mt-0 " style={style}>
                <div className="w-60 h-32">
                    <Front className="w-full h-full" />
                </div>
                <div className="w-60 h-32">
                    <Back className="w-full h-full" />
                </div>
            </div>
        </div>
    );
};

export default ExercisePage;