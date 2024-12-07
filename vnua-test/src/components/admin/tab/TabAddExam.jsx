import { 
    Accordion, 
    AccordionSummary, 
    Box, 
    Button, 
    DialogContent, 
    DialogTitle, 
    AccordionDetails,
    Grid2, 
    TextField, 
    Typography, 
    List,
    IconButton,
    Tooltip,
    Autocomplete,
    Checkbox
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../../services/api/axios.config";
import { ToastContainer, toast } from "react-toastify";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { FcExpand, FcFullTrash, FcPlus } from "react-icons/fc";
import { MdOutlinePlaylistAddCircle } from "react-icons/md";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const TabAddExam = ({isOpen, onClose, title, isEditing}) => {

    const [ errors, setErrors ] = useState({});
    // Validation function
    const validateForm = () => {
        let tempErrors = {};
        let isValid = true;

        // Validate Exam Code
        if (!newExam.examCode || newExam.examCode.trim() === '') {
            tempErrors.examCode = 'Mã kỳ thi không được để trống';
            isValid = false;
        }

        // Validate Exam Name
        if (!newExam.examName || newExam.examName.trim() === '') {
            tempErrors.examName = 'Tên kỳ thi không được để trống';
            isValid = false;
        }

        // Validate Start Date
        if (!newExam.startDate) {
            tempErrors.startDate = 'Ngày bắt đầu không được để trống';
            isValid = false;
        }

        // Validate End Date
        if (!newExam.endDate) {
            tempErrors.endDate = 'Ngày kết thúc không được để trống';
            isValid = false;
        }

        // Validate Start Date is before End Date
        if (newExam.startDate && newExam.endDate && 
            new Date(newExam.startDate) > new Date(newExam.endDate)) {
            tempErrors.dateRange = 'Ngày bắt đầu phải trước ngày kết thúc';
            isValid = false;
        }

        // Validate Poetry Number
        if (!poetryNum || poetryNum <= 0) {
            tempErrors.poetryNum = 'Số lượng ca thi phải lớn hơn 0';
            isValid = false;
        }

        // Validate Admin User List
        if (!newExam.adminUserList || newExam.adminUserList.length === 0) {
            tempErrors.adminUserList = 'Phải chọn ít nhất một quản trị viên';
            isValid = false;
        }

        // Validate Poetry List
        if (!newExam.poetryList || newExam.poetryList.length === 0) {
            tempErrors.poetryList = 'Phải có ít nhất một ca thi';
            isValid = false;
        } else {
            // Validate each poetry session
            newExam.poetryList.forEach((poetry, pIndex) => {
                // Validate Poetry Name
                if (!poetry.poetryName || poetry.poetryName.trim() === '') {
                    tempErrors[`poetryList[${pIndex}].poetryName`] = 'Tên ca thi không được để trống';
                    isValid = false;
                }

                // Validate Start Time
                if (!poetry.startTime) {
                    tempErrors[`poetryList[${pIndex}].startTime`] = 'Thời gian bắt đầu không được để trống';
                    isValid = false;
                }

                // Validate End Time
                if (!poetry.endTime) {
                    tempErrors[`poetryList[${pIndex}].endTime`] = 'Thời gian kết thúc không được để trống';
                    isValid = false;
                }

                // Validate Start Time is before End Time
                if (poetry.startTime && poetry.endTime && 
                    new Date(poetry.startTime) > new Date(poetry.endTime)) {
                    tempErrors[`poetryList[${pIndex}].timeRange`] = 'Thời gian bắt đầu phải trước thời gian kết thúc';
                    isValid = false;
                }

                // Validate Room List
                if (!poetry.roomList || poetry.roomList.length === 0) {
                    tempErrors[`poetryList[${pIndex}].roomList`] = 'Phải có ít nhất một phòng thi';
                    isValid = false;
                } else {
                    // Validate each room
                    poetry.roomList.forEach((room, roomIndex) => {
                        // Validate Room Name
                        if (!room.roomName || room.roomName.trim() === '') {
                            tempErrors[`poetryList[${pIndex}].roomList[${roomIndex}].roomName`] = 'Tên phòng thi không được để trống';
                            isValid = false;
                        }

                        // Validate Room Address
                        if (!room.roomAdress || room.roomAdress.trim() === '') {
                            tempErrors[`poetryList[${pIndex}].roomList[${roomIndex}].roomAdress`] = 'Địa điểm phòng thi không được để trống';
                            isValid = false;
                        }

                        // Validate Supervisory List
                        if (!room.supervisoryList || room.supervisoryList.length === 0) {
                            tempErrors[`poetryList[${pIndex}].roomList[${roomIndex}].supervisoryList`] = 'Phải chọn ít nhất một giám thị';
                            isValid = false;
                        }
                    });
                }
            });
        }

        // Update errors state
        setErrors(tempErrors);

        return isValid;
    };

    const [ isDisabledInputExamNum, setIsDisabledInputExamNum] = useState(false);
    const [ poetryNum, setPoetryNum ] = useState(null); 
    const [ listUserData, setListUserData ] = useState([]);
    const [ newExam, setNewExam ] = useState({ // Đối tượng chứa thông tin của  kỳ thi
        id: "",
        examCode: "",
        examName: "",
        startDate: "",
        endDate: "",
        poetryNum: 0, 
        adminUserList: [],
        poetryList: [
            // {
            //     poetryName: "",
            //     startTime: "",
            //     endTime: "",
            //     roomList: [
            //         {
            //             roomName: "",
            //             roomAdress: "",
            //             supervisoryList: [],
            //         }
            //     ],
            // },
        ],
    });

    // Xử lý thông tin kỳ thi
    const handleInputChange = (e) => { // Xử lý nhập input các trường thông tin của kỳ thi
        let { name, value } = e.target;
        setNewExam((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (name === 'poetryNum') {
            setPoetryNum(value);
            handleUpdateExamSessionCount(e);
            setIsDisabledInputExamNum(true);
        }
    };
    
    // Xử lý thông tin ca thi
    const handleUpdateExamSessionCount = (e) => { // Xử lý thêm mới ca thi
        const poetryCount = parseInt(e.target.value);
        setNewExam({
            ...newExam,
            poetryNum: poetryCount,
            poetryList: [
                ...newExam.poetryList, // Danh sách hiện tại
                ...Array.from({ length: poetryCount }, (_, index) => ({
                    poetryName: `Ca thi ${index + 1}`,
                    startTime: "",
                    endTime: "",
                    roomList: [],
                })), // Thêm trực tiếp các phần tử mới
            ],
        });
    };
    const handleAddNewExamPoetry = () => { // Sự kiện khi click button thêm mới ca thi
        setNewExam({
            ...newExam,
            poetryNum: newExam.poetryNum + 1,
            poetryList: [
                ...newExam.poetryList, // Danh sách hiện tại
                {
                    poetryName: `Ca thi ${newExam.poetryList.length + 1}`,
                    startTime: "",
                    endTime: "",
                    roomList: [],
                } // Thêm trực tiếp các phần tử mới
            ],
        });
    }
    const handleInputPoetryChange = (e, index) => { // Xử lý thông tin input của các trường thông tin ca thi
        let { name, value } = e.target;
        setNewExam({
            ...newExam, // Giữ lại các trường thông tin khác
            poetryList: newExam.poetryList.map((poetry, i) => // Cập nhật theo trường cụ thể
                i === index ? {...poetry, [name]: value} : poetry
            ),
        });
    }
    const handleRemovePoetry = (index) => { // Sự kiện khi click button xóa ca thi
        setNewExam({
            ...newExam,
            poetryList: newExam.poetryList.filter((_, i) => i !== index)
        });
    }

    // Xử lý phòng thi
    const handleAddRoom = (poetryIndex) => { // Thêm mới phòng thi
        setNewExam({
            ...newExam,
            poetryList: newExam.poetryList.map((poetry, pIndex) => 
                poetryIndex === pIndex 
                ? {
                    ...poetry,
                    roomList: [
                        ...poetry.roomList,
                        {
                            roomName: `Phòng thi ${poetry.roomList.length + 1}`,
                            roomNumber: "",
                            supervisoryList: [],
                        },
                    ],
                } : poetry
            ),
        });
    };
    const handleInputRoomChange = (e, poetryIndex, index) => { // Xử lý thông tin input của các trường thông tin ca thi
        let { name, value } = e.target;
        setNewExam({
            ...newExam,
            poetryList: newExam.poetryList.map((poetry, pIndex) => 
                poetryIndex === pIndex 
                ? {
                    ...poetry,
                    roomList: poetry.roomList.map((room, i) => 
                        i === index ? { ...room, [name]: value} : room,
                    ),
                } : poetry
            ),
        });
    };
    const handleRemoveRoom = (poetryIndex, roomIndex) => { // Xoá phòng thi
        setNewExam({
            ...newExam,
            poetryList: newExam.poetryList.map((poetry, pIndex) => 
                poetryIndex === pIndex 
                ? {
                    ...poetry,
                    roomList: poetry.roomList.filter((_, i) => i !== roomIndex),
                } : poetry
            ),
        });
    }
    const addSupervisoryList = (poetryIndex, roomIndex, supervisoryList) => {
        console.log(supervisoryList)
        setNewExam({
            ...newExam,
            poetryList: newExam.poetryList.map((poetry, pIndex) => 
                poetryIndex === pIndex 
                ? {
                    ...poetry,
                    roomList: poetry.roomList.map((room, i) => 
                        roomIndex === i 
                        ? {
                            ...room,
                            supervisoryList: supervisoryList,
                        } : room,
                    ),
                } : poetry,
            ),
        });
    }
    const handleBlur = (value) => {
        if (value.trim === '') {
            setErrors(true); // Hiển thị lỗi nếu trường bị để trống
        } else {
            setErrors(false);
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

    const saveNewExam = async () => {
        
    }

    const handleSubmit = () => {
        if (validateForm) {
            console.log(newExam)
        }  else {
            // Show error toast or alert
            toast.error('Vui lòng kiểm tra lại thông tin');
        }
    }
    
    return(
        <Box
            open={isOpen}
            onClose={onClose}
            maxWidth="100%"
            maxHeight="90%"
            sx={{ "& .MuiDialog-paper": { borderRadius: "15px" } }}
            component="form" onSubmit={handleSubmit}
        >
            <ToastContainer icon={true} />
            <DialogTitle alignItems="center" display={"flex"} justifyContent='space-between' sx={{}} >
                <Box display='flex' alignItems='center'>
                    <FcPlus />
                    <Typography variant="subtitle1" ml={1}>
                        {title}
                    </Typography>
                </Box>
                <Button
                    type="submit"
                    onClick={() => handleSubmit()}
                    color="primary"
                    variant="contained"
                    sx={{ mr: 2, mb: 2, textTransform: 'capitalize' }}
                    size="small"
                >
                    Lưu
                </Button>
            </DialogTitle>

            <DialogContent>
                <Box sx={{ display: "flex", gap: 2, mt: 0}} justifyContent='center'>

                    {/* Form nhập thông tin kỳ thi */}
                    <Box sx={{ mt: 1 }}>
                        <Box container spacing={1} width={400}>
                            <Box item sx={{mb: 2}}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Mã kỳ thi"
                                    name="examCode"
                                    value={newExam.examCode}
                                    onChange={handleInputChange}
                                    error={!!errors.studentCode}
                                    helperText={errors.studentCode}
                                    variant="filled"
                                    margin="none"
                                    size="small"
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
                            </Box>
                            <Box item sx={{mb: 2}}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Tên kỳ thi"
                                    name="examName"
                                    value={newExam.examName}
                                    onChange={handleInputChange}
                                    error={!!errors.studentCode}
                                    helperText={errors.studentCode}
                                    variant="filled"
                                    margin="none"
                                    size="small"
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
                            </Box>
                            <Box item sx={{mb: 2}}>
                                <TextField
                                    required
                                    fullWidth
                                    type="date"
                                    label="Ngày bắt đầu"
                                    name="startDate"
                                    value={newExam.startDate}
                                    onChange={handleInputChange}
                                    error={!!errors.dateOfBirth}
                                    helperText={errors.dateOfBirth}
                                    variant="standard"
                                    margin="none"

                                    size="small"
                                    InputLabelProps={{
                                        shrink: true,
                                        sx: {
                                          fontSize: '0.8rem',  // Kích thước nhỏ
                                          color: 'gray',       // Màu sắc thông thường
                                          '&.Mui-focused': {
                                            fontSize: '1rem',  // Kích thước khi label được focus
                                          },
                                        },
                                    }}
                                />
                            </Box>
                            <Box item sx={{mb: 2}}>
                                <TextField
                                    required
                                    fullWidth
                                    type="date"
                                    label="Ngày kết thúc"
                                    name="endDate"
                                    value={newExam.endDate}
                                    onChange={handleInputChange}
                                    error={!!errors.dateOfBirth}
                                    helperText={errors.dateOfBirth}
                                    variant="standard"
                                    margin="none"
                                    InputLabelProps={{
                                        shrink: true,
                                        sx: {
                                          fontSize: '0.8rem',  // Kích thước nhỏ
                                          color: 'gray',       // Màu sắc thông thường
                                          '&.Mui-focused': {
                                            fontSize: '1rem',  // Kích thước khi label được focus
                                          },
                                        },
                                    }}
                                    size="small"
                                />
                            </Box>
                            <Box item sx={{mb: 2}}>
                                <Typography variant="caption" color="info">
                                    Số lượng ca thi chỉ được nhập 1 lần
                                </Typography>
                                <TextField
                                    required
                                    fullWidth
                                    type="number"
                                    label="Số lượng ca thi"
                                    name="poetryNum"
                                    disabled={isDisabledInputExamNum}
                                    value={poetryNum}
                                    onChange={handleInputChange}
                                    error={!!errors.name}
                                    helperText={errors.name}
                                    variant="filled"
                                    margin="none"
                                    size="small"
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
                            </Box>
                            {/* Danh sách quản trị viên cho kỳ thi */}
                            <Autocomplete
                                multiple
                                id="checkboxes-tags-dem"
                                options={listUserData}
                                onChange={(event, username) => {
                                    setNewExam({
                                        ...newExam,
                                        adminUserList: username // Lưu danh sách quản trị viên của phòng thi
                                    });
                                }}
                                sx={{mb: 4}}
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
                                        label="Thêm quản trị viên cho kỳ thi" 
                                        placeholder="Nhập tên quản trị viên" 
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
        
                            {/* Nếu danh sách ca thi đã nhập thì hiện cho thêm mới */}
                            {
                                newExam.poetryList.length >= 1 && (
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        onClick={handleAddNewExamPoetry}
                                        startIcon={<MdOutlinePlaylistAddCircle />}
                                        color={isEditing ? "warning" : "success"}
                                        sx={{ textTransform: "capitalize" }}
                                    >
                                        Thêm mới ca thi
                                    </Button>
                                )
                            }
                        </Box>
                    </Box>

                    {/* Hiển thị danh sách ca thi */}
                    <Box width={newExam.poetryList.length >= 1 ? 550 : 0}>
                        <List>
                            {newExam.poetryList.map((poetry, pIndex) => (
                                <Accordion key={pIndex}>
                                    {/* Tiêu đề mỗi ca thi */}
                                    <AccordionSummary
                                        expandIcon={<FcExpand />}
                                        aria-controls={`exam-session-${pIndex}`}
                                        id={`exam-session-${pIndex}-header`}
                                        sx={{
                                            minHeight: "30px", // Thu nhỏ chiều cao tổng thể
                                            "& .MuiAccordionSummary-content": {
                                                margin: "5px 0", // Thu nhỏ khoảng cách nội dung
                                            },
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '95%' }}>
                                            <TextField
                                                value={poetry.poetryName}
                                                name="poetryName"
                                                onChange={(e) => handleInputPoetryChange(e, pIndex)}
                                                onBlur={() => {}}
                                                autoFocus
                                                size="small"
                                                inputProps={{ style: { fontSize: "13px" } }}
                                            />
                                            <Tooltip title="Xóa Ca thi">
                                                <IconButton
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Ngăn sự kiện kích hoạt Accordion khi bấm nút
                                                        handleRemovePoetry(pIndex); // Hàm xử lý xóa
                                                    }}
                                                    sx={{color: "red"}}
                                                >
                                                    <FcFullTrash />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </AccordionSummary>

                                    {/* Chi tiết mỗi ca thi*/}
                                    <AccordionDetails>
                                        <Grid2>
                                            <Grid2 item size={{ xs: 12 }}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    type="datetime-local"
                                                    label="Thời gian bắt đầu"
                                                    name={'startTime'}
                                                    value={poetry.startTime}
                                                    onChange={(e) => handleInputPoetryChange(e, pIndex)}
                                                    error={!!errors[`examSessions[${pIndex}].examTime`]}
                                                    helperText={errors[`examSessions[${pIndex}].examTime`]}
                                                    variant="filled"
                                                    margin="none"
                                                    InputLabelProps={{
                                                        shrink: true, // Đảm bảo label thu nhỏ
                                                    }}
                                                    size="small"
                                                    onBlur={handleBlur}
                                                />
                                            </Grid2>
                                            <Grid2 item size={{ xs: 12 }}>
                                                <TextField
                                                    fullWidth
                                                    type="datetime-local"
                                                    label="Thời gian kết thúc"
                                                    name={'endTime'}
                                                    value={poetry.endTime}
                                                    onChange={(e) => handleInputPoetryChange(e, pIndex)}
                                                    error={!!errors[`examSessions[${pIndex}].examTime`]}
                                                    helperText={errors[`examSessions[${pIndex}].examTime`]}
                                                    variant="filled"
                                                    margin="none"
                                                    size="small"
                                                    InputLabelProps={{
                                                        shrink: true, // Đảm bảo label thu nhỏ
                                                    }}
                                                />
                                            </Grid2>
                                            {/* Danh sách phòng thi */}
                                            <List>
                                                {
                                                    newExam.poetryList[pIndex].roomList.length >= 1 && (newExam.poetryList[pIndex].roomList.map((room, roomIndex) => (
                                                        <Accordion key={roomIndex} 
                                                            sx={{
                                                                border: "1px solid #ccc", // Thêm viền (nếu muốn)
                                                                borderRadius: "5px", // Bo góc (nếu muốn)
                                                                "& .MuiAccordionSummary-root": {
                                                                    minHeight: "30px", // Thu nhỏ chiều cao của tiêu đề
                                                                },
                                                                "& .MuiAccordionDetails-root": {
                                                                    padding: "8px", // Thu nhỏ khoảng cách padding bên trong
                                                                },
                                                            }}
                                                        >
                                                            <AccordionSummary
                                                                expandIcon={<FcExpand />}
                                                                aria-controls={`exam-session-${roomIndex}`}
                                                                id={`room-${roomIndex}-header`}
                                                                sx={{
                                                                    minHeight: "30px", // Thu nhỏ chiều cao tổng thể
                                                                    "& .MuiAccordionSummary-content": {
                                                                        margin: "5px 0", // Thu nhỏ khoảng cách nội dung
                                                                    },
                                                                }}
                                                            >
                                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '95%' }}>
                                                                    <TextField
                                                                        value={room.roomName}
                                                                        name="roomName"
                                                                        onChange={(e) => handleInputRoomChange(e, pIndex, roomIndex)}
                                                                        onBlur={() => {}}
                                                                        autoFocus
                                                                        size="small"
                                                                        inputProps={{ style: { fontSize: "13px" } }}
                                                                    />
                                                                    <Tooltip title="Xóa Phòng thi">
                                                                        <IconButton
                                                                            onClick={(e) => {
                                                                                e.stopPropagation(); // Ngăn sự kiện kích hoạt Accordion khi bấm nút
                                                                                handleRemoveRoom( pIndex,roomIndex); // Hàm xử lý xóa
                                                                            }}
                                                                            sx={{color: "red"}}
                                                                        >
                                                                            <FcFullTrash />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </Box>
                                                            </AccordionSummary>
                                                            <AccordionDetails>
                                                                <Grid2 container spacing={1}>
                                                                    <Grid2 key={roomIndex} item size={{ xs: 12 }}>
                                                                        <TextField
                                                                            fullWidth
                                                                            label={'Địa điểm'}
                                                                            name={'roomAdress'}
                                                                            value={room.roomAdress}
                                                                            onChange={() => {}}
                                                                            error={!!errors[`examSessions[${roomIndex}].roomDetails[${roomIndex}].roomNumber`]}
                                                                            helperText={errors[`examSessions[${roomIndex}].roomDetails[${roomIndex}].roomNumber`]}
                                                                            variant="filled"
                                                                            margin="none"
                                                                            size="small"
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
                                                                    </Grid2>
                                                                    <Grid2 key={roomIndex} item size={{ xs: 12 }}>
                                                                        <Autocomplete
                                                                            multiple
                                                                            id="checkboxes-tags-dem-supervisory"
                                                                            options={listUserData}
                                                                            onChange={(event, username) => {
                                                                                addSupervisoryList(pIndex, roomIndex, username);
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
                                                                                    label="Thêm quản trị viên cho kỳ thi" 
                                                                                    placeholder="Nhập tên quản trị viên" 
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
                                                                    </Grid2>
                                                                </Grid2>
                                                            </AccordionDetails>
                                                        </Accordion>
                                                    )))
                                                }
                                            </List>
                                            <Grid2 item size={{ xs: 12 }}>
                                                <Button
                                                    variant="contained"
                                                    startIcon={<FcPlus />}
                                                    onClick={() => handleAddRoom(pIndex)}
                                                    sx={{fontSize: '12px', textTransform: 'capitalize'}}
                                                >
                                                    Thêm mới phòng thi
                                                </Button>
                                            </Grid2>
                                            {/* Add proctors input field here */}
                                        </Grid2>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </List>
                    </Box>
                </Box>
            </DialogContent>
        </Box>
    );
}

export default TabAddExam;