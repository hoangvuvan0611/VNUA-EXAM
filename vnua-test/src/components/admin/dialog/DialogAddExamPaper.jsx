import { useEffect, useState } from "react";
import { 
    Autocomplete,
    Box, 
    Button, 
    Checkbox, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    FormControl, 
    Grid2, 
    InputLabel, 
    MenuItem, 
    Paper, 
    Select, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    TextField, 
    Typography 
} from "@mui/material";
import { FcPlus } from "react-icons/fc";
import { toast, ToastContainer } from "react-toastify";
import api from "../../../services/api/axios.config";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const DialogAddExamPaper = ({open, onClose, title, username}) => {

    const [ errors, setErrors ] = useState({});
    const [ isLoading, setIsLoading ] = useState(false);
    const [ questionList, setQuestionList ] = useState([]);
    const [ subjectList, setSubjectList ] = useState([]); // Danh sách môn học được lựa chọn
    const [ subjectSelected, setSubjectSelected ] = useState([]); // Môn học được lựa chọn
    const [ selected, setSelected ] = useState([]); // Danh sách câu hỏi đã chọn 
    const [ listUserData, setListUserData ] = useState([]); // Danh sách cán bộ coi thi
    const [ newExamPaper, setNewExamPaper ] = useState({
        examPaperName: "",
        timeDuration: "",
        subjectCode: "",
        questionList: [],
        supervisoryList: [],
    });

    // Kiểm tra một dòng có được chọn không
    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Xử lý đóng dialog
    const handleCloseDialog = () => {
        onClose();
        completeInput();
    };

    const completeInput = () => {
        setNewExamPaper({
            examPaperName: "",
            timeDuration: "",
            subjectCode: "",
            questionList: [],
            supervisoryList: [],
        });
        setErrors({});
        setSubjectSelected(null);
    }

    // Xử lý khi nhập input đề thi 
    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setNewExamPaper((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Lấy dữ liệu danh sách môn học
    const getSubjectData = async (username) => {
        try {
            const response = await api.get(
                `/subject/listToSelect/username=${username}`
            );  
            if (response.data.success === false) {
                return;
            }
            setSubjectList(response.data.dataList);
        } catch (error) {
            toast.warning("Hệ thống đang gặp sự cố, vui lòng thử lại sau!", {
                icon: "⚠️",
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Lấy danh sách cán bộ
    const fetchInitDataUser = async () => {
        setIsLoading(true);
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
            setIsLoading(false);
        }
    }

    // Xử lý chọn tất cả các câu hỏi 
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
          const newSelected = questionList.map((n) => n.id);
          setSelected(newSelected);
          return;
        }
        setSelected([]);
    };

      // Xử lý chọn một câu hỏi
    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            // Nếu id chưa có trong danh sách, thêm nó vào
            newSelected = [...selected, id];
        } else {
            // Nếu id đã có trong danh sách, loại bỏ nó
            newSelected = selected.filter((item) => item !== id);
        }
        setSelected(newSelected);
        setNewExamPaper({
            ...newExamPaper,
            questionList: newSelected,
        });
    };

    // Xử lý chọn môn học
    // Xử lý sau khi chọn môn học, lấy danh sách câu hỏi
    const handleSubjectSelectedChange = async (event) => {
        setIsLoading(true);
        setSubjectSelected(event.target.value);
        try {
            const response = await api.get(
                `question/getListBySubjectCode/subjectCode=${event.target.value}`
            );

            if (response.data.success === false) {
                throw new ErrorEvent();
            }

            setNewExamPaper({
                ...newExamPaper,
                subjectCode: event.target.value,
            });
            setQuestionList(response.data.dataList);
        } catch (error) {
            toast.warning("Hệ thống đang gặp sự cố, vui lòng thử lại sau!", {
                icon: "⚠️",
            });
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    };

    // Xử lý hiển thị chi tiết loại câu hỏi đã chọn
    const getSelectedCountByChapter = () => {
        // Lọc danh sách câu hỏi theo danh sách selected
        const selectedQuestions = questionList.filter((question) =>
            selected.includes(question.id)
        );
    
        // Nhóm theo chapterIndex và đếm số lượng
        return selectedQuestions.reduce((acc, question) => {
            const chapter = question.chapterIndex || "Ngoài"; // Trường hợp không có chapterIndex
            acc[chapter] = (acc[chapter] || 0) + 1;
            return acc;
        }, {});
    };
    const selectedCountByChapter = getSelectedCountByChapter();

    // Chọn danh sách cán bộ coi thi
    const addSupervisoryList = (supervisoryList) => {
        setNewExamPaper({
            ...newExamPaper,
            supervisoryList: supervisoryList,
        });
    }

    // Xử lý lưu đề thi
    const handleSubmitSaveExamPaper = async () => {
        setIsLoading(true); 
        try {
            const response = await api.post(
                `/examPaper/create`,
                newExamPaper
            );  
            if (response.data.success === false) {
                toast.warning("Hệ thống đang gặp sự cố, vui lòng thử lại sau!", {
                    icon: "⚠️",
                });
                return;
            }

            completeInput();
        } catch (error) {
            toast.warning("Hệ thống đang gặp sự cố, vui lòng thử lại sau!", {
                icon: "⚠️",
            });
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchInitDataUser();
        getSubjectData(username);
    }, [selected]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={"lg"}
            fullWidth
            sx={{ "& .MuiDialog-paper": { borderRadius: "15px" } }}
        >
            <ToastContainer icon={true} />
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
                    <Grid2 item component='form' size={{ xs: 12, md: 3,}} height={700}>
                        <Grid2 size={{ xs: 12, md: 3,}} sx={{position: 'absolute'}} >
                            <Box sx={{mb: 1.5}}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Tên đề thi"
                                    name="examPaperName"
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

                            {/* Autocomplete chọn user */}
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
                                            label="Thêm người dùng có quyền sử dụng đề thi" 
                                            placeholder="Nhập tên người dùng" 
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
                                        {subjectList?.map((subject) => (
                                            <MenuItem value={subject.subjectCode}>{subject.subjectName}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>

                            {/* Hiển thị thông tin những câu hỏi đã chọn */}
                            <Box>
                                {Object.entries(selectedCountByChapter).map(([chapter, count]) => (
                                    <Typography 
                                        key={chapter} 
                                        variant="subtitle2"
                                        color="info"
                                    >
                                        Chương {chapter}: {count} câu hỏi
                                    </Typography>
                                ))}
                            </Box>
                        </Grid2>
                    </Grid2>

                    {/* Bảng hiện danh sách câu hỏi để thêm mới đề thi */}
                    <Grid2 item component='form' sx={{pl: 2}} size={{ xs: 12, md: 9}} >
                        <Typography variant="inherit" gutterBottom fontWeight={"bold"}>
                                Danh sách câu hỏi, đã chọn {selected.length = 0 ? 0 : selected.length}
                        </Typography>
                        <TableContainer component={Paper} variant="outlined" sx={{maxHeight: '70%', overflow: "visible"}}>
                            <Table 
                                size="small" 
                                aria-label="sticky table" 
                                stickyHeader 
                                sx={{border: '2px', borderColor: 'Highlight'}}
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="success"
                                                indeterminate={
                                                selected.length > 0 && selected.length < questionList?.length
                                                }
                                                checked={
                                                    questionList?.length > 0 &&
                                                    selected.length === questionList?.length
                                                }
                                                onChange={handleSelectAllClick}
                                                inputProps={{
                                                    "aria-label": "select all desserts",
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>STT</TableCell>
                                        <TableCell
                                            width={300}
                                        >Nội dung</TableCell>
                                        <TableCell>Chương</TableCell>
                                        <TableCell>Loại câu hỏi</TableCell>
                                        <TableCell>Mức độ</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {questionList?.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} align="center" >
                                                Môn học chưa có câu hỏi hoặc chưa chọn môn học!
                                            </TableCell>
                                        </TableRow>
                                        ) 
                                        : (
                                            questionList?.map((question, index) => (
                                                <TableRow 
                                                    hover
                                                    role="checkbox"
                                                    aria-checked={isSelected(question.id)}
                                                    tabIndex={-1}
                                                    selected={isSelected(question.id)}
                                                    key={question.id} 
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            color="success"
                                                            checked={isSelected(question.id)}
                                                            onChange={(event) => handleClick(event, question.id)}
                                                            inputProps={{
                                                                "aria-labelledby": `enhanced-table-checkbox-${index}`,
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{question.content}</TableCell>
                                                    <TableCell>{question.chapterIndex}</TableCell>
                                                    <TableCell>{question.questionType}</TableCell>
                                                    <TableCell>{question.dateOfBirth}</TableCell>
                                                </TableRow>
                                            ))
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid2>
                </Grid2>
            </DialogContent>

            {/* Button thao tác lưu, đóng */}
            <DialogActions sx={{justifyContent: 'center'}}>
                <Button
                    color="success"
                    variant="contained"
                    sx={{ mr: 2, mb: 0, textTransform: 'capitalize' }}
                    size="medium"
                    onClick={handleSubmitSaveExamPaper}
                >
                    Lưu đề thi
                </Button>
                <Button
                    onClick={handleCloseDialog}
                    color="primary"
                    variant="contained"
                    sx={{ mr: 2, mb: 0, textTransform: 'capitalize'}}
                    size="medium"
                >
                    Đóng
                </Button>
            </DialogActions>

        </Dialog>
    );
}

export default DialogAddExamPaper;