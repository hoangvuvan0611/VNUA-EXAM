import { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Button,
  Chip,
  Box,
  TextField,
  InputAdornment
} from '@mui/material';
import { Search, Timer, Assignment } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function ExamList() {
  const [exams, setExams] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Mock data - replace with API call
    setExams([
      {
        id: 1,
        title: 'Kiểm tra Toán học',
        duration: 60,
        totalQuestions: 30,
        status: 'available'
      },
      {
        id: 2,
        title: 'Kiểm tra Vật lý',
        duration: 45,
        totalQuestions: 25,
        status: 'upcoming'
      },
      // Add more mock data
    ]);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'success';
      case 'upcoming':
        return 'warning';
      default:
        return 'default';
    }
  };

  const handleStartExam = (examId) => {
    navigate(`/exam-room/${examId}`);
  };

  return (
    <Container maxWidth="lg" className="py-8">
      <Box className="mb-8">
        <Typography variant="h4" className="mb-4 font-bold">
          Danh sách bài thi
        </Typography>
        
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Tìm kiếm bài thi..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          className="max-w-md"
        />
      </Box>

      <Grid container spacing={3}>
        {exams
          .filter(exam => 
            exam.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map(exam => (
            <Grid item xs={12} sm={6} md={4} key={exam.id}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="h-full flex flex-col">
                  <Typography variant="h6" className="font-bold mb-2">
                    {exam.title}
                  </Typography>
                  
                  <Box className="space-y-2 mb-4 flex-grow">
                    <Box className="flex items-center">
                      <Timer className="mr-2 text-gray-600" />
                      <Typography variant="body2">
                        Thời gian: {exam.duration} phút
                      </Typography>
                    </Box>
                    
                    <Box className="flex items-center">
                      <Assignment className="mr-2 text-gray-600" />
                      <Typography variant="body2">
                        Số câu hỏi: {exam.totalQuestions}
                      </Typography>
                    </Box>

                    <Chip
                      label={exam.status === 'available' ? 'Sẵn sàng' : 'Sắp diễn ra'}
                      color={getStatusColor(exam.status)}
                      size="small"
                      className="mt-2"
                    />
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    disabled={exam.status !== 'available'}
                    onClick={() => handleStartExam(exam.id)}
                  >
                    Bắt đầu thi
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}