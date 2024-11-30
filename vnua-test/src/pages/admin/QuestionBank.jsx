import React, { useState } from "react";
import MyAppBar from "../../components/admin/appbar/MyAppBar";
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    Tabs,
    Tab,
    Grid2,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Search as SearchIcon,
    FileUpload as FileUploadIcon,
    FileDownload as FileDownloadIcon,
} from '@mui/icons-material';
import DialogUploadFile from "../../components/admin/dialog/DialogUploadFile";
import QuestionAnswerTable from "../../components/admin/table/QuestionAnswerTable";

const QuestionBank = () => {
    // State cho danh sách câu hỏi
    const [questions, setQuestions] = useState([
        {
            id: 1,
            content: "Thủ đô của Việt Nam là gì?",
            type: "single",
            level: "easy",
            subject: "Địa lý",
            chapter: "Chương 1",
            answers: [
                { id: 1, content: "Hà Nội", isCorrect: true },
                { id: 2, content: "Hồ Chí Minh", isCorrect: false },
                { id: 3, content: "Đà Nẵng", isCorrect: false },
                { id: 4, content: "Huế", isCorrect: false },
            ],
        },
    ]);

    // State cho dialog thêm/sửa câu hỏi
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [currentTab, setCurrentTab] = useState(0);

    // State cho dialog thêm mới câu hỏi từ file
    const [openDialogUploadFile, setOpenDialogUploadFile] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    // Xử lý mở dialog upload file
    const handleOpenDialogUploadFile = () => setOpenDialogUploadFile(true);
    
    // Xử lý khi đóng hộp thoại upload file
    const handleCloseDialogUploadFile = () => {
        setOpenDialogUploadFile(false);
        // Đặt lại giá trị của file khi đóng hộp thoại
        setSelectedFile(null);
    }

    // State cho tìm kiếm và lọc
    const [searchTerm, setSearchTerm] = useState('');
    const [filterSubject, setFilterSubject] = useState('all');
    const [filterLevel, setFilterLevel] = useState('all');

    // State cho form câu hỏi mới
    const [formData, setFormData] = useState({
        content: '',
        type: 'single',
        level: 'easy',
        subject: '',
        chapter: '',
        answers: [
            { id: 1, content: '', isCorrect: false },
            { id: 2, content: '', isCorrect: false },
            { id: 3, content: '', isCorrect: false },
            { id: 4, content: '', isCorrect: false },
        ],
    });

    // Xử lý mở dialog
    const handleOpenDialog = (question = null) => {
        if (question) {
            setFormData(question);
            setSelectedQuestion(question);
        } else {
            setFormData({
                content: '',
                type: 'single',
                level: 'easy',
                subject: '',
                chapter: '',
                answers: [
                    { id: 1, content: '', isCorrect: false },
                    { id: 2, content: '', isCorrect: false },
                    { id: 3, content: '', isCorrect: false },
                    { id: 4, content: '', isCorrect: false },
                ],
            });
            setSelectedQuestion(null);
        }
        setOpenDialog(true);
        setCurrentTab(0);
    };

    // Xử lý đóng dialog
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedQuestion(null);
        setCurrentTab(0);
    };

    // Xử lý lưu câu hỏi
    const handleSaveQuestion = () => {
        if (selectedQuestion) {
            setQuestions(questions.map(q =>
                q.id === selectedQuestion.id ? { ...formData, id: selectedQuestion.id } : q
            ));
        } else {
            setQuestions([...questions, { ...formData, id: questions.length + 1 }]);
        }
        handleCloseDialog();
    };

    // Xử lý xóa câu hỏi
    const handleDeleteQuestion = (id) => {
        setQuestions(questions.filter(q => q.id !== id));
    };

    // Lọc câu hỏi
    const filteredQuestions = questions.filter(question => {
        const matchesSearch = question.content.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSubject = filterSubject === 'all' || question.subject === filterSubject;
        const matchesLevel = filterLevel === 'all' || question.level === filterLevel;
        return matchesSearch && matchesSubject && matchesLevel;
    });

    // Dữ liệu mẫu
    const rows = [
        {
            id: '234342',
            content: 'Đâu là thủ đô của Việt Nam?',
            subject: 'Địa lý',
            chapter: 'Chương 1',
            type: '1 đáp án',
            level: 'Dễ',
            answers: [
                {
                content: 'Hà Nội',
                isCorrect: true,
                explanation: 'Hà Nội là thủ đô của Việt Nam từ năm 1945'
                },
                {
                content: 'TP. Hồ Chí Minh',
                isCorrect: false,
                explanation: 'TP. Hồ Chí Minh là thành phố lớn nhất nhưng không phải thủ đô'
                },
                {
                content: 'Đà Nẵng',
                isCorrect: false,
                explanation: 'Đà Nẵng là thành phố trực thuộc trung ương'
                },
            ],
        },
        {
            id: '234362',
            content: 'Quá trình nào sau đây là quá trình tổng hợp?',
            subject: 'Hóa học',
            chapter: 'Chương 2',
            type: '1 đáp án',
            level: 'Khó',
            answers: [
                {
                content: '2H2 + O2 → 2H2O',
                isCorrect: true,
                explanation: 'Đây là phản ứng tổng hợp nước từ khí H2 và O2'
                },
                {
                content: 'CaCO3 → CaO + CO2',
                isCorrect: false,
                explanation: 'Đây là phản ứng phân hủy'
                },
            ],
        },
    ];

    return (
        <div style={{ position: 'relative' }}>
            <div className="shadow-sm" style={{ position: 'sticky', top: 0, left: 0, right: 0, zIndex: 39 }}>
                <MyAppBar label={'Quản lý Ngân hàng Câu hỏi'} />
            </div>

            <Box sx={{ p: 3 }}>
                {/* Thanh tác vụ */}
                <Grid2 container spacing={2} alignItems="center" sx={{ mb: 3}}>
                    <Grid2 item xs={12} md={4}>
                        <Grid2 container spacing={1}>
                            <Grid2 item xs={4}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    onClick={() => handleOpenDialog()}
                                    sx={{textTransform: 'none'}}
                                >
                                    Thêm mới
                                </Button>
                            </Grid2>
                            <Grid2 item xs={4}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    startIcon={<FileUploadIcon />}
                                    onClick={() => handleOpenDialogUploadFile()}
                                    sx={{textTransform: 'none'}}
                                >
                                    Tải lên file câu hỏi
                                </Button>
                            </Grid2>
                            <Grid2 item xs={4}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    startIcon={<FileDownloadIcon />}
                                    sx={{textTransform: 'none'}}
                                >
                                    Xuất file câu hỏi
                                </Button>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                </Grid2>

                {/* Bang cau hoi */}
                <QuestionAnswerTable rowData={filteredQuestions} onDeleteQuestion={handleDeleteQuestion}/>

                {/* Dialog thêm/sửa câu hỏi */}
                <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                    <DialogTitle>
                        {selectedQuestion ? 'Chỉnh sửa câu hỏi' : 'Thêm câu hỏi mới'}
                    </DialogTitle>
                    <DialogContent>
                        <Tabs
                            value={currentTab}
                            onChange={(e, newValue) => setCurrentTab(newValue)}
                            sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
                        >
                            <Tab label="Thông tin chung" />
                            <Tab label="Đáp án" />
                        </Tabs>

                        {currentTab === 0 && (
                            <Box sx={{ pt: 2 }}>
                                <Grid2 container spacing={2}>
                                    <Grid2 item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Nội dung câu hỏi"
                                            value={formData.content}
                                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                            multiline
                                            rows={3}
                                        />
                                    </Grid2>
                                    <Grid2 item xs={12} md={6}>
                                        <FormControl fullWidth>
                                            <InputLabel>Loại câu hỏi</InputLabel>
                                            <Select
                                                value={formData.type}
                                                label="Loại câu hỏi"
                                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                            >
                                                <MenuItem value="single">Một đáp án</MenuItem>
                                                <MenuItem value="multiple">Nhiều đáp án</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid2>
                                    <Grid2 item xs={12} md={6}>
                                        <FormControl fullWidth>
                                            <InputLabel>Độ khó</InputLabel>
                                            <Select
                                                value={formData.level}
                                                label="Độ khó"
                                                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                            >
                                                <MenuItem value="easy">Dễ</MenuItem>
                                                <MenuItem value="medium">Trung bình</MenuItem>
                                                <MenuItem value="hard">Khó</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid2>
                                    <Grid2 item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Môn học"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        />
                                    </Grid2>
                                    <Grid2 item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Chương"
                                            value={formData.chapter}
                                            onChange={(e) => setFormData({ ...formData, chapter: e.target.value })}
                                        />
                                    </Grid2>
                                </Grid2>
                            </Box>
                        )}

                        {currentTab === 1 && (
                            <Box sx={{ pt: 2 }}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Danh sách đáp án
                                </Typography>
                                <Grid2 container spacing={2}>
                                    {formData.answers.map((answer, index) => (
                                        <Grid2 item xs={12} key={answer.id}>
                                            <Grid2 container spacing={2} alignItems="center">
                                                <Grid2 item xs={9}>
                                                    <TextField
                                                        fullWidth
                                                        label={`Đáp án ${index + 1}`}
                                                        value={answer.content}
                                                        onChange={(e) => {
                                                            const newAnswers = [...formData.answers];
                                                            newAnswers[index].content = e.target.value;
                                                            setFormData({ ...formData, answers: newAnswers });
                                                        }}
                                                    />
                                                </Grid2>
                                                <Grid2 item xs={3}>
                                                    <FormControl fullWidth>
                                                        <InputLabel>Đúng/Sai</InputLabel>
                                                        <Select
                                                            value={answer.isCorrect}
                                                            label="Đúng/Sai"
                                                            onChange={(e) => {
                                                                const newAnswers = [...formData.answers];
                                                                newAnswers[index].isCorrect = e.target.value;
                                                                setFormData({ ...formData, answers: newAnswers });
                                                            }}
                                                        >
                                                            <MenuItem value={true}>Đúng</MenuItem>
                                                            <MenuItem value={false}>Sai</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid2>
                                            </Grid2>
                                        </Grid2>
                                    ))}
                                </Grid2>
                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} sx={{textTransform: 'none'}}>Hủy</Button>
                        <Button onClick={handleSaveQuestion} variant="contained" sx={{textTransform: 'none'}}>
                            {selectedQuestion ? 'Cập nhật' : 'Thêm mới'}
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Dialog import file cau hoi */}
                <DialogUploadFile open={openDialogUploadFile} onClose={handleCloseDialogUploadFile} title={"Tải lên file câu hỏi"}/>
            </Box>
        </div>
    );
}

export default QuestionBank;