import { 
    Accordion, 
    AccordionSummary, 
    Box, Button, 
    Dialog, 
    DialogActions, 
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
    CircularProgress
} from "@mui/material";
import { useState } from "react";
import { FcExpand, FcPlus } from "react-icons/fc";
import { MdDelete, MdOutlinePlaylistAddCircle } from "react-icons/md";
import api from "../../../services/api/axios.config";
import { ToastContainer, toast } from "react-toastify";

const DialogAddExam = ({isOpen, onClose, title, isEditing}) => {

    const [ errors, setErrors ] = useState({});
    const [ isDisabledInputExamNum, setIsDisabledInputExamNum] = useState(false);
    const [ poetryList, setPoetryList ] = useState([]); // Danh sách ca thi
    const [ examRoomList, setExamRoomList ] = useState([]); // Danh sách phòng thi
    const [ poetryNum, setPoetryNum ] = useState(null); 
    const [ searchResults, setSearchResult ] = useState([]); // Danh sách kết quả tìm kiếm cán bộ coi thi
    const [ selectedUser, setSelectedUser ] = useState([]); // Danh sách cán bộ coi thi được chọn
    const [ keyword, setKeyword ] = useState();
    const [ loadingUser, setLoadingUser ] = useState(false); // Trạng thái loading khi tải danh sách cán bộ coi thi

    const [ newExam, setNewExam ] = useState({ // Đối tượng chứa thông tin của  kỳ thi
        id: "",
        examCode: "",
        examName: "",
        poetryNum: "",
        startDate: "",
        endDate: "",
    });

    // Xử lý đóng dialog
    const handleCloseDialog = () => {
        onClose();
        setNewExam({
          id: "",
          examCode: "",
          examName: "",
          poetryNum: "",
          startDate: "",
          endDate: "",
        });
        // setIsEditing(false);
        setIsDisabledInputExamNum(false);
        setErrors({});
    };

    const handleSubmit = () => {
    }

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
        setPoetryList(Array.from({ length: poetryCount }, (_, index) => ({
            poetryName: `Ca thi ${index + 1}`,
            startTime: "",
            endTime: "",
        })));
    };
    const handleAddNewExamPoetry = () => { // Sự kiện khi click button thêm mới ca thi
        setPoetryList([...poetryList, 
            {
                poetryName: `Ca thi ${poetryList.length + 1}`,
                startTime: "",
                endTime: "",
            }
        ]);
    }
    const handleInputPoetryChange = (e, index) => { // Xử lý thông tin input của các trường thông tin ca thi
        let { name, value } = e.target;
        setPoetryList((prev) => {
            const updatePoetryList = [...prev]; // Sao chép mảng gốc
            updatePoetryList[index] = {
                ...updatePoetryList[index], // Giữ lại các trường thông tin khác
                [name]: value, // Cập nhật theo trường cụ thể
            };
            return updatePoetryList;
        });
    }
    const handleRemovePoetry = (index) => { // Sự kiện khi click button xóa ca thi
        setPoetryList(poetryList.filter((_, i) => i !== index));
        setPoetryNum(poetryNum - 1);
        if (poetryNum - 1 === 0) {
            setIsDisabledInputExamNum(false);
        }
    }

    // Xử lý cập nhật kỳ thi
    const handleUpdateExamSession = (sessionIndex, field, value) => {
        // const updatedSessions = [...newExam.poetryList];
        // updatedSessions[sessionIndex][field] = value;
        // setNewExam((prev) => ({
        //     ...prev,
        //     examSessions: updatedSessions
        // }));
    };

    // Xử lý phòng thi
    const handleAddRoom = (sessionIndex) => {
        setExamRoomList([...examRoomList, {
            roomName: "",
            roomNumber: "",
            studentCount: 0
        }]);
    };
    const handleInputRoomChange = (e, index) => { // Xử lý thông tin input của các trường thông tin ca thi
        let { name, value } = e.target;
        setExamRoomList((prev) => {
            const updateRoomList = [...prev]; // Sao chép mảng gốc
            updateRoomList[index] = {
                ...updateRoomList[index], // Giữ lại các trường thông tin khác
                [name]: value, // Cập nhật theo trường cụ thể
            };
            return updateRoomList;
        });
    }
    const handleBlur = (value) => {
        if (value.trim === '') {
            setErrors(true); // Hiển thị lỗi nếu trường bị để trống
        } else {
            setErrors(false);
        }
    };

    // Xử lý lấy danh sách cán bộ coi thi
    const handleInputLoadUserChange = async (event, value) => {
        setKeyword(value);
        if (value.trim() === "") {
            setSearchResult([]);
            return;
        }

        setLoadingUser(true);
        try {
            const response = await api.get(
                `/user/usersByKeyword=${keyword}`
            );  
            setSearchResult(response.data.dataList);
            console.log(response.data.dataList)
        } catch (error) {
            toast.warning("Hệ thống đang gặp sự cố, vui lòng thử lại sau!", {
                icon: "⚠️",
            });
        } finally {
            setLoadingUser(false);
        }
    }

    return(
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth="80%"
            maxHeight="90%"
            sx={{ "& .MuiDialog-paper": { borderRadius: "15px" } }}
        >
            <ToastContainer icon={true} />
            <DialogTitle alignItems="center" display={"flex"}>
                <FcPlus />
                <Typography variant="h6" ml={1}>
                    {title}
                </Typography>
            </DialogTitle>

            <DialogContent>
                <Box sx={{ display: "flex", gap: 2, mt: 0}}>

                    {/* Form nhập thông tin kỳ thi */}
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <Box container spacing={1}>
                            <Box item width={300} sx={{mb: 2}}>
                                <TextField
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
                                />
                            </Box>
                            <Box item width={300} sx={{mb: 2}}>
                                <TextField
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
                                />
                            </Box>
                            <Box item width={300} sx={{mb: 2}}>
                                <Typography variant="caption" color="info">
                                    Số lượng ca thi chỉ được nhập 1 lần
                                </Typography>
                                <TextField
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
                                    InputProps={{ inputProps: { min: 1 } }} // Chỉ cho phép nhập từ 1 trở lên
                                />
                            </Box>
                            <Box item width={300} sx={{mb: 2}}>
                                <TextField
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
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    size="small"
                                />
                            </Box>
                            <Box item width={300} sx={{mb: 2}}>
                                <TextField
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
                                    }}
                                    size="small"
                                />
                            </Box>
                            {
                                poetryList.length >= 1 ? (
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
                                ) : (
                                    <Box/>
                                )
                            }
                        </Box>
                    </Box>

                    {/* Hiển thị danh sách ca thi */}
                    <Box width={poetryList.length >= 1 ? 550 : 0}>
                        <List>
                            {poetryList.map((poetry, index) => (
                                <Accordion key={index}>
                                    {/* Tiêu đề mỗi ca thi */}
                                    <AccordionSummary
                                        expandIcon={<FcExpand />}
                                        aria-controls={`exam-session-${index}`}
                                        id={`exam-session-${index}-header`}
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
                                                onChange={(e) => handleInputPoetryChange(e, index)}
                                                onBlur={() => {}}
                                                autoFocus
                                                size="small"
                                                inputProps={{ style: { fontSize: "13px" } }}
                                            />
                                            <Tooltip title="Xóa Ca thi">
                                                <IconButton
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Ngăn sự kiện kích hoạt Accordion khi bấm nút
                                                        handleRemovePoetry(index); // Hàm xử lý xóa
                                                    }}
                                                    sx={{color: "red"}}
                                                >
                                                    <MdDelete />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </AccordionSummary>

                                    {/* Chi tiết mỗi ca thi*/}
                                    <AccordionDetails>
                                        <Grid2>
                                            <Grid2 item size={{ xs: 12 }}>
                                                <TextField
                                                    fullWidth
                                                    type="datetime-local"
                                                    label="Thời gian bắt đầu"
                                                    name={'startTime'}
                                                    value={poetry.startTime}
                                                    onChange={(e) => handleInputPoetryChange(e, index)}
                                                    error={!!errors[`examSessions[${index}].examTime`]}
                                                    helperText={errors[`examSessions[${index}].examTime`]}
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
                                                    onChange={(e) => handleInputPoetryChange(e, index)}
                                                    error={!!errors[`examSessions[${index}].examTime`]}
                                                    helperText={errors[`examSessions[${index}].examTime`]}
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
                                                {examRoomList.map((room, roomIndex) => (
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
                                                            id={`exam-session-${roomIndex}-header`}
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
                                                                    onChange={(e) => handleInputRoomChange(e, roomIndex)}
                                                                    onBlur={() => {}}
                                                                    autoFocus
                                                                    size="small"
                                                                    inputProps={{ style: { fontSize: "13px" } }}
                                                                />
                                                                <Typography variant="caption">Phòng thi {roomIndex + 1}</Typography>
                                                                <Tooltip title="Xóa Phòng thi">
                                                                    <IconButton
                                                                        onClick={(e) => {
                                                                            e.stopPropagation(); // Ngăn sự kiện kích hoạt Accordion khi bấm nút
                                                                            handleRemovePoetry(roomIndex); // Hàm xử lý xóa
                                                                        }}
                                                                        sx={{color: "red"}}
                                                                    >
                                                                        <MdDelete />
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
                                                                        name={'roomNumber'}
                                                                        value={room.roomNumber}
                                                                        onChange={(e) => handleInputRoomChange(e, roomIndex)}
                                                                        error={!!errors[`examSessions[${index}].roomDetails[${roomIndex}].roomNumber`]}
                                                                        helperText={errors[`examSessions[${index}].roomDetails[${roomIndex}].roomNumber`]}
                                                                        variant="filled"
                                                                        margin="none"
                                                                        size="small"
                                                                    />
                                                                </Grid2>
                                                                <Grid2 key={roomIndex} item size={{ xs: 12 }}>
                                                                    {/* <TextField
                                                                        fullWidth
                                                                        label={'Cán bộ coi thi'}
                                                                        name={`examSessions[${index}].roomDetails[${roomIndex}].studentCount`}
                                                                        value={room.roomNumber}
                                                                        onChange={(e) => handleInputRoomChange(e, index)}
                                                                        error={!!errors[`examSessions[${index}].roomDetails[${roomIndex}].studentCount`]}
                                                                        helperText={errors[`examSessions[${index}].roomDetails[${roomIndex}].studentCount`]}
                                                                        variant="filled"
                                                                        margin="none"
                                                                        size="small"
                                                                    /> */}
                                                                    <Autocomplete
                                                                        aria-placeholder="dfs"
                                                                        options={searchResults}
                                                                        onInputChange={handleInputLoadUserChange}
                                                                        inputValue={keyword}
                                                                        loading={loadingUser}
                                                                        
                                                                        renderInput={(params) => 
                                                                            <TextField
                                                                                {...params}
                                                                                label="Nhập tên cán bộ coi thi"
                                                                                variant="filled"
                                                                                fullWidth
                                                                                size="small"
                                                                                InputProps={{
                                                                                    ...params.InputProps,
                                                                                    endAdornment: (
                                                                                        <>
                                                                                            {loadingUser ? <CircularProgress size={20}/> : null}
                                                                                            {params.InputProps.endAdornment}
                                                                                        </>
                                                                                    ),
                                                                                }}
                                                                            /> 
                                                                        }
                                                                    />
                                                                </Grid2>
                                                            </Grid2>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                ))}
                                            </List>
                                            <Grid2 item size={{ xs: 12 }}>
                                                <Button
                                                    variant="contained"
                                                    startIcon={<FcPlus />}
                                                    onClick={() => handleAddRoom(index)}
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
            <DialogActions>
                <Button
                    onClick={() => handleCloseDialog()}
                    color="primary"
                    variant="contained"
                    sx={{ mr: 2, mb: 2, textTransform: 'capitalize' }}
                    size="small"
                >
                    Lưu
                </Button>
                <Button
                    onClick={() => handleCloseDialog()}
                    color="primary"
                    variant="contained"
                    sx={{ mr: 2, mb: 2, textTransform: 'capitalize'}}
                    size="small"
                >
                    Hủy
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogAddExam;