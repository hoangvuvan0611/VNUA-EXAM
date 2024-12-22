import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
        <Route
          path='/admin/*'
          element={
            <PrivateRoute>
              <AdminRoutes />
            </PrivateRoute>
          } 
        />
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
