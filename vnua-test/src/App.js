import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminRoutes from './routers/AdminRoutes';
import ExamRoutes from './routers/ExamRoutes';
import './assets/styles/Global.css';
import '@fontsource/roboto/700-italic.css';
import '@fontsource/nunito/500.css';
import PrivateRoute from './routers/PrivateRoute';
import Login from './pages/auth/Login';
import { Dashboard } from '@mui/icons-material';
import StudentManagement from './pages/admin/StudentManagement';
import SubjectManagement from './pages/admin/SubjectManagement';
import ExamPaperBank from './pages/admin/ExamPaperBank';
import UserManagement from './pages/admin/UserManagement';
import ExamManagement from './pages/admin/ExamManagement';
import PoetryManagement from './pages/admin/PoetryManagement';
import RoomExamManagement from './pages/admin/RoomExamManagement';
import QuestionBank from './pages/admin/QuestionBank';
import Setting from './pages/admin/Setting';

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                  path="/admin/*"
                  element={
                      <PrivateRoute>
                          <AdminRoutes />
                      </PrivateRoute>
                  }
              >
                  <Route index element={<Dashboard />} />
                  <Route path="students" element={<StudentManagement />} />
                  <Route path="subjects" element={<SubjectManagement />} />
                  <Route path="examBank" element={<ExamPaperBank />} />
                  <Route path="users" element={<UserManagement />} />
                  <Route path="exams" element={<ExamManagement />} />
                  <Route path="poetry" element={<PoetryManagement />} />
                  <Route path="examRoom" element={<RoomExamManagement />} />
                  <Route path="questions" element={<QuestionBank />} />
                  <Route path="setting" element={<Setting />} />
              </Route>
              <Route
                  path="/exam/*"
                  element={
                      <PrivateRoute>
                          <ExamRoutes />
                      </PrivateRoute>
                  }
              />
          </Routes>
      </Router>
  );
}


export default App;
