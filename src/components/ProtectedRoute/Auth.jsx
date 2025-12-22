import React from 'react';
import { Navigate } from 'react-router-dom';

const Auth = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        // ❌ Not logged in → redirect to home
        return <Navigate to="/" replace />;
    }

    // ✅ Logged in → allow access
    return children;
};

export default Auth;
