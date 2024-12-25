import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid2, IconButton, InputLabel, MenuItem, Select, TextField, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { FcFullTrash, FcPlus, FcSupport } from "react-icons/fc";
import { toast } from "react-toastify";
import api from "../../../services/api/axios.config";

const DialogAddAndEditQuestion = ({ open, onClose, isEdit, question, setQuestion }) => {

    const [ errors, setErrors ] = useState({});
    const [ subjectSelected, setSubjectSelected ] = useState(null);
    const [ subjectList, setSubjectList ] = useState([]);

    const handleCloseDialog = () => {
        onClose();
    }

    // Xử lý khi input thay đổi
    const handleInputChange = (e) => {
        let {name, value} = e.target;
        setQuestion({
            ...question,
            [name]: value
        });
    } 

    // Xử lý sau khi chọn môn học, lấy danh sách chương
    const handleSubjectSelectedChange = async (event) => {
        setSubjectSelected(event.target.value);
        try {
            const response = await api.get(
                `question/getListBySubjectCode/subjectCode=${event.target.value}`
            );

            if (response.data.success === false) {
                throw new ErrorEvent();
            }

            setQuestion({
                ...question,
                subjectCode: event.target.value,
            });
            // setQuestionList(response.data.dataList);
        } catch (error) {
            toast.warning("Hệ thống đang gặp sự cố, vui lòng thử lại sau!", {
                icon: "⚠️",
            });
            console.log(error)
        } finally {
        }
    };
    
    // Xử lý nhập cho mỗi câu trả lời
    const handleInputChangeAnswer = (e, index) => {
        let { name, value } = e.target;
        setQuestion({
            ...question,
            answerList: question.answerList.map(( answer, i ) => index === i ?
                {
                    ...answer,
                    [name]: value,
                } : answer,
            ),
        });
    }

    // Xử lý xóa câu trả lời
    const handleDeleteAnswer = (index) => {
        setQuestion({
            ...question,
            answerList: question.answerList.filter((_, i) => index !== i),
        });
    }

    // Xử lý thêm mới câu trả lời
    const handleClickAddAnswer = () => {
        setQuestion({
            ...question,
            answerList: [
                ...question.answerList,
                {
                    content: "",
                }
            ]
        });
    }


    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="700"
            sx={{ "& .MuiDialog-paper": { borderRadius: "15px" }}}
        >
            <DialogTitle alignItems="center" display={"flex"}>
                {isEdit ? (<FcSupport />) : (<FcPlus />)} 
                <Typography variant="h6" ml={1}>
                    {isEdit ? "Chỉnh sửa câu hỏi" : "Thêm mới câu hỏi"}
                </Typography>
            </DialogTitle>

            <DialogContent sx={{overflow: 'auto'}}>
                <Box width={500}>
                    <Grid2
                        container
                        spacing={1}
                    >
                        <Grid2 size={{ xs: 12}} >
                            <TextField
                                fullWidth
                                multiline={true}
                                label="Nội dung câu hỏi"
                                name="content"
                                value={question.content}
                                onChange={handleInputChange}
                                error={!!errors.content}
                                helperText={errors.content}
                                variant="filled"
                                margin="none"
                            />
                        </Grid2>
                        {/* Dropdown chọn môn học */}
                        <Grid2 size={{ xs: 12}} >
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
                                    {subjectList?.map((subject) => (
                                        <MenuItem value={subject.subjectCode}>{subject.subjectName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid2>
                        {/* Dropdown chọn môn học */}
                        <Grid2 size={{ xs: 12}} >
                            <FormControl variant="filled" sx={{}} fullWidth>
                                <InputLabel sx={{fontSize: '0.9rem'}} required id="subject-select-label">Chương</InputLabel>
                                <Select
                                    required
                                    fullWidth
                                    labelId="subject-select-label"
                                    id="subject-simple-select"
                                    placeholder="Chọn chương"
                                    value={subjectSelected}
                                    label="Age"
                                    variant="filled"
                                    size="small"
                                    onChange={handleSubjectSelectedChange}
                                >
                                    {subjectList?.map((subject) => (
                                        <MenuItem value={subject.subjectCode}>{subject.subjectName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid2>
                        <Grid2 size={{ xs: 12}} >
                            <TextField
                                fullWidth
                                label="Loại câu hỏi"
                                name="type"
                                value={question.type}
                                onChange={handleInputChange}
                                error={!!errors.type}
                                helperText={errors.type}
                                variant="filled"
                                margin="none"
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12}}>
                            <Button
                                variant="outlined"
                                size="small"
                                color="success"
                                sx={{textTransform: "capitalize"}}
                                onClick={handleClickAddAnswer}
                            >
                                Thêm mới đáp án
                            </Button>
                            {/* Danh sách chương của môn học */}
                            {
                                question.answerList?.length > 0 && question?.answerList.map((answer, index) => (
                                    <Box key={index} sx={{mb: 1}}>
                                        <Box justifyContent={'space-between'}>
                                            <Typography
                                                variant="caption"
                                            >
                                                Đáp án {index + 1}
                                            </Typography>
                                            <Tooltip title="Xóa đáp án">
                                                <IconButton
                                                    onClick={() => handleDeleteAnswer(index)}
                                                >
                                                    <FcFullTrash />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>

                                        <TextField
                                            required
                                            fullWidth
                                            label="Nội dung đáp án"
                                            name="content"
                                            value={answer.content}
                                            onChange={(e) => handleInputChangeAnswer(e, index)}
                                            error={!!errors.answer}
                                            helperText={errors.answer}
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
                        </Grid2>
                    </Grid2>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={() => handleCloseDialog()}
                    color="primary"
                    variant="contained"
                    sx={{ mr: 2}}
                >
                    Lưu
                </Button>
                <Button
                    onClick={() => handleCloseDialog()}
                    color="primary"
                    variant="contained"
                    sx={{ mr: 2}}
                >
                    Hủy
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogAddAndEditQuestion;