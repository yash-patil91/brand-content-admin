import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import CampaignManagement from "./components/CampaignManagement ";
import LoginPage from "./components/LoginPage";
import AuthcodeManagement from "./components/AuthcodeManagement";
import InfluencerManagement from "./components/InfluencerManagement";
import BrandsManagement from "./components/BrandsManagement";

// Function to check if the user is authenticated and of the required type
const isAuthenticated = () => {
    const token = localStorage.getItem('token');

    return token;
};

// ProtectedRoute component to guard the routes
const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
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
                        <ProtectedRoute>
                            <CampaignManagement />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/authcodemanagement"
                    element={
                        <ProtectedRoute>
                            <AuthcodeManagement />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/influencermanagement"
                    element={
                        <ProtectedRoute>
                            <InfluencerManagement />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/brandmanagement"
                    element={
                        <ProtectedRoute>
                            <BrandsManagement />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    );
}

export default App;
