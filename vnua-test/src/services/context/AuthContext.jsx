import React, { createContext, useState, useContext } from 'react';

// Tạo Context
const AuthContext = createContext();

// Provider để cung cấp thông tin user
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Trạng thái user

    // Hàm để cập nhật thông tin user
    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook để sử dụng Context
export const useAuth = () => useContext(AuthContext);
