import React, { useState, useEffect } from "react";
import { Activity, Medal, Target, Calendar, Edit, TrendingUp, Weight, Clock } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    const joined = localStorage.getItem("joindate");

    if (storedUserDetails) {
      const parsedUserDetails = JSON.parse(storedUserDetails);
      setUser({
        ...parsedUserDetails,
        joinDate: new Date(joined).toLocaleDateString(),
        // Sample fitness stats - in real app, these would come from backend
        workoutsCompleted: 148,
        currentStreak: 12,
        achievements: ["Weight Loss Champion", "30-Day Challenge", "Perfect Form"],
        fitnessGoals: ["Build Muscle", "Improve Flexibility", "Run 10K"],
        personalBests: {
          benchPress: "225 lbs",
          deadlift: "315 lbs",
          squat: "275 lbs"
        }
      });
    }
    setIsLoading(false);
  }, []);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-pulse text-2xl text-blue-600">Loading...</div>
      </div>
    );
  }

  const { name, email, contactNumber, joinDate, workoutsCompleted, currentStreak, achievements, fitnessGoals, personalBests } = user;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <img
                  src="/api/placeholder/150/150"
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                  <Edit size={16} className="text-blue-600" />
                </button>
              </div>
              <div className="text-center md:text-left text-white">
                <h1 className="text-3xl font-bold">{name}</h1>
                <p className="text-blue-100 mt-1">{email}</p>
                <p className="text-blue-100 mt-1">{contactNumber}</p>
                <div className="flex items-center justify-center md:justify-start mt-2">
                  <Calendar size={16} className="mr-2" />
                  <span>Member since {joinDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Workouts</h3>
              <Activity className="text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-600 mt-2">{workoutsCompleted}</p>
            <p className="text-sm text-gray-600">Total sessions completed</p>
          </div> */}

          {/* <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Current Streak</h3>
              <TrendingUp className="text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600 mt-2">{currentStreak} days</p>
            <p className="text-sm text-gray-600">Keep it up!</p>
          </div> */}

          {/* <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Achievements</h3>
              <Medal className="text-yellow-600" />
            </div>
            <p className="text-3xl font-bold text-yellow-600 mt-2">{achievements.length}</p>
            <p className="text-sm text-gray-600">Badges earned</p>
          </div> */}
        </div>

        {/* Details Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Bests */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Personal Bests</h3>
              <Weight className="text-blue-600" />
            </div>
            <div className="space-y-4">
              {Object.entries(personalBests).map(([exercise, weight]) => (
                <div key={exercise} className="flex items-center justify-between">
                  <span className="capitalize">{exercise.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="font-semibold text-blue-600">{weight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fitness Goals */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Fitness Goals</h3>
              <Target className="text-blue-600" />
            </div>
            <div className="space-y-4">
              {fitnessGoals.map((goal, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span>{goal}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Edit Profile
          </button>
          {/* <button className="flex-1 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg">
            View Workout History
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;