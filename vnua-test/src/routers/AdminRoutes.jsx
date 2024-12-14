import { Routes, Route, useNavigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';
import UserManagement from '../pages/admin/UserManagement';
import ExamManagement from '../pages/admin/ExamManagement';
import QuestionBank from '../pages/admin/QuestionBank';
import StudentManagement from '../pages/admin/StudentManagement';
import SubjectManagement from '../pages/admin/SubjectManagement';
import Setting from '../pages/admin/Setting';
import PoetryManagement from '../pages/admin/PoetryManagement';
import RoomExamManagement from '../pages/admin/RoomExamManagement';
import ExamPaperBank from '../pages/admin/ExamPaperBank';
import { useEffect, useState } from 'react';
import api from '../services/api/axios.config';
import Cookies from "js-cookie";

function AdminRoutes() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
    };

    const checkTokenValidity = async (token) => {
        // Kiểm tra tính hợp lệ của token (ví dụ: kiểm tra hết hạn hay không)
        try {
            const response = await api.get(`/auth/validate/token=${token}`);
            const result = response.data.success;
            if (!result) {
                logout();
            };
        } catch (error) {
            console.log(error);
        }
    };

    // Lấy thông tin người dùng và token từ localStorage khi ứng dụng load
    useEffect(() => {
        const storedToken =  Cookies.get("token");

        if (storedToken) {
            // Kiểm tra token có hợp lệ không và quyết định xem có cần đăng nhập lại hay không
            checkTokenValidity(storedToken);
        }
    }, []);

    return (
        <AdminLayout>
            <Routes>
                <Route path='/' element={<Dashboard/>} />
                <Route path='/students' element={<StudentManagement/>} />
                <Route path='/subjects' element={<SubjectManagement/>} />
                <Route path='/examBank' element={<ExamPaperBank/>} />
                <Route path="/users" element={<UserManagement />} />
                <Route path="/exams" element={<ExamManagement />} />
                <Route path="/poetry" element={<PoetryManagement />} />
                <Route path="/examRoom" element={<RoomExamManagement />} />
                <Route path="/questions" element={<QuestionBank />} />
                <Route path="/setting" element={<Setting />} />
            </Routes>
        </AdminLayout>
    );
}

export default AdminRoutes;