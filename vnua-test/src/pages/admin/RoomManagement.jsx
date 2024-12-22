import React, { useEffect, useState } from "react";
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Chip, 
  IconButton, 
  Stack, 
  Grid2, 
  Tooltip 
} from "@mui/material";
import { FcEditImage, FcFrame, FcFullTrash, FcHeatMap } from "react-icons/fc";
import api from "../../services/api/axios.config";
import { toast, ToastContainer } from "react-toastify";

const statusColor = {
  ACTIVE: "#2E8B57",
  WAITING: "#e7ce50",
};

const stateSpecial = {
  ACTIVE: "Đang diễn ra",
  WAITING: "Đang chờ"
}

const RoomManagement = () => {

  const [ roomExam, setRoomExam ] = useState([]);
  const [ groupedRooms, setGroupedRooms ] = useState([]);

  // Hàm lấy màu theo trạng thái
  const getColorByState = (state) => {
    return statusColor[state] || "gray";
  }

  // Lấy trạng thái tiếng việt
  const getSpecialState = (state) => {
    return stateSpecial[state] || "";
  } 

  // Hàm phân loại phòng theo loại
  const groupRoomsByType = (rooms) => {
    const grouped = {
      ACTIVE: [],
      WAITING: [],
      UNKNOWN: [],
    };
    rooms?.forEach((room) => {
      const state = room?.state || 'UNKNOWN';
      if (!grouped[state]) {
        grouped[state] = []; // Khởi tạo nếu chưa tồn tại
      }
      grouped[state].push(room);
    });
    return grouped;
  };

  const renderRoomSection = (title, rooms) => (
    <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" gutterBottom>
        {title}: {rooms?.length} 
        </Typography>
        <Grid2 container spacing={3}>
          {rooms?.map((room) => (
            <Grid2 item xs={12} sm={6} md={4} lg={3} key={room.id}>
              <Card
                sx={{
                  height: '100%',
                  minHeight: '200px', // Set minimum height
                  borderRadius: 4,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.03)',
                  },
                  boxShadow: 3,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: '20%',
                    bgcolor: getColorByState(room.state),
                    background: (theme) => `linear-gradient(to bottom, ${getColorByState(room.state)} 0%,  100%)`,
                  }}
                />
                
                <CardContent 
                  sx={{ 
                    position: 'relative', 
                    zIndex: 1, 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 3, // Consistent padding
                  }}
                >
                  {/* Content Section */}
                  <Box sx={{ mb: 'auto' }}>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        color: 'white',
                        fontWeight: 'bold',
                        mb: 1,
                        overflow: 'visible',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {room.roomExamName??"(Phòng thi...)"}
                    </Typography>
                    
                    <Stack spacing={1} sx={{ mb: 2 }}>
                      <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.875rem' }}>
                        Địa điểm: {room.address}
                      </Typography>
                      <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.875rem' }}>
                        Giám thị: {room.supervisoryList}
                      </Typography>
                      <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.875rem' }}>
                        Số lượng thí sinh: {room.studentNum}
                      </Typography>
                      <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.875rem' }}>
                        Thời gian thi: {room.timeDuration} (phút)
                      </Typography>
                    </Stack>

                    <Chip
                      label={getSpecialState(room.state)}
                      sx={{
                        width: '100%',
                        bgcolor: 'rgba(255,255,255,0.15)',
                        color: 'white',
                        mb: 2,
                        '&:hover': {
                          bgcolor: 'rgba(255,255,255,0.25)',
                        }
                      }}
                    />
                  </Box>

                  {/* Fixed Position Footer Section */}
                  <Box 
                    sx={{
                      mt: 'auto',
                      pt: 2,
                      borderTop: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    <Stack 
                      direction="row" 
                      spacing={1} 
                      justifyContent="center"
                      sx={{ mb: 2 }}
                    >
                      <Tooltip title="Xem chi tiết">
                        <IconButton 
                          sx={{ 
                            bgcolor: 'rgba(255,255,255,0.1)',
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
                          }}
                        >
                          <FcFrame />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Chỉnh sửa">
                        <IconButton 
                          sx={{ 
                            bgcolor: 'rgba(255,255,255,0.1)',
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
                          }}
                        >
                          <FcEditImage />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Vô hiệu hoá phòng thi">
                        <IconButton 
                          sx={{ 
                            bgcolor: 'rgba(255,255,255,0.1)',
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
                          }}
                        >
                          <FcFullTrash />
                        </IconButton>
                      </Tooltip>
                    </Stack>

                    <Typography 
                      variant="caption" 
                      sx={{ 
                        display: 'block',
                        color: 'text.secondary',
                      }}
                    >
                      Tạo lúc: {new Date(room.createdAt).toLocaleString()}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        display: 'block',
                        color: 'text.secondary',
                      }}
                    >
                      Người tạo: {room.createdUser}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
    </Box>
  );

  const fetchInitDataRoom = async () => {
    try {
      const response = await api.get(`/roomExam/roomExams`);
      
      if (response.data.success === false) {
        toast.warning(`Lỗi!, ${response.data.message}`, {
            icon: "⚠️",
        });
        return;
      }
      console.log(response.data.dataList)
      setGroupedRooms(groupRoomsByType(response.data.dataList));
    } catch (error) {
      console.log(error);
      toast.warning("Hệ thống đang gặp sự cố, vui lòng thử lại sau!", {
          icon: "⚠️",
      });
    }
  };

  useEffect(() => {
      fetchInitDataRoom();
  },[]);

  return (
    <Box sx={{ p: 3 }}>
      <ToastContainer icon={true} />
      {renderRoomSection("Phòng thi đang diễn ra", groupedRooms?.ACTIVE)}
      {renderRoomSection("Phòng thi sắp diễn ra", groupedRooms?.WAITING)}
      {renderRoomSection("Phòng thi tạm hoãn hoặc gặp sự cố", groupedRooms?.paused)}
    </Box>
  );
};

export default RoomManagement;
