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
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  EventNote as EventNoteIcon,
  Schedule as ScheduleIcon,
  MeetingRoom as MeetingRoomIcon,
} from "@mui/icons-material";
import { FcCalendar, FcInfo, FcPlus } from "react-icons/fc";
import { FcAlarmClock } from "react-icons/fc";
import { FcHome } from "react-icons/fc";
import ExamManagementTable from "../../components/admin/table/ExamManagementTable";
import PoetryManagementTable from "../../components/admin/table/PoetryManagementTable";

const examData = [
  {
    id: 101,
    name: "Ca Sáng",
    status: "open",
    time: "07:30 - 09:30",
    rooms: [
      {
        id: 5345,
        name: "Phòng A1",
        location: "Tầng 2, Nhà A",
        students: 45,
        supervisors: 2,
      },
      {
        id: 5332445,
        name: "Phòng A1",
        location: "Tầng 2, Nhà A",
        students: 45,
        supervisors: 2,
      },
    ],
  },
  {
    id: 101,
    name: "Ca Sáng",
    status: "waiting",
    time: "10:00 - 11:30",
    rooms: [
      {
        id: 243241,
        name: "Phòng A1",
        location: "Tầng 2, Nhà A",
        students: 45,
        supervisors: 2,
      },
      {
        id: 2034561,
        name: "Phòng A1",
        location: "Tầng 2, Nhà A",
        students: 45,
        supervisors: 2,
      },
    ],
  }
];

const PoetryManagement = () => {
  return (
    <Box>
        <Box sx={{mt: 1, mb: 3, display: 'flex', gap: 2, ml: 3, mr: 3}}>
            <Button 
                variant="contained" 
                startIcon={<FcPlus />}
                color="inherit"
            >
                <Typography variant="subtitle2" textTransform='capitalize'>
                    Tạo ca Thi Mới  
                </Typography>
            </Button>
            <Tooltip title="Thông tin về ca thi">
                <IconButton>
                    <FcInfo />
                </IconButton>
            </Tooltip>
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
                    backgroundColor: 'green.50',
                    borderRadius: '5px',
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                    backgroundColor: exam.status === "open" ? "rgba(0, 255, 0, 0.1)" : "default",}}
                >
                    <Box sx={{ mr: 1,}}>
                        <FcCalendar size='25px' />
                    </Box>
                    <Typography sx={{ width: "70%", flexShrink: 0 }}>
                        {exam.name}  {exam.time}
                    </Typography>
                    {exam.status === "open" && (
                        <Chip label="Đang diễn ra" color="success" size="small" />
                    )}
                    {exam.status === "waiting" && (
                        <Chip label="Sắp diễn ra" color="warning" size="small" />
                    )}
                </AccordionSummary>
                <AccordionDetails>
                    <List>
                        {exam.rooms.map((room) => (
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
        <PoetryManagementTable title={"Danh sách kỳ thi"}/>
    </Box>
  );
};

export default PoetryManagement;
