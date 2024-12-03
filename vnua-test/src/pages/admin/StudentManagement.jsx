import React, { useState } from "react";
import MyAppBar from "../../components/admin/appbar/MyAppBar";
import EnhancedTable from "./student/EnhancedTable";

import { 
    Box, 
    Typography, 
    TextField, 
    IconButton, 
    Card, 
    Stack, 
    AvatarGroup, 
    Avatar,
    Button,
    Grid2,
    Tooltip,
} from "@mui/material";

import {
    Add as AddIcon,
    FileUpload as FileUploadIcon,
    EditNote,
} from '@mui/icons-material';

import { useTheme } from '@mui/material/styles';
import DialogUploadFile from "../../components/admin/dialog/DialogUploadFile";
import DialogAddNew from "../../components/admin/dialog/DialogAddNew";

function createData(studentCode, name, classOfStudent, dateOfBirth, lastAction) {
    return {
        studentCode,
        name,
        classOfStudent,
        dateOfBirth,
        lastAction,
    };
}

const StudentManagement = () => {

    const theme = useTheme();

    // State cho dialog thêm mới câu hỏi từ file
    const [ openDialogUploadFile, setOpenDialogUploadFile ] = useState(false);
    const [ openDialogAddStudent, setOpenDialogAddStudent ] = useState()
    const [ selectedFile, setSelectedFile ] = useState(null);

    // Xử lý mở dialog thêm mới sinh viên
    const handleOpenDialogAddStudent = () => setOpenDialogAddStudent(true);

    const handleCloseDialogAddStudent = () => {
        setOpenDialogAddStudent(false);
    }

    // Xử lý mở dialog upload file
    const handleOpenDialogUploadFile = () => setOpenDialogUploadFile(true);

    // Xử lý khi đóng hộp thoại upload file
    const handleCloseDialogUploadFile = () => {
        setOpenDialogUploadFile(false);
        // Đặt lại giá trị của file khi đóng hộp thoại
        setSelectedFile(null);
        console.log(selectedFile)
    }

    return (
        <Box className="" style={{position: 'relative'}}>
            <div className="shadow-sm bg-white" style={{ position: 'sticky', top: 0, left: 0, right: 0, zIndex: 39 }}>
                <MyAppBar label={'Quản lý sinh viên, lớp'}/>
            </div>

            {/* Classes Section */}
            <Box sx={{ml: 3, mr: 3, mt: 2 }}>
                <Box justifyContent={'space-between'} alignItems="center" display={'flex'} sx={{mb: 2}}>
                    <Box alignItems="center">
                        <Typography variant="h6" fontWeight="bold" color="grey">
                            Lớp học
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => handleOpenDialogAddStudent()}
                        sx={{textTransform: 'none'}}
                    >
                        Thêm mới lớp
                    </Button>
                </Box>
                <Box display="flex" gap={2} mb={4}>
                    {['English - UNIT III', 'English - UNIT II', 'UNIT I', 'dfsdf'].map((unit, index) => (
                    <Card key={index} 
                        variant="outlined" 
                        sx={{flex: 1, p: 2, borderRadius: '12px', boxShadow: 1, boxShadow: '8px 8px 1px 0px rgba(128, 90, 213, 0.2)'}}
                    >
                        <Typography variant="h6">{unit}</Typography>
                        <Stack direction="row" spacing={1} mt={1} alignItems="center">
                            <AvatarGroup images={["img1_url", "img2_url"]} />
                        </Stack>
                        <Typography variant="body2" color="textSecondary">
                            45 sinh viên
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Giảng viên: Nguyễn Văn A
                        </Typography>
                        <Grid2 container justifyContent={'space-between'} sx={{mt: 1, mb: 1}}>
                            <Button variant="text" color="info">
                                xem danh sách
                            </Button>
                            <Tooltip title="Sửa">
                                <IconButton>
                                    <EditNote color="action" sx={{":hover": {color: 'Highlight'}}}/>
                                </IconButton>
                            </Tooltip>
                        </Grid2>
                        <AvatarGroup max={4}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ bgcolor: 'red'}} />
                            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" sx={{ bgcolor: 'blue'}} />
                            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" sx={{ bgcolor: 'green'}} />
                            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" sx={{ bgcolor: 'red'}} />
                            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" sx={{ bgcolor: 'red'}} />
                        </AvatarGroup>
                    </Card>
                    ))}
                </Box>
            </Box>

            {/* Search and Date Section */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} mt={2} sx={{ml: 3, mr: 3 }}>
                <Box display="flex" alignItems="center" sx={{ borderRadius: '8px' }}>
                    <IconButton sx={{ bgcolor: '#e0f1ff', borderRadius: '10px'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                            <path d="M14 14L16.5 16.5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                            <path d="M16.4333 18.5252C15.8556 17.9475 15.8556 17.0109 16.4333 16.4333C17.0109 15.8556 17.9475 15.8556 18.5252 16.4333L21.5667 19.4748C22.1444 20.0525 22.1444 20.9891 21.5667 21.5667C20.9891 22.1444 20.0525 22.1444 19.4748 21.5667L16.4333 18.5252Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M16 9C16 5.13401 12.866 2 9 2C5.13401 2 2 5.13401 2 9C2 12.866 5.13401 16 9 16C12.866 16 16 12.866 16 9Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                        </svg>
                    </IconButton>
                    <TextField
                        variant="standard"
                        placeholder="Nhập mã hoặc tên sinh viên"
                        InputProps={{ disableUnderline: true }}
                        sx={{ pl: 4, pr: 2, width: 250, }}
                    />
                </Box>
                <Typography variant="body2" color="textSecondary">
                <Grid2 container spacing={1}>
                    <Grid2 item>
                        <Button
                            fullWidth
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => handleOpenDialogAddStudent()}
                            sx={{textTransform: 'none'}}
                        >
                            Thêm mới sinh viên
                        </Button>
                    </Grid2>
                    <Grid2>
                        <Button
                            fullWidth
                            variant="contained"
                            startIcon={<FileUploadIcon />}
                            onClick={() => handleOpenDialogUploadFile()}
                            sx={{textTransform: 'none'}}
                        >
                            Tải lên file danh sách sinh viên
                        </Button>
                    </Grid2>
                </Grid2>
                </Typography>
            </Box>

            {/* Lessons Section */}
            <Box sx={{ml: 3, mr: 3 }}>
                <EnhancedTable/>
            </Box>
            <DialogUploadFile open={openDialogUploadFile} onClose={handleCloseDialogUploadFile} title={"Tải lên file danh sách sinh viên"}/>

            {/* Dialog them moi sinh vien */}
            <DialogAddNew open={openDialogAddStudent} onClose={handleCloseDialogAddStudent} title={"Thêm mới sinh viên"}/>
        </Box>
    );
}

export default StudentManagement;