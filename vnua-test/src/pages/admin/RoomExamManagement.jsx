import MyAppBar from "../../components/admin/appbar/MyAppBar";

import React, { useState } from "react";
import {
  Typography,
  Box,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import { FcInfo, FcPlus } from "react-icons/fc";
import ExamRoomManagementTable from "../../components/admin/table/ExamRoomManagementTable";
import RoomManagement from "./RoomManagement";
import DialogAddRoom from "../../components/admin/dialog/DialogAddRoom";

const RoomExamManagement = () => {

  const [ isOpenDialogAddRoom, setIsOpenDialogAddRoom ] = useState(false);

  const handleCloseDialogAddRoom = () => setIsOpenDialogAddRoom(false);
  

  const handleOpenDialogAddRoom = () => setIsOpenDialogAddRoom(true);

  return (
    <Box>
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
