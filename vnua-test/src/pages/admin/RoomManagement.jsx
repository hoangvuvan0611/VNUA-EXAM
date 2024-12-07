import React from "react";
import { Box, Typography, Card, CardContent, Chip, IconButton, Stack, Grid2, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { FcEditImage, FcFrame, FcFullTrash, FcHeatMap } from "react-icons/fc";

// Danh sách phòng thi mẫu
const rooms = [
  { id: 1, name: "Phòng 101", status: "Đang diễn ra", type: "active", color: "#2E8B57" },
  { id: 2, name: "Phòng 102", status: "Sắp diễn ra", type: "upcoming", color: "orange" },
  { id: 3, name: "Phòng 103", status: "Tạm hoãn", type: "paused", color: "red" },
  { id: 4, name: "Phòng 104ẻger", status: "Đang diễn ra", type: "active", color: "#2E8B57" },
  { id: 7, name: "Phòng 104ẻtdfgdgdfgdfghaonglsdfjkdhsfkj", status: "Đang diễn ra", type: "active", color: "#2E8B57" },
  { id: 8, name: "Phòng 104dfgdg", status: "Đang diễn ra", type: "active", color: "#2E8B57" },
  { id: 9, name: "Phòng 104dfgdfgdfg", status: "Đang diễn ra", type: "active", color: "#2E8B57" },
  { id: 10, name: "Phòng 104", status: "Đang diễn ra", type: "active", color: "#2E8B57" },
  { id: 11, name: "Phòng 104dfgdfgdfg", status: "Đang diễn ra", type: "active", color: "#2E8B57" },
  { id: 5, name: "Phòng 105", status: "Sắp diễn ra", type: "upcoming", color: "orange" },
  { id: 6, name: "Phòng 106dfgdgdfg", status: "Gặp sự cố", type: "paused", color: "red" },
];

// Hàm phân loại phòng theo loại
const groupRoomsByType = (rooms) => {
  const grouped = {
    active: [],
    upcoming: [],
    paused: [],
  };
  rooms.forEach((room) => {
    grouped[room.type].push(room);
  });
  return grouped;
};

const RoomManagement = () => {
  const groupedRooms = groupRoomsByType(rooms);

  const renderRoomSection = (title, rooms) => (
    <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" gutterBottom>
        {title}
        </Typography>
        <Grid2 container spacing={3} xs={12}>
            {rooms.map((room) => (
            <Grid2 item xs={12} width={200} sm={6} md={4} key={room.id}>
                <Card
                    sx={{
                    boxShadow: 8,
                    borderRadius: "20px",
                    position: "relative",
                    overflow: "hidden",
                    transform: "scale(1.05)",
                    transition: "transform 0.3s ease-in-out",
                    height: "100%", // Đảm bảo chiều cao đầy đủ
                    width: "100%", // Đảm bảo chiều rộng đầy đủ
                    display: "flex", // Sử dụng flexbox
                    flexDirection: "column", // Sắp xếp theo chiều dọc
                    ":hover": {
                        transform: "scale(1.1)",
                    },
                    "::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: `linear-gradient(to bottom, ${room.color} 80%, transparent 80%)`,
                        zIndex: 1,
                        pointerEvents: "none",
                        borderRadius: "20px",
                    }
                    }}
                >
                    <CardContent 
                    sx={{ 
                        position: "relative", 
                        zIndex: 2, 
                        flexGrow: 1, // Cho phép nội dung card tự động mở rộng
                        display: "flex", 
                        flexDirection: "column",
                        width: "100%", // Đảm bảo nội dung chiếm toàn bộ chiều rộng
                        p: 2 // Thêm padding nếu cần
                    }}
                    >
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#fff", width: "100%", overflow: 'visible' }}>
                        {room.name}
                    </Typography>
                    <Typography sx={{ width: "100%" }}>Số thí sinh: </Typography>
                    <Typography sx={{ width: "100%" }}>Giám thị: </Typography>
                    <Chip
                        label={room.status}
                        sx={{
                        mt: 1,
                        color: "#fff",
                        backgroundColor: room.color,
                        width: "100%", // Nếu muốn chip chiếm toàn bộ chiều rộng
                        alignSelf: "center", // Căn giữa chip
                        }}
                    />
                    <Stack 
                        direction="row" 
                        spacing={1} 
                        sx={{ 
                        mt: "auto", // Đẩy các nút xuống dưới cùng
                        justifyContent: 'center',
                        width: "100%" // Đảm bảo stack chiếm toàn bộ chiều rộng
                        }}
                    >
                        <Tooltip title="Xem chi tiết">
                        <IconButton color="primary" title="Xem chi tiết">
                            <FcFrame/>
                        </IconButton>
                        </Tooltip>
                        <Tooltip title="Chỉnh sửa">
                        <IconButton color="secondary" title="Chỉnh sửa">
                            <FcEditImage />
                        </IconButton>
                        </Tooltip>
                        <Tooltip title="Vô hiệu hoá phòng thi">
                        <IconButton color="error" title="Vô hiệu hoá">
                            <FcFullTrash />
                        </IconButton>
                        </Tooltip>
                    </Stack>
                    </CardContent>
                </Card>
            </Grid2>
            ))}
        </Grid2>
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      {renderRoomSection("Phòng thi đang diễn ra", groupedRooms.active)}
      {renderRoomSection("Phòng thi sắp diễn ra", groupedRooms.upcoming)}
      {renderRoomSection("Phòng thi tạm hoãn hoặc gặp sự cố", groupedRooms.paused)}
    </Box>
  );
};

export default RoomManagement;
