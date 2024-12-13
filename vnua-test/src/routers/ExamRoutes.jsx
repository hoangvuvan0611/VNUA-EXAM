import { Routes, Route } from 'react-router-dom';
import ExamLayout from '../layouts/ExamLayout';
import Login from '../pages/auth/Login';
import ExamList from '../pages/exam/ExamList';
import ExamRoom from '../pages/exam/ExamRoom';
import Result from '../pages/exam/Result';

function ExamRoutes() {
    function onCopyHandler(e) {
        e.preventDefault();
        e.stopPropagation();
      }
    return (
        <div onCopy={onCopyHandler}>
            <ExamLayout >
                <Routes>
                    <Route path="/vnua-exams" element={<ExamList />} />
                    <Route path="/exam-room/:examId" element={<ExamRoom />} />
                    <Route path="/result/:examId" element={<Result />} />
                </Routes>
            </ExamLayout>
        </div>
    );
}

export default ExamRoutes;