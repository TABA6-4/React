import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Planner from "./pages/Planner";
import Report from "./pages/Report";
import MainPage from "./pages/MainPage";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/planner" element={<Planner />} />
                    <Route path="/report" element={<Report />} />
                    <Route path="/concentration" element={<MainPage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;