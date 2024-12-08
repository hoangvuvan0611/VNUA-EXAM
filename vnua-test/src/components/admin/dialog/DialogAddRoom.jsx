import React, { useState, useEffect } from "react";
import { Autocomplete, Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid2, IconButton, InputLabel, keyframes, LinearProgress, List, ListItem, ListItemIcon, ListItemText, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import { FcFullTrash, FcHighPriority, FcPlus, FcRules, FcSupport } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import api from "../../../services/api/axios.config";
import { LazyLoadImage } from "react-lazy-load-image-component";
import examImage from '../../../assets/images/backgrounds/Exams-bro.svg';
import { v4 as uuidv4 } from 'uuid';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import styled from "@emotion/styled";

import {
    CloudUpload as CloudUploadIcon,
    CheckCircleOutline,
    ErrorOutline,
    Article,
} from '@mui/icons-material';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// Style component vùng upload
const UploadBox = styled(Box)(({ theme }) => ({
    border: `2px dashed ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(3),
    backgroundColor: 'rgba(1, 115, 234, 0.1)',
    textAlign: 'center',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));

const DialogAddRoom = ({open, onClose, title}) => {

    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [questions, setQuestions] = useState([]);
    const allowedFileTypes = ['.xls', '.xlsx', '.json', '.csv']; // Danh sách loại file được hỗ trợ

    const [ errors, setErrors ] = useState({});
    const [ listUserData, setListUserData ] = useState([]); // Danh sách cán bộ coi thi
    const [ subjectList, setSubjectList ] = useState([]); // Danh sách môn học để chọn đề
    const [ subjectSelected, setSubjectSelected ] = useState([]); // Môn học được lựa chọn
    const [ typeAddStudent, setTpeAddStudent ] = useState(0); // Trạng thái cho loại thêm sinh viên, 0 là không hiện, 1 là nhập từng sinh viên, 2 là thêm từ file
    const [ examSet, setExamSet ] = useState([]); // Danh sách đề hoặc bộ đề
    const [ isEditing, setIsEditing ] = useState(false); // trạng thái update sinh viên trong dang sách
    const [ newStudent, setNewStudent ] = useState({ // Đối tượng sinhg viên thêm mới
        id: "",
        studentCode: "",
        name: "",
        className: "",
        dateOfBirth: "",
        address: "",
    });
    const [ newRoom, setNewRoom ] = useState({
        roomName: "",
        roomAddress: "",
        timeDuration: "",
        supervisoryList: [],
        studentList: [],
        examPaperList: [],
    });

    // CSS hiệu ứng tải file
    const uploadAnimation = keyframes`
        0% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-0.5rem);
        }
        100% {
            transform: translateY(0);
        }
    `;

    // Xử lý đóng Dialog
    const handleCloseDialog = () => { 
        onClose();
        setIsEditing(false);
    };

    // Xử lý khi nhập input room 
    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setNewRoom((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Chọn danh sách cán bộ coi thi
    const addSupervisoryList = (supervisoryList) => {
        console.log(supervisoryList)
        setNewRoom({
            ...newRoom,
            supervisoryList: supervisoryList,
        });
    }

    const validateForm = () => {
        let tempErrors = {};
        tempErrors.studentCode = newStudent.studentCode ? "" : "Mã thí sinh là bắt buộc";
        tempErrors.name = newStudent.name ? "" : "Họ tên thí sinh là bắt buộc";
        tempErrors.dateOfBirth = newStudent.dateOfBirth
          ? ""
          : "Ngày sinh là bắt buộc";
    
        setErrors(tempErrors);
        return Object.values(tempErrors).every((x) => x === "");
    };

    // Xử lý chọn môn học
    const handleSubjectSelectedChange = (event) => {
        setSubjectSelected(event.target.value);
    };

    // Mở form thêm mới sinh viên
    const handleOpenTypeAddStudent = (type) => setTpeAddStudent(type);

    // Xử lý thêm sinh viên bằng file
    const deleteFileSelected = () => {
        setFile(null);
        setUploadError(null);
    };

    // Xử lý sự kiện click button thêm mới sinh viên
    // Xử lý khi nhập input room 
    const handleInputStudentChange = (e) => {
        let { name, value } = e.target;
        setNewStudent((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleClickButtonAddStudent = (i) => {
        if (!validateForm()) return;


        if (isEditing) {    
            setNewRoom({
                ...newRoom,
                studentList: newRoom.studentList.map((student, index) => 
                    newStudent.id === student.id ? {
                        ...student,
                        ...newStudent
                    } : student,
                ),
            });
        } else {
            setNewRoom({
                ...newRoom,
                studentList: [...newRoom.studentList, {
                    id: uuidv4(),
                    studentCode: newStudent.studentCode,
                    name: newStudent.name,
                    className: newStudent.className,
                    dateOfBirth: newStudent.dateOfBirth,
                    address: newStudent.address,
                }],
            });
        }
        setIsEditing(false);
        setNewStudent({
            id: "",
            studentCode: "",
            name: "",
            className: "",
            dateOfBirth: "",
            address: "",
        });
    };
    const handleDeleteStudent = (id) => { // Xử lý xóa student
        setNewRoom({
            ...newRoom,
            studentList: newRoom.studentList.filter((student) => student.id !== id),
        });
    };


    const handleFileSelect = (event) => {
        setFile(event.target.files[0]);
    };
    const uploadFile = async () => {
        setUploading(true);
        setUploadProgress(0);
        setUploadError(null);

        const formData = new FormData();
        formData.append('file', file);

        const uploadConfig = {
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setUploadProgress(percentCompleted);
            }
        };

        try {
            const response = await api.post('/file/readFileQuestion', formData, uploadConfig);
            setQuestions(response.data.dataList);
        } catch (error) {
            setUploadError("Có lỗi xảy ra khi tải lên. Vui lòng thử lại!");
        } finally {
            setUploading(false);
        }
    };


    // Lấy danh sách cán bộ
    const fetchInitData = async () => {
        try {
            const response = await api.get(
                `/user/allUsername`
            );  
            setListUserData(response.data.dataList);
        } catch (error) {
            toast.warning("Hệ thống đang gặp sự cố, vui lòng thử lại sau!", {
                icon: "⚠️",
            });
        } finally {

        }
    }

    useEffect(() => {
        fetchInitData();
    },[]);
    
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth=""
            fullWidth
            sx={{ "& .MuiDialog-paper": { borderRadius: "15px" } }}
        >
            <ToastContainer icon={true} />
            {/* Nhãn của dialog */}
            <DialogTitle alignItems="center" display={"flex"}>
                <FcPlus />
                <Typography variant="h6" ml={1}>
                    {title}
                </Typography>
            </DialogTitle>

            {/* Nội dung chính thêm mới phòng thi */}
            <DialogContent>
                <Grid2 container spacing={2} size={{sx: 12}} >
                    {/* Form nhập thông tin phòng thi */}
                    <Grid2 item component='form' size={{ xs: 12, md: 2.5}}>
                        <Box sx={{mb: 1.5}}>
                            <TextField
                                required
                                fullWidth
                                label="Tên phòng thi"
                                name="roomName"
                                value={newRoom.roomName}
                                onChange={handleInputChange}
                                error={!!errors.roomName}
                                helperText={errors.roomName}
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
                                label="Địa điểm"
                                name="roomAddress"
                                value={newRoom.roomAddress}
                                onChange={handleInputChange}
                                error={!!errors.roomAddress}
                                helperText={errors.roomAddress}
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
                                value={newRoom.timeDuration}
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
                            <Autocomplete
                                multiple
                                id="checkboxes-tags-dem-supervisory"
                                options={listUserData}
                                onChange={(event, username) => {
                                    addSupervisoryList(username);
                                }}
                                sx={{mb: 1}}
                                disableCloseOnSelect
                                // getOptionLabel={(option) => option.title}
                                renderOption={(props, option, { selected }) => {
                                    const { key, ...optionProps } = props;
                                    return (
                                    <li key={key} {...optionProps}>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 2, color: 'green' }}
                                            checked={selected}
                                        />
                                        {option}
                                    </li>
                                    );
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} 
                                        variant="filled"
                                        size="small"
                                        label="Thêm cán bộ coi thi cho phòng thi" 
                                        placeholder="Nhập tên cán bộ coi thi" 
                                        sx={{
                                            '& .MuiInputBase-input::placeholder': {
                                                fontSize: '0.8rem', // Thay đổi kích thước placeholder
                                                color: 'gray',      // Thay đổi màu placeholder (tùy chọn)
                                            },
                                        }}
                                        InputLabelProps={{
                                            sx: {
                                            fontSize: '0.8rem',  // Kích thước nhỏ
                                            color: 'gray',       // Màu sắc thông thường
                                                '&.Mui-focused': {
                                                    fontSize: '1rem',  // Kích thước khi label được focus
                                                },
                                            },
                                        }}
                                    />
                                )}
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
                                    <MenuItem value={10}>Ten hoang vu van hoang chinh la sieu nhan anh hung</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        {/* Chọn danh sách đề hoặc bộ đề sau khi chọn môn học */}
                        <Box sx={{mb: 3}}>
                            <Autocomplete
                                multiple
                                disabled={subjectSelected.length < 1}
                                id="checkboxes-tags-dem-examSet"
                                options={listUserData}
                                onChange={(event, username) => {
                                    addSupervisoryList(username);
                                }}
                                sx={{mb: 1}}
                                disableCloseOnSelect
                                // getOptionLabel={(option) => option.title}
                                renderOption={(props, option, { selected }) => {
                                    const { key, ...optionProps } = props;
                                    return (
                                    <li key={key} {...optionProps}>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 2, color: 'green' }}
                                            checked={selected}
                                        />
                                        {option}
                                    </li>
                                    );
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} 
                                        variant="filled"
                                        size="small"
                                        label="Chọn danh sách đề hoặc bộ đề" 
                                        placeholder="Nhập tên cán bộ coi thi" 
                                        sx={{
                                            '& .MuiInputBase-input::placeholder': {
                                                fontSize: '0.8rem', // Thay đổi kích thước placeholder
                                                color: 'gray',      // Thay đổi màu placeholder (tùy chọn)
                                            },
                                        }}
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
                                )}
                            />
                        </Box>
                        <Box>
                            <Button
                                fullWidth
                                color="success"
                                variant="outlined"
                                sx={{ mr: 2, mb: 2, textTransform: 'capitalize' }}
                                size="medium"
                                onClick={() => handleOpenTypeAddStudent(1)}
                            >
                                Thêm mới sinh viên 
                                <FcPlus style={{marginLeft: '10px'}}/>
                            </Button>
                            <Button
                                fullWidth
                                color="success"
                                variant="outlined"
                                sx={{ mr: 2, mb: 2, textTransform: 'capitalize' }}
                                size="medium"
                                onClick={() => handleOpenTypeAddStudent(2)}
                            >
                                Thêm sinh viên từ file
                                <FcRules style={{marginLeft: '10px'}}/>
                            </Button>
                        </Box>
                    </Grid2>

                    {/* Area nhập hoặc import file sinh viên */}
                    <Grid2 item size={{ xs: 12, md: 2.5}}>
                        { typeAddStudent === 0 && 
                            <LazyLoadImage 
                                src={examImage}
                            />
                        }
                        {/* Nhập từng sinh viên */}
                        { typeAddStudent === 1 && 
                            <Box component="form">
                                <Box sx={{mb: 1.5}}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Mã thí sinh"
                                        name="studentCode"
                                        value={newStudent.studentCode}
                                        onChange={handleInputStudentChange}
                                        error={!!errors.studentCode}
                                        helperText={errors.studentCode}
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
                                        label="Họ và tên"
                                        name="name"
                                        value={newStudent.name}
                                        onChange={handleInputStudentChange}
                                        error={!!errors.name}
                                        helperText={errors.name}
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
                                        fullWidth
                                        label="Lớp"
                                        name="className"
                                        value={newStudent.className}
                                        onChange={handleInputStudentChange}
                                        error={!!errors.className}
                                        helperText={errors.className}
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
                                        type="date"
                                        label="Ngày sinh"
                                        name="dateOfBirth"
                                        value={newStudent.dateOfBirth}
                                        onChange={handleInputStudentChange}
                                        error={!!errors.dateOfBirth}
                                        helperText={errors.dateOfBirth}
                                        variant="filled"
                                        margin="none"
                                        size="small"
                                        InputLabelProps={{
                                            shrink: true,
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
                                        fullWidth
                                        label="Quê quán"
                                        name="address"
                                        value={newStudent.address}
                                        onChange={handleInputStudentChange}
                                        error={!!errors.address}
                                        helperText={errors.address}
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
                                <Button
                                    fullWidth
                                    color="success"
                                    variant="outlined"
                                    sx={{ mr: 2, mb: 2, textTransform: 'capitalize' }}
                                    size="medium"
                                    type="submit"
                                    onClick={(e) => {
                                        setIsEditing(false);
                                        handleClickButtonAddStudent(e)
                                    }}
                                >
                                    {isEditing ? "Lưu thay đổi" : "Lưu sinh viên"} 
                                    <FcPlus style={{marginLeft: '10px'}}/>
                                </Button>
                            </Box>
                        }
                        {/* Import từ file */}
                        { typeAddStudent === 2 && 
                            <Box>
                                {/* Vùng lưu ý khi upload file */}
                                <Box sx={{ mb: 1 }}>
                                    <Typography variant="subtitle2">
                                        Lưu ý:
                                    </Typography>
                                    <Box dense>
                                        <Box display='flex' alignItems='center'>
                                            <Box sx={{ ml: 1, mr: 1 }}>
                                                <FcHighPriority color="warning" size={20} />
                                            </Box>
                                            <Box>
                                                <Typography variant="caption">
                                                    Kích thước tối đa: 10MB
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box>
                                            <Typography variant="caption">
                                                Định dạng hỗ trợ: ${allowedFileTypes.join(', ')}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>

                                <UploadBox onClick={() => document.getElementById('file-input').click()}>
                                    <input
                                        id="file-input"
                                        type="file"
                                        hidden
                                        onChange={handleFileSelect}
                                        accept={allowedFileTypes.join(',')}
                                    />
                                    <CloudUploadIcon
                                        sx={{
                                            fontSize: 48,
                                            color: uploading ? 'turquoise' : 'text.secondary',
                                            mb: 1,
                                            animation: uploading ? `${uploadAnimation} 1s ease-in-out infinite` : 'none'
                                        }}
                                    />
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Click để chọn file hoặc kéo thả file vào đây
                                    </Typography>
                                </UploadBox>

                                {file !== null && (
                                    <ListItem>
                                        <Box >
                                            {uploadProgress === 100 ? (
                                                uploadError ? (
                                                    <ErrorOutline color="error" />
                                                ) : (
                                                    <CheckCircleOutline color="success" />
                                                )
                                            ) : (
                                                <Article />
                                            )}
                                        </Box>
                                        <ListItemText
                                            primary={file.name}
                                            secondary={`${(file.size / 1024 / 1024).toFixed(2)} MB`}
                                            sx={{ color: 'Highlight' }}
                                        />
                                        <Tooltip title="Xóa file">
                                            <IconButton onClick={deleteFileSelected}>
                                                <FcFullTrash />
                                            </IconButton>
                                        </Tooltip>
                                    </ListItem>
                                )}

                                {uploading && (
                                    <Box sx={{ mt: 2 }}>
                                        <LinearProgress
                                            variant="determinate"
                                            value={uploadProgress}
                                            sx={{ mb: 1 }}
                                        />
                                        <Typography variant="body2" align="center">
                                            Đang tải: {uploadProgress}%
                                        </Typography>
                                    </Box>
                                )}

                                {uploadError && (
                                    <Box sx={{ mt: 1, color: 'error.main', display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <ErrorOutline />
                                        <Typography variant="body2">{uploadError}</Typography>
                                    </Box>
                                )}
                            </Box>
                        }
                    </Grid2>

                    {/* Danh sách thí sinh: nhập tay hoặc import từ file */}
                    <Grid2 item component='form' size={{ xs: 12, md: 7}}>
                        <Typography variant="inherit" gutterBottom fontWeight={"bold"}>
                                Danh sách sinh viên vừa thêm
                        </Typography>
                        <TableContainer component={Paper} variant="outlined" sx={{maxHeight: '70%', overflowY: "auto"}}>
                            <Table size="small" aria-label="sticky table" stickyHeader>
                                <TableHead>
                                    <TableRow>
                                    <TableCell>STT</TableCell>
                                    <TableCell>Mã sinh viên</TableCell>
                                    <TableCell>Họ và tên</TableCell>
                                    <TableCell>Lớp</TableCell>
                                    <TableCell>Ngày sinh</TableCell>
                                    <TableCell>Quê quán</TableCell>
                                    <TableCell align="center">Thao tác</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {newRoom.studentList.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} align="center">
                                                Chưa có sinh viên trong phòng thi
                                            </TableCell>
                                        </TableRow>
                                        ) 
                                        : (
                                        newRoom.studentList
                                            .map((student, index) => (
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
                                                            onClick={(e) => handleDeleteStudent(student.id)}
                                                        >
                                                            <FcFullTrash fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Sửa">
                                                        <IconButton 
                                                            size="small" 
                                                            onClick={(e) => {
                                                                setErrors({});
                                                                setIsEditing(true);
                                                                setNewStudent(student);
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
                    Bắt đầu mở phòng thi ngay
                </Button>
                <Button
                    color="warning"
                    variant="contained"
                    sx={{ mr: 2, mb: 2, textTransform: 'capitalize' }}
                    size="medium"
                >
                    Lưu  và bắt đầu thi sau
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

export default DialogAddRoom;