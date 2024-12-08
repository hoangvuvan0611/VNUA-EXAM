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
} from "@mui/icons-material";
import { FcCalendar, FcInfo, FcPlus } from "react-icons/fc";
import { FcHome } from "react-icons/fc";
import ExamRoomManagementTable from "../../components/admin/table/ExamRoomManagementTable";
import RoomManagement from "./RoomManagement";
import DialogAddRoom from "../../components/admin/dialog/DialogAddRoom";

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

const RoomExamManagement = () => {

  const [ isOpenDialogAddRoom, setIsOpenDialogAddRoom ] = useState(false);

  const handleCloseDialogAddRoom = () => setIsOpenDialogAddRoom(false);
  

  const handleOpenDialogAddRoom = () => setIsOpenDialogAddRoom(true);

  return (
    <Box>
      <div
          className="shadow-sm bg-white"
          style={{ position: "sticky", top: 0, left: 0, right: 0, zIndex: 39 }}
      >
          <MyAppBar label={"Quản lý phòng thi"} />
      </div>

      <Box sx={{mt: 1, mb: 3, display: 'flex', gap: 2, ml: 3, mr: 3}}>
          <Button 
              variant="contained" 
              startIcon={<FcPlus />}
              color="inherit"
              onClick={handleOpenDialogAddRoom}
          >
              <Typography variant="subtitle2" textTransform='capitalize'>
                  Tạo phòng Thi Mới  
              </Typography>
          </Button>
          <Tooltip title="Thông tin về phòng thi">
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

      <RoomManagement/>
      <ExamRoomManagementTable title={"Danh sách phòng thi đã hoàn thành"}/>
      
      {/* Dialog thêm mới phòng thi */}
      <DialogAddRoom open={isOpenDialogAddRoom} onClose={handleCloseDialogAddRoom} title={"Thêm mới phòng thi"}/>
    </Box>
  );
};

export default RoomExamManagement;
