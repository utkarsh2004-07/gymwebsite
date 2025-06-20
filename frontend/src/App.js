import React from 'react';
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import CalorieCalculator from './components/calorie/CalorieCalculator';
import Login from './components/Login/Login';
import ExercisePage from './components/ExercisePage/ExercisePage';
import WorkoutPage from './components/Workout/WorkoutPage';
import Yoga from './components/yoga/Yoga';
import YogaDetailPage from './components/yoga/YogaDetailPage';
import SignupForm from './components/Signup/SignupForm';
import ExercisePageDetailspage from './components/ExercisePage/ExercisePageDetailspage';
import DietPlanner from './components/Dietplanner/DietPlanner';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer/Footer';
import Success from './components/payment/Success';
import Cancel from './components/payment/Cancel';
import MembershipPlans from './membership/MembershipPlans';
import ContactPage from './components/Contact/ContactPage';
import VipPlan from './MemberUser/VIP-Plan-User/VipPlan';
import "./App.css";
import Profile from './components/Profile/Profile';
import CustomDietPlanner from './CustomDietPlanner';
import AdminDashboard from './components/Admin/AdminDashBoard';

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <AppContent />
                <ToastContainer />
            </BrowserRouter>
        </div>
    );
};

const AppContent = () => {
    const location = useLocation(); // Use location to get the current route

    return (
        <>
            {/* Conditionally render Navbar: don't show it on the /vip page */}
            {location.pathname !== '/vip' && <Navbar />}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/login" element={<Login />} />
                <Route path="/contact" element={<ContactPage />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/calorie" element={<CalorieCalculator />} />
                    <Route path="/member" element={<MembershipPlans />} />
                    <Route path="/exercises/:bodyPart" element={<ExercisePage />} />
                    <Route path="/exercises/:bodyPart/:id" element={<ExercisePageDetailspage />} />
                    <Route path="/diet" element={<DietPlanner />} />
                    <Route path="/yoga" element={<Yoga />} />
                    <Route path="/yoga/:id" element={<YogaDetailPage />} />
                    <Route path="/success" element={<Success />} />
                    <Route path="/cancel" element={<Cancel />} />
                    <Route path="/vip" element={<VipPlan />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/workout" element={<WorkoutPage />} />
                    <Route path="/customdietplanner" element={<CustomDietPlanner />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                </Route>
                <Route path="/diet" element={<DietPlanner />} />
            </Routes>
        </>
    );
};

export default App;
