import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove("token"); // Xóa cookie token
        navigate("/login"); // Chuyển hướng về trang đăng nhập
    };

    return <button onClick={handleLogout}>Đăng xuất</button>;
};

export default Logout;
