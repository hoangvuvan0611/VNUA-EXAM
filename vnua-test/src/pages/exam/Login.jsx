import { useState } from 'react';
import { 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Typography,
  Box,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Implement login logic here
      navigate('/exams');
    } catch (error) {
      setError('Đăng nhập không thành công');
    }
  };

  return (
    <Container maxWidth="xs" className="min-h-screen flex items-center justify-center">
      <Paper elevation={3} className="p-8 w-full">
        <Typography 
          variant="h4" 
          className="text-center mb-6 font-bold text-primary-main"
        >
          Đăng Nhập
        </Typography>

        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            label="Tên đăng nhập"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Mật khẩu"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button 
            type="submit"
            fullWidth 
            variant="contained" 
            color="primary"
            size="large"
            className="mt-4"
          >
            Đăng nhập
          </Button>
        </form>
      </Paper>
    </Container>
  );
}