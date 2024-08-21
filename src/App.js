import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import CampaignManagement from "./components/CampaignManagement ";
import LoginPage from "./components/LoginPage";
import AuthcodeManagement from "./components/AuthcodeManagement";
import InfluencerManagement from "./components/InfluencerManagement";

// Function to check if the user is authenticated and of the required type
const isAuthenticated = (requiredUserType) => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('type');
    
    return token && userType === requiredUserType;
};

// ProtectedRoute component to guard the routes
const ProtectedRoute = ({ children, requiredUserType }) => {
    if (!isAuthenticated(requiredUserType)) {
        return <Navigate to="/" />;
    }
    return children;
};

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route 
                    path="/campaignmanagement" 
                    element={
                        <ProtectedRoute requiredUserType="contentCreator">
                            <CampaignManagement />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/authcodemanagement" 
                    element={
                        <ProtectedRoute requiredUserType="contentCreator">
                            <AuthcodeManagement />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/influencermanagement" 
                    element={
                        <ProtectedRoute requiredUserType="contentCreator">
                            <InfluencerManagement />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </>
    );
}

export default App;
