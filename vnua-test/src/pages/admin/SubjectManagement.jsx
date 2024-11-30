import React from "react";
import MyAppBar from "../../components/admin/appbar/MyAppBar";
import { Avatar, Button, Card, CardContent, Chip, Grid2, IconButton, List, ListItem, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { green } from "@mui/material/colors";
import { BookmarkBorderOutlined, Delete, DeleteForever, EditAttributes, EditNote, EditRoad } from "@mui/icons-material";

const SubjectManagement = () => {

    const theme = useTheme();

    const orderItems = [
        { name: 'Giới thiệu tổng quan', qty: 1, bookMark: true },
        { name: 'Hệ điều hành là gì', qty: 1, bookMark: true },
        { name: 'Quản lý tiến trình', qty: 2, bookMark: true },
        { name: 'Lập lịch cho CPU', qty: 1, bookMark: true },
    ];

    const totalAmount = orderItems.reduce((total, item) => total + item.qty, 0);

    return (
        <div className="subjectManagement" style={{position: 'relative'}}>
            <div className="shadow-sm bg-white" style={{ position: 'sticky', top: 0, left: 0, right: 0, zIndex: 39 }}>
                <MyAppBar label={'Quản lý môn học'}/>
            </div>

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
            <Grid2 container spacing={{ xs: 2, md: 3 }} sx={{ml: 3, mr: 3, mt: 3, mb: 3}}>
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
            </Grid2>
        </div>
    );
}

export default SubjectManagement;