import { useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid2, IconButton, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import { FcFullTrash, FcPlus, FcSupport } from "react-icons/fc";
import { LazyLoadImage } from "react-lazy-load-image-component";

const DialogAddExamPaper = ({open, onClose, title}) => {

    const [ errors, setErrors ] = useState({});
    const [ questionList, setQuesionList ] = useState([]);
    const [ subjectList, setSubjectList ] = useState([]); // Danh sách môn học được lựa chọn
    const [ subjectSelected, setSubjectSelected ] = useState([]); // Môn học được lựa chọn
    const [ newExamPaper, setNewExamPaper ] = useState({
        examPaperName: "",
        timeDuration: "",
        subjectId: "",
        questionList: [],
    });

    // Xử lý đóng dialog
    const handleCloseDialog = () => {
        onClose();
    }

    // Xử lý khi nhập input đề thi 
    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setNewExamPaper((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Xử lý chọn môn học
    const handleSubjectSelectedChange = (event) => {
        setSubjectSelected(event.target.value);
    };



    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={"lg"}
            fullWidth
            sx={{ "& .MuiDialog-paper": { borderRadius: "15px" } }}
        >
            <DialogTitle alignItems="center" display={"flex"}>
                <FcPlus />
                <Typography variant="h6" ml={1}>
                    {title}
                </Typography>
            </DialogTitle>

            {/* Phần nội dung thêm mới đề thi */}
            <DialogContent>
                <Grid2 container spacing={2} size={{sx: 12}}>
                    {/* Form nhập thông tin */}
                    <Grid2 item component='form' size={{ xs: 12, md: 3}} >
                        <Box sx={{mb: 1.5}}>
                            <TextField
                                required
                                fullWidth
                                label="Tên đề thi"
                                name="roomName"
                                value={newExamPaper.examPaperName}
                                onChange={handleInputChange}
                                error={!!errors.examPaperName}
                                helperText={errors.examPaperName}
                                variant="filled"
                                margin="none"
                                size="small"
                                InputLabelProps={{
                                    sx: {
                                    fontSize: '0.9rem',  // Kích thước nhỏ
                                    color: 'gray',       // Màu sắc thông thường
                                        '&.Mui-focused': {
                                            fontSize: '1rem',  // Kích thước khi label được focus
                                        },
                                    },
                                }}
                            />
                        </Box>
                        <Box sx={{mb: 1.5}}>
                            <TextField
                                required
                                fullWidth
                                type="number"
                                label="Thời gian thi (phút)"
                                name="timeDuration"
                                value={newExamPaper.timeDuration}
                                onChange={handleInputChange}
                                error={!!errors.timeDuration}
                                helperText={errors.timeDuration}
                                variant="filled"
                                margin="none"
                                size="small"
                                InputLabelProps={{
                                    sx: {
                                    fontSize: '0.9rem',  // Kích thước nhỏ
                                    color: 'gray',       // Màu sắc thông thường
                                        '&.Mui-focused': {
                                            fontSize: '1rem',  // Kích thước khi label được focus
                                        },
                                    },
                                }}
                            />
                        </Box>
                        <Box sx={{mb: 1.5}}>
                            <TextField
                                required
                                fullWidth
                                type="number"
                                label="Thời gian thi (phút)"
                                name="timeDuration"
                                value={newExamPaper.timeDuration}
                                onChange={handleInputChange}
                                error={!!errors.timeDuration}
                                helperText={errors.timeDuration}
                                variant="filled"
                                margin="none"
                                size="small"
                                InputLabelProps={{
                                    sx: {
                                    fontSize: '0.9rem',  // Kích thước nhỏ
                                    color: 'gray',       // Màu sắc thông thường
                                        '&.Mui-focused': {
                                            fontSize: '1rem',  // Kích thước khi label được focus
                                        },
                                    },
                                }}
                            />
                        </Box>
                        {/* Dropdown chọn môn học */}
                        <Box sx={{mb: 1.5}}>
                            <FormControl variant="filled" sx={{}} fullWidth>
                                <InputLabel sx={{fontSize: '0.9rem'}} required id="subject-select-label">Môn học</InputLabel>
                                <Select
                                    required
                                    fullWidth
                                    labelId="subject-select-label"
                                    id="subject-simple-select"
                                    placeholder="Chọn môn học"
                                    value={subjectSelected}
                                    label="Age"
                                    variant="filled"
                                    size="small"
                                    onChange={handleSubjectSelectedChange}
                                >
                                    <MenuItem value={10}>Nguyên lý hệ điều hành</MenuItem>
                                    <MenuItem value={20}>Xác suất thống kê</MenuItem>
                                    <MenuItem value={30}>Mạng máy tính</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid2>

                    {/* Bảng hiện danh sách câu hỏi để thêm mới đề thi */}
                    <Grid2 item component='form' size={{ xs: 12, md: 9}} >
                        <Typography variant="inherit" gutterBottom fontWeight={"bold"}>
                                Danh sách câu hỏi của môn học: {subjectSelected}
                        </Typography>
                        <TableContainer component={Paper} variant="outlined" sx={{maxHeight: '70%', overflowY: "auto"}}>
                            <Table size="small" aria-label="sticky table" stickyHeader>
                                <TableHead>
                                    <TableRow>
                                    <TableCell>STT</TableCell>
                                    <TableCell>Nội dung</TableCell>
                                    <TableCell>Chương</TableCell>
                                    <TableCell>Loại câu hỏi</TableCell>
                                    <TableCell>Mức độ</TableCell>
                                    <TableCell align="center">Thao tác</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {questionList.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} align="center" >
                                                Môn học chưa có câu hỏi hoặc chưa chọn môn học!
                                            </TableCell>
                                        </TableRow>
                                        ) 
                                        : (
                                        
                                            questionList.map((student, index) => (
                                                <TableRow 
                                                    key={student.id} 
                                                    hover
                                                    // onClick={() => handleRowClick(student)}
                                                    // sx={{ cursor: 'pointer' }}
                                                    // selected={isEditing && newStudent.id === student.id}
                                                >
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{student.studentCode}</TableCell>
                                                <TableCell>{student.name}</TableCell>
                                                <TableCell>{student.className}</TableCell>
                                                <TableCell>{student.dateOfBirth}</TableCell>
                                                <TableCell>{student.address}</TableCell>
                                                <TableCell align="center">
                                                    <Tooltip title="Xóa">
                                                        <IconButton
                                                            size="small"
                                                            color="error"
                                                            onClick={(e) => {}}
                                                        >
                                                            <FcFullTrash fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Sửa">
                                                        <IconButton 
                                                            size="small" 
                                                            onClick={(e) => {
                                                                setErrors({});
                                                            }}
                                                        >
                                                            <FcSupport fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                                </TableRow>
                                            ))
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
              {/* <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={students.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelRowsPerPage="Số hàng mỗi trang"
                  labelDisplayedRows={({ from, to, count }) => `${from} - ${to} trong tổng số ${count} sinh viên ,  Trang ${page + 1} trên ${Math.ceil(students.length / rowsPerPage)}`}
              />
              <Divider sx={{ mb: 2 }} /> */}
                    </Grid2>
                </Grid2>
            </DialogContent>

            {/* Button thao tác lưu, đóng */}
            <DialogActions sx={{justifyContent: 'center'}}>
                <Button
                    color="success"
                    variant="contained"
                    sx={{ mr: 2, mb: 2, textTransform: 'capitalize' }}
                    size="medium"
                >
                    Lưu đề thi
                </Button>
                <Button
                    onClick={handleCloseDialog}
                    color="primary"
                    variant="contained"
                    sx={{ mr: 2, mb: 2, textTransform: 'capitalize'}}
                    size="medium"
                >
                    Hủy
                </Button>
            </DialogActions>

        </Dialog>
    );
}

export default DialogAddExamPaper;