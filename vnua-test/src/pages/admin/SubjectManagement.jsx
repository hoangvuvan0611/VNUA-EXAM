import React, { useEffect, useState } from "react";
import MyAppBar from "../../components/admin/appbar/MyAppBar";
import { 
    Avatar, 
    Box, 
    Button, 
    Card, 
    Chip,  
    IconButton, 
    styled, 
    Tooltip, 
    Typography 
} from "@mui/material";
import { FcAnswers, FcCommandLine, FcEngineering, FcVoicePresentation } from "react-icons/fc";
import DialogAddSubject from "../../components/admin/dialog/DialogAddSubject";
import api from "../../services/api/axios.config";
import { ToastContainer, toast } from "react-toastify";
import { FcLock } from "react-icons/fc";

const StyledCard = styled(Card)(({ theme }) => ({
    border: '3px solid transparent',
    transition: 'border-color 0.3s',
    '&:hover': {
      borderColor: '#2E8B57', // Màu viền khi hover
    },
  }));
  

const SubjectManagement = () => {

    // const theme = useTheme();
    const [ subjectList, setSubjectList ] = useState([]);
    const [ isOpenDialogAddSubject, setIsOpenDialogAddSubject ] = useState(false);
    const [ isOpenDialogAddTeacher, setIsOpenDialogAddTeacher ] = useState(false);

    const handleCloseDialogAddSubject = () => setIsOpenDialogAddSubject(false);

    const handleOpenDialogAddSubject = () => setIsOpenDialogAddSubject(true);

    // Lấy danh sách môn học
    const fetchInitData = async () => {
        try {
            const response = await api.get(
                `/subject/getListToShow/userId=`
            );  

            console.log(response)
            if (response.data.success === false) {
                toast.error(`Lỗi khi tạo lấy danh sách môn học: ${response.data.message}`);
            } 
            setSubjectList(response.data.dataList)
        } catch (error) {
            toast.warning("Hệ thống đang gặp sự cố, vui lòng thử lại sau!", {
                icon: "⚠️",
            });
            console.log(error)
        }
    }

    useEffect(() => {
        fetchInitData();
    }, []);

    return (
        <Box className="subjectManagement" style={{position: 'relative'}}>
            <ToastContainer icon={true} />

            <Box sx={{ml: 3, mr: 3, mt: 3}}>
                <Button
                    variant="contained"
                    onClick={handleOpenDialogAddSubject}
                >
                    Thêm mới môn học
                </Button>
            </Box>

            {/* Danh sách môn học */}
            <Box sx={{ml: 3, mr: 3, mt: 3}}>
                {subjectList.map((subject, index) => (
                    <StyledCard 
                        sx={{pl: 4, pr: 4, pt: 2, pb: 2, mb: 2, borderRadius: '10px', 
                            '&:hover': {
                                borderCollapse: 'green',
                            },
                        }} 
                        key={index}
                    >
                        <Box display='flex' justifyContent='space-between' alignItems={'center'}>
                            <Box display='flex' alignItems={'center'} sx={{width: '30%'}}>
                                <Avatar 
                                    variant="rounded"
                                    sx={{bgcolor: `#F0F0F0`, width: '60px', height: '60px'}}
                                ><FcCommandLine size={50} /></Avatar>
                                <Box sx={{ml: 3, mr: 4}}>
                                    <Typography
                                        variant="h6"
                                    >
                                        {subject.subjectName}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                    >
                                        Mã môn học: {subject.subjectCode}
                                    </Typography>
                                    <Box>
                                        <Tooltip title="Quyền quản trị môn học">
                                            <Chip
                                                key={index}
                                                label={subject.createdUser}
                                            
                                                sx={{backgroundColor: '#A8E6CF', borderRadius: '5px', color:"green", fontWeight: 'bold'}}
                                            />
                                        </Tooltip>
                                    </Box>
                                    
                                </Box>
                            </Box>

                            <Box sx={{width: '20%'}}>
                                <Typography>
                                    Số chương:
                                </Typography>
                                <Typography>
                                    Số câu hỏi:
                                </Typography>
                                <Typography>
                                    Số lượng đề:
                                </Typography>
                            </Box>

                            <Box>
                                <Box display={'flex'}>
                                    <Tooltip title="Chỉnh sửa môn học">
                                        <IconButton>
                                            <FcEngineering />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Xem chi tiết môn học">
                                        <IconButton>
                                            <FcAnswers />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Thêm mới giảng viên cho môn học">
                                        <IconButton>
                                            <FcVoicePresentation />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Khóa môn học">
                                        <IconButton>
                                            <FcLock />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                <Typography
                                    variant="body2"
                                >
                                   Người tạo: {subject.createdUser}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="info"
                                >
                                   Ngày tạo: {new Date(subject.createdAt).toLocaleString()}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="info"
                                >
                                  Cập nhật cuối: {new Date(subject.updatedAt).toLocaleString()}
                                </Typography>
                            </Box>

                        </Box>
                    </StyledCard>
                ))}
            </Box>

            {/* Dialog them moi giang vien cho mon hoc */}

            {/* Dialog them moi mon hoc */}
            <DialogAddSubject 
                open={isOpenDialogAddSubject} 
                onClose={handleCloseDialogAddSubject} 
                title={"Thêm mới môn học"}
                refreshData={fetchInitData}
            />


            {/* Welcome Section */}
            {/* <Grid2 sx={{ bgcolor: theme.palette.mode === 'dark' ? 'rgb(100, 150, 230)' : 'rgb(100, 150, 230)', height: 200, borderRadius: 2, p: 3, display: 'flex', 
                alignItems: 'center', mt: 2, mb: 4, position: 'relative', ml: 3, mr: 3 }}>
                <Grid2 sx={{marginLeft: 10, xs: 12, md: 3}}>
                    <Typography variant="h4" fontWeight="bold" color="white">Học</Typography>
                    <Typography variant="subtitle1" color="white">Học hỏi là cách duy nhất để vượt qua giới hạn của bản thân.</Typography>
                    <Typography variant="subtitle2" color="white">Học không chỉ để biết, mà còn để làm.</Typography>
                    <br/>
                    <Button variant="contained" size="small" color="primary">
                        Thêm mới môn học
                    </Button>
                </Grid2>
                <Grid2 component="img" src={logoSubject} alt="Illustration" className="sm-hide"
                sx={{ width: 220, marginLeft: 'auto', position: '', right: 10, xs: 12, md: 6, marginRight: 10}}/>
            </Grid2> */}

            {/* Subject Card session */}
            {/* <Grid2 container spacing={{ xs: 2, md: 3 }} sx={{ml: 3, mr: 3, mt: 3, mb: 3}}>
                {Array.from(Array(6)).map((_, index) => (
                    <Grid2 key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 3}}>
                        <Card sx={{borderRadius: 2, boxShadow: 3, padding: 0}}>
                            <CardContent>
                                <Grid2 container justifyContent="space-between" alignItems="center">
                                    <Grid2 size={3}>
                                        <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
                                            VV
                                        </Avatar>
                                    </Grid2>
                                    <Grid2 size={9}>
                                        <Typography variant="h6" textTransform={'capitalize'}>
                                            Nguyên Lý Hệ Điều Hành
                                        </Typography>
                                    </Grid2>
                                </Grid2>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                Wed, July 12, 2023
                                </Typography>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                        <TableCell>Chương</TableCell>
                                        <TableCell align="center">Câu hỏi</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orderItems.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell align="center">{item.qty}</TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow >
                                            <TableCell >Total</TableCell>
                                            <TableCell align="right">${totalAmount}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>

                                <Grid2 container alignItems={'center'} justifyContent={'space-around'}  sx={{ mt: 1 }}>
                                    <Grid2 item xs={6}>
                                        <Button variant="contained" fullWidth>
                                        Xem chi tiết
                                        </Button>
                                    </Grid2>
                                    <Grid2 item xs={6}>
                                        <List>
                                            <ListItem>
                                                <Tooltip title="Sửa">
                                                    <IconButton>
                                                        <EditNote color="secondary"/>
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Xóa">
                                                    <IconButton>
                                                        <Delete color="error"/>
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Yêu thích">
                                                    <IconButton>
                                                        <BookmarkBorderOutlined color="success"/>
                                                    </IconButton>
                                                </Tooltip>
                                            </ListItem>
                                        </List>
                                    </Grid2>
                                </Grid2>
                            </CardContent>
                        </Card>
                    </Grid2>
                ))}
            </Grid2> */}
        </Box>
    );
}

export default SubjectManagement;