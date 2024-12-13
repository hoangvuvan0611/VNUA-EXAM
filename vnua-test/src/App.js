import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminRoutes from './routers/AdminRoutes';
import ExamRoutes from './routers/ExamRoutes';
import './assets/styles/Global.css';
import '@fontsource/roboto/700-italic.css';
import '@fontsource/nunito/500.css';
import PrivateRoute from './routers/PrivateRoute';
import Login from './pages/auth/Login';

function App() {


  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
      </Routes>

      {/* Yeu cau dang nhap de truy cap */}
      <PrivateRoute>
        <Routes>
          {/* Admin Routes - admin */}
          <Route path="/admin/*" element={<AdminRoutes />} />
          {/* Exam Routes */}
          <Route path="/exam/*" element={<ExamRoutes />} />
        </Routes>
      </PrivateRoute>
    </Router>
  );
}

export default App;
