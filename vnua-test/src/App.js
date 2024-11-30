import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminRoutes from './routers/AdminRoutes';
import ExamRoutes from './routers/ExamRoutes';
import './assets/styles/Global.css';
import '@fontsource/roboto/700-italic.css';
import '@fontsource/nunito/500.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes - admin */}
        <Route path="/admin/*" element={<AdminRoutes />} />
        {/* Exam Routes */}
        <Route path="/*" element={<ExamRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
