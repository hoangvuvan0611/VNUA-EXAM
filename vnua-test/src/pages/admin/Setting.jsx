import React, { useState } from "react";

import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  Tabs, 
  Tab, 
  Grid2
} from '@mui/material';
import { 
  Add as AddIcon, 
  Edit as EditIcon, 
  BarChart as ReportIcon,
  FileDownload as ExportIcon
} from '@mui/icons-material';

const examData = [
  {
    id: 1,
    name: "Kỳ Thi Giữa Học Kỳ 2024",
    status: "open",
    shifts: [
      {
        id: 101,
        name: "Ca Sáng",
        time: "07:30 - 09:30",
        status: "ongoing",
        rooms: [
          {
            id: 201,
            name: "Phòng A1",
            location: "Tầng 2, Nhà A",
            students: 45,
            supervisors: 2
          }
        ]
      }
    ]
  }
];

const historicalExams = [
  {
    id: 2,
    name: "Kỳ Thi Cuối Học Kỳ 2023",
    date: "12/2023"
  }
];

const Setting = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openExamDialog, setOpenExamDialog] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  const handleEditExam = (exam) => {
    setSelectedExam(exam);
    setOpenExamDialog(true);
  };

  const handleExportReport = () => {
    // Xử lý xuất báo cáo
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Quản Lý Kỳ Thi</Typography>

      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          color="primary"
        >
          Tạo Kỳ Thi Mới
        </Button>
        <Button 
          variant="contained" 
          startIcon={<ExportIcon />}
          color="success"
          onClick={handleExportReport}
        >
          Xuất Báo Cáo
        </Button>
      </Box>

      <Typography variant="h5" sx={{ mb: 2 }}>Kỳ Thi Đang Diễn Ra</Typography>
      {examData.map(exam => (
        <Paper 
          key={exam.id} 
          elevation={3} 
          sx={{ 
            p: 2, 
            mb: 2, 
            borderLeft: '4px solid green',
            backgroundColor: 'green.50'
          }}
        >
          <Grid2 container alignItems="center" spacing={2}>
            <Grid2 item xs={8}>
              <Typography variant="h6">{exam.name}</Typography>
            </Grid2>
            <Grid2 item xs={4} container justifyContent="flex-end">
              <Button 
                startIcon={<EditIcon />} 
                onClick={() => handleEditExam(exam)}
                sx={{ mr: 1 }}
              >
                Sửa
              </Button>
              <Button 
                startIcon={<ReportIcon />}
              >
                Báo Cáo
              </Button>
            </Grid2>
          </Grid2>
        </Paper>
      ))}

      <Tabs 
        value={activeTab} 
        onChange={(e, newValue) => setActiveTab(newValue)}
        sx={{ mb: 2 }}
      >
        <Tab label="Lịch Sử Kỳ Thi" />
        <Tab label="Quản Lý Ca Thi" />
        <Tab label="Quản Lý Phòng Thi" />
      </Tabs>

      {activeTab === 0 && (
        <Box>
          {historicalExams.map(exam => (
            <Paper 
              key={exam.id} 
              elevation={1} 
              sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}
            >
              <Typography>{exam.name}</Typography>
              <Typography color="text.secondary">{exam.date}</Typography>
            </Paper>
          ))}
        </Box>
      )}

      <Dialog 
        open={openExamDialog} 
        onClose={() => setOpenExamDialog(false)}
        maxWidth="md"
      >
        <DialogTitle>
          {selectedExam ? `Chỉnh Sửa ${selectedExam.name}` : 'Tạo Kỳ Thi Mới'}
        </DialogTitle>
        <DialogContent>
          {/* Form chỉnh sửa kỳ thi */}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Setting;