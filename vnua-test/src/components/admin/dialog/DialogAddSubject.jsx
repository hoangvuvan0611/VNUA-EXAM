import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { FcFullTrash, FcPlus } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import api from "../../../services/api/axios.config";

const DialogAddSubject = ({open, onClose, title, refreshData}) => {

    const [ errors, setErrors ] = useState({});
    const [ newSubject, setNewSubject ] = useState({
        subjectCode: "",
        subjectName: "",
        chapterList: [],
    }); 

    // Xử lý event đóng dialog
    const handleCloseDialog = () => {
        setNewSubject({
            subjectCode: "",
            subjectName: "",
            chapterList: [],
        });
        onClose();
    }

    // Xử lý khi nhập input đề thi 
    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setNewSubject((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // xử lý click button thêm mới chương
    const handleClickAddChapter = () => {
        setNewSubject({
            ...newSubject,
            chapterList: [
                ...newSubject.chapterList,
                {
                    chapterName: "",
                },
            ],
        });
    }

    // Xử lý khi sửa chương
    const handleInputChangeChapter = (e, chapterIndex) => {
        let { name, value } = e.target;
        setNewSubject({
            ...newSubject,
            chapterList: newSubject.chapterList.map((chapter, index) => 
                index === chapterIndex 
                ? {
                    ...chapter,
                    [name]: value,
                } : chapter,
            ),
        });
    }

    // Xử lý xóa chương
    const handleDeleteChapter = (chapterIndex) => {
        setNewSubject({
            ...newSubject,
            chapterList: newSubject.chapterList.filter((_, index) => index !== chapterIndex),
        });
    }

    const handleSubmitSaveSubject = async () => {
        try {
            const response = await api.post(`/subject/create`, newSubject);
            console.log(response.data.success)
            if (response.data.success === false) {
                toast.error(`Lỗi khi tạo mới môn học: ${response.data.message}`);
            }
            
            toast.success("Thêm mới môn học thành công!", {
                icon: "✅",
            });

            setNewSubject({
                subjectCode: "",
                subjectName: "",
                chapterList: [],
            });
            refreshData();
            console.log(response)
        } catch (error) {
            toast.warning(`Hệ thống đang gặp sự cố, vui lòng thử lại sau!`, {
                icon: "⚠️",
            });
        }
    }

    return (
        <Dialog
            open={open}
            onClose={handleCloseDialog}
            sx={{ "& .MuiDialog-paper": { borderRadius: "10px" } }}
        >
            <ToastContainer icon={true} />
            <DialogTitle alignItems="center" display={"flex"}>
                <FcPlus />
                <Typography variant="h6" ml={1}>
                    {title}
                </Typography>
            </DialogTitle>

            {/* Form thêm mới môn học */}
            <DialogContent >
                <Box sx={{mb: 1.5, pl: 4, pr: 4}} width={400} >
                    <Box mb={2}>
                        <TextField
                            required
                            fullWidth
                            label="Mã môn học"
                            name="subjectCode"
                            value={newSubject.subjectCode}
                            onChange={handleInputChange}
                            error={!!errors.subjectCode}
                            helperText={errors.subjectCode}
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
                    <Box mb={2}>
                        <TextField
                            required
                            fullWidth
                            label="Tên môn học"
                            name="subjectName"
                            value={newSubject.subjectName}
                            onChange={handleInputChange}
                            error={!!errors.subjectName}
                            helperText={errors.subjectName}
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
                    <Box mb={1}>
                        <Button
                            variant="outlined"
                            size="small"
                            color="success"
                            sx={{textTransform: "capitalize"}}
                            onClick={handleClickAddChapter}
                        >
                            Thêm mới chương
                        </Button>
                    </Box>
                    
                    {/* Danh sách chương của môn học */}
                    {
                        newSubject.chapterList.map((chapter, index) => (
                            <Box key={index} sx={{mb: 1}}>
                                <Box justifyContent={'space-between'}>
                                    <Typography
                                        variant="caption"
                                    >
                                        Chương {index + 1}
                                    </Typography>
                                    <Tooltip title="Xóa chương">
                                        <IconButton
                                            onClick={() => handleDeleteChapter(index)}
                                        >
                                            <FcFullTrash />
                                        </IconButton>
                                    </Tooltip>
                                </Box>

                                <TextField
                                    required
                                    fullWidth
                                    label="Tên chương"
                                    name="chapterName"
                                    value={chapter.chapterName}
                                    onChange={(e) => handleInputChangeChapter(e, index)}
                                    error={!!errors.chapterName}
                                    helperText={errors.chapterName}
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
                        ))
                    }
                </Box>
            </DialogContent>
            
            {/* Button thao tác lưu, đóng */}
            <DialogActions sx={{justifyContent: 'center'}}>
                <Button
                    color="success"
                    variant="contained"
                    sx={{ mr: 2, mb: 2, textTransform: 'capitalize' }}
                    size="medium"
                    type="submit"
                    onClick={handleSubmitSaveSubject}
                >
                    Lưu môn học
                </Button>
                <Button
                    onClick={handleCloseDialog}
                    color="primary"
                    variant="contained"
                    sx={{ mr: 2, mb: 2, textTransform: 'capitalize'}}
                    size="medium"
                >
                    Đóng
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogAddSubject;