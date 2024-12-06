import MyAppBar from "../../components/admin/appbar/MyAppBar";

import React, { useState } from "react";
import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { FcCalendar } from "react-icons/fc";
import { FcAlarmClock } from "react-icons/fc";
import { FcHome } from "react-icons/fc";
import ExamManagementTable from "../../components/admin/table/ExamManagementTable";
import { FcPlus } from "react-icons/fc";
import DialogAddExam from "../../components/admin/dialog/DialogAddExam";

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
        rooms: [
          {
            id: 201,
            name: "Phòng A1",
            location: "Tầng 2, Nhà A",
            students: 45,
            supervisors: 2,
          },
        ],
      },
    ],
  },
];

const ExamManagement = () => {

    const [ isOpenDialogAddExam, setIsOpenDialogAddExam ] = useState(false);

    // Xử lý đóng dialog thêm mới kỳ thi
    const handleCloseDialogUploadFile = () => setIsOpenDialogAddExam(false);
    // Xử lý mở dialog thêm mới kỳ thi
    const handleOpenDialogUploadFile = () => setIsOpenDialogAddExam(true);
    

  return (
    <Box>
        <div
            className="shadow-sm bg-white"
            style={{ position: "sticky", top: 0, left: 0, right: 0, zIndex: 39 }}
        >
            <MyAppBar label={"Quản lý kỳ thi"} />
        </div>

        <Box sx={{mt: 1, mb: 3, display: 'flex', gap: 2, ml: 3, mr: 3}}>
            <Button 
                variant="contained" 
                startIcon={<FcPlus />}
                color="inherit"
                onClick={handleOpenDialogUploadFile}
            >
                <Typography variant="subtitle2" textTransform='capitalize'>
                    Tạo Kỳ Thi Mới  
                </Typography>
            </Button>
            <Button 
                variant="contained" 
                startIcon={<FcPlus />}
                color="success"
            >
            Xuất Báo Cáo
            </Button>
        </Box>

        {examData.map((exam) => (
            <Accordion
                key={exam.id}
                elevation={3} 
                sx={{ 
                p: 2, ml: 3, mr: 3, mt: 3, mb: 2, 
                borderLeft: exam.status === "open" ? "4px solid green" : "none",
                backgroundColor: 'green.50'
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                    backgroundColor:
                        exam.status === "open" ? "rgba(0, 255, 0, 0.1)" : "default",
                    }}
                >
                    <Box sx={{ mr: 1,}}>
                        <FcCalendar size='25px' />
                    </Box>
                    <Typography sx={{ width: "70%", flexShrink: 0 }}>
                        {exam.name}
                    </Typography>
                    {exam.status === "open" && (
                        <Chip label="Đang Mở" color="success" size="small" />
                    )}
                </AccordionSummary>
                <AccordionDetails>
                    {exam.shifts.map((shift) => (
                        <Accordion key={shift.id} sx={{ mb: 1 }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Box sx={{ mr: 1}}>
                                    <FcAlarmClock size='20px'/>
                                </Box>
                                <Typography sx={{ width: "70%", flexShrink: 0 }}>
                                    {shift.name} - {shift.time}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <List>
                                    {shift.rooms.map((room) => (
                                    <Accordion key={room.id}>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                            <Box sx={{ mr: 1 }}>
                                                <FcHome size='20px'/>
                                            </Box>
                                            <Typography>{room.name}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        <List>
                                            <ListItem>
                                            <ListItemText
                                                primary="Địa Điểm"
                                                secondary={room.location}
                                            />
                                            </ListItem>
                                            <ListItem>
                                            <ListItemText
                                                primary="Số Lượng Sinh Viên"
                                                secondary={room.students}
                                            />
                                            </ListItem>
                                            <ListItem>
                                            <ListItemText
                                                primary="Cán Bộ Coi Thi"
                                                secondary={room.supervisors}
                                            />
                                            </ListItem>
                                        </List>
                                        </AccordionDetails>
                                    </Accordion>
                                    ))}
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </AccordionDetails>
            </Accordion>
        ))}
        <ExamManagementTable title={"Danh sách kỳ thi đã hoàn thành"}/>

        {/* Dialog them moi ca thi */}
        <DialogAddExam isOpen={isOpenDialogAddExam} onClose={handleCloseDialogUploadFile} title={"Thêm mới kỳ thi"}/>
    </Box>
  );
};

export default ExamManagement;
