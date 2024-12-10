import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Divider,
  Paper,
} from "@mui/material";

const ExamPaperView = () => {
  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const questions = [
    {
      id: 1,
      text: "Mặc định cửa sổ Layer cùng nhóm với các cửa sổ nào:",
      options: ["Channels, Paths", "Color, Swatches", "Adjustments, Styles", "History, Brush"],
    },
    {
      id: 2,
      text: "Tăng năng suất nông nghiệp theo cách thông minh thích ứng khí hậu đòi hỏi phải đầu tư liên tục:",
      options: [
        "Phát triển nguồn nhân lực ngành CNTT.",
        "Phát triển nguồn nhân lực nông nghiệp.",
        "Hệ thống giáo dục không chính quy.",
        "Hệ thống giáo dục chính quy.",
      ],
    },
    {
      id: 3,
      text: "Cân tắc chính xác qua công nghệ nào sử dụng trong đo đạc nông nghiệp?",
      options: ["Công nghệ vệ tinh biến đổi", "GIS", "AI", "Hệ thống cảm biến"],
    },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Đề thi kết thúc học phần
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <TextField label="Khoa" value="KHOA CNTT" variant="outlined" disabled />
        <TextField label="Bộ môn" value="CÔNG NGHỆ PHẦN MỀM" variant="outlined" disabled />
        <TextField label="Ngày thi" value="10/12/2024" variant="outlined" disabled />
        <TextField label="Thời gian làm bài" value="60 phút" variant="outlined" disabled />
        <TextField label="Tài liệu" value="Không sử dụng tài liệu" variant="outlined" disabled />
      </Box>

      <Divider sx={{ marginY: 4 }} />

      <Paper sx={{ padding: 4 }}>
        {questions.map((question) => (
          <Box key={question.id} sx={{ marginBottom: 4 }}>
            <Typography variant="h6">{`${question.id}. ${question.text}`}</Typography>
            <Box display="flex" flexDirection="column" gap={1} sx={{ marginTop: 1 }}>
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  variant={answers[question.id] === option ? "contained" : "outlined"}
                  onClick={() => handleAnswerChange(question.id, option)}
                  sx={{
                    justifyContent: "flex-start",
                  }}
                >
                  {`${String.fromCharCode(65 + index)}. ${option}`}
                </Button>
              ))}
            </Box>
          </Box>
        ))}
      </Paper>

      <Box display="flex" justifyContent="space-between" sx={{ marginTop: 4 }}>
        <Button variant="contained" color="success">
          Xem cả đáp án
        </Button>
        <Button variant="contained" color="error">
          Không xem đáp án
        </Button>
      </Box>
    </Box>
  );
};

export default ExamPaperView;
