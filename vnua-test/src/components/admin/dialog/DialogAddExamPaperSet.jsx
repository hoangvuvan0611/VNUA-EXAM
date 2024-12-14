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

const DialogAddExamPaperSet = ({open, onClose, title, username, refreshExamPaper }) => {

    const [ errors, setErrors ] = useState({});
    const [ isLoading, setIsLoading ] = useState(false);
    const [ examPaperList, setExamPaperList ] = useState([]);
    const [ subjectList, setSubjectList ] = useState([]); // Danh sách môn học được lựa chọn
    const [ subjectSelected, setSubjectSelected ] = useState([]); // Môn học được lựa chọn
    const [ selected, setSelected ] = useState([]); // Danh sách câu hỏi đã chọn 
    const [ listUserData, setListUserData ] = useState([]); // Danh sách cán bộ coi thi
    const [ newExamPaperSet, setNewExamPaperSet ] = useState({
        examPaperSetName: "",
        timeDuration: "",
        subjectCode: "",
        examPaperList: [],
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
        setNewExamPaperSet({
            examPaperSetName: "",
            timeDuration: "",
            subjectCode: "",
            examPaperList: [],
            supervisoryList: [],
        });
        setErrors({});
        setSubjectSelected(null);
        setSelected([]);
    }

    // Xử lý khi nhập input đề thi 
    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setNewExamPaperSet((prev) => ({
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

        // /examPaper/getList/subjectCode=
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

    // Xử lý chọn tất cả các đề thi
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
          const newSelected = examPaperList.map((n) => n.id);
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
        setNewExamPaperSet({
            ...newExamPaperSet,
            examPaperList: newSelected,
        });
    };

    // Xử lý chọn môn học
    // Xử lý sau khi chọn môn học, lấy danh sách đề thi
    const handleSubjectSelectedChange = async (event) => {
        setIsLoading(true);
        setSubjectSelected(event.target.value);
        try {
            const response = await api.get(
                `/examPaper/getList/subjectCode=${event.target.value}`
            );

            if (response.data.success === false) {
                throw new ErrorEvent();
            }

            setNewExamPaperSet({
                ...newExamPaperSet,
                subjectCode: event.target.value,
            });
            setExamPaperList(response.data.dataList);
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
        const selectedExamPapers = examPaperList.filter((examPaper) =>
            selected.includes(examPaper.id)
        );
    
        // Nhóm theo chapterIndex và đếm số lượng
        return selectedExamPapers.reduce((acc, examPaper) => {
            const chapter = examPaper.chapterIndex || "Ngoài"; // Trường hợp không có chapterIndex
            acc[chapter] = (acc[chapter] || 0) + 1;
            return acc;
        }, {});
    };
    const selectedCountByChapter = getSelectedCountByChapter();

    // Chọn danh sách cán bộ coi thi
    const addSupervisoryList = (supervisoryList) => {
        setNewExamPaperSet({
            ...newExamPaperSet,
            supervisoryList: supervisoryList,
        });
    }

    // Xử lý lưu đề thi
    const handleSubmitSaveExamPaper = async () => {
        setIsLoading(true); 
        try {
            console.log(newExamPaperSet)
            const response = await api.post(
                `/examPaperSet/create`,
                newExamPaperSet
            );  
            if (response.data.success === false) {
                toast.warning("Hệ thống đang gặp sự cố, vui lòng thử lại sau!", {
                    icon: "⚠️",
                });
                return;
            }

            toast.success("Thêm mới bộ đề thành công!", {
                icon: "✅",
            });
            completeInput();
            refreshExamPaper();
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
    }, []);

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
                                    label="Tên bộ đề thi"
                                    name="examPaperSetName"
                                    value={newExamPaperSet.examPaperName}
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
                                    value={newExamPaperSet.timeDuration}
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
                                            label="Thêm người dùng có quyền sử dụng bộ đề" 
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

                    {/* Bảng hiện danh sách đề thi để thêm mới bộ đề thi */}
                    <Grid2 item component='form' sx={{pl: 2}} size={{ xs: 12, md: 9}} >
                        <Typography variant="inherit" gutterBottom fontWeight={"bold"}>
                                Danh sách đề thi, đã chọn {selected.length = 0 ? 0 : selected.length}
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
                                                selected.length > 0 && selected.length < examPaperList?.length
                                                }
                                                checked={
                                                    examPaperList?.length > 0 &&
                                                    selected.length === examPaperList?.length
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
                                        >Tên đề thi</TableCell>
                                        <TableCell>Thời lượng</TableCell>
                                        <TableCell>Số câu hỏi</TableCell>
                                        <TableCell>Mức độ</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {examPaperList?.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} align="center" >
                                                Môn học chưa có câu hỏi hoặc chưa chọn môn học!
                                            </TableCell>
                                        </TableRow>
                                        ) 
                                        : (
                                            examPaperList?.map((examPaper, index) => (
                                                <TableRow 
                                                    hover
                                                    role="checkbox"
                                                    aria-checked={isSelected(examPaper.id)}
                                                    tabIndex={-1}
                                                    selected={isSelected(examPaper.id)}
                                                    key={examPaper.id} 
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            color="success"
                                                            checked={isSelected(examPaper.id)}
                                                            onChange={(event) => handleClick(event, examPaper.id)}
                                                            inputProps={{
                                                                "aria-labelledby": `enhanced-table-checkbox-${index}`,
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{examPaper.title}</TableCell>
                                                    <TableCell>{examPaper.duration}</TableCell>
                                                    <TableCell>{examPaper.questionNum}</TableCell>
                                                    <TableCell>{examPaper.dateOfBirth}</TableCell>
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
                    Lưu bộ đề
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

export default DialogAddExamPaperSet;