import { Routes, Route } from 'react-router-dom';
import ExamLayout from '../layouts/ExamLayout';
import Login from '../pages/auth/Login';
import ExamList from '../pages/exam/ExamList';
import ExamRoom from '../pages/exam/ExamRoom';
import Result from '../pages/exam/Result';
import Login1 from '../pages/auth/Login1';

function ExamRoutes() {
    function onCopyHandler(e) {
        e.preventDefault();
        e.stopPropagation();
      }
    return (
        <div onCopy={onCopyHandler}>
            <ExamLayout >
                <Routes>
                    <Route path='/' element={<Login1 />} />
                    <Route path="/vnua-exams" element={<ExamList />} />
                    <Route path="/exam-room/:examId" element={<ExamRoom />} />
                    <Route path="/result/:examId" element={<Result />} />
                </Routes>
            </ExamLayout>
        </div>
    );
}

export default ExamRoutes;