import React, { useState } from "react";
import {
    Dialog,
    Button,
    DialogContent,
    DialogTitle,
    Box,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    styled,
    LinearProgress,
    keyframes,
    Tooltip,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Collapse,
    Grid2,
} from '@mui/material';
import {
    CloudUpload as CloudUploadIcon,
    Info as InfoIcon,
    CheckCircleOutline,
    ErrorOutline,
    Article,
    Delete,
    KeyboardArrowDown,
    KeyboardArrowUp,
} from '@mui/icons-material';
import api from "../../../services/api/axios.config";

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

// Component cho mỗi hàng có thể mở rộng
const Row = ({ row, index, pages, rowsPerPage }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {((pages) * rowsPerPage) + index + 1}
                </TableCell>
                <TableCell>{row.question}</TableCell>
                <TableCell align="right">{row.answers?.length || 0} câu trả lời</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Câu trả lời
                            </Typography>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>STT</TableCell>
                                        <TableCell>Nội dung</TableCell>
                                        <TableCell align="right">Đúng/Sai</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.answers?.map((answer, answerIndex) => (
                                        <TableRow key={answerIndex}>
                                            <TableCell>{answerIndex + 1}</TableCell>
                                            <TableCell>{answer}</TableCell>
                                            <TableCell align="right">
                                                {answer.isCorrect ? (
                                                    <CheckCircleOutline color="success" />
                                                ) : (
                                                    <ErrorOutline color="error" />
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

const DialogUploadFile = ({ open, onClose, title }) => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [questions, setQuestions] = useState([]);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const closeDialog = () => {
        onClose();
        setFile(null);
        setUploadProgress(0);
        setUploadError(null);
        setQuestions([]);
    };

    const allowedFileTypes = ['.xls', '.xlsx', '.json', '.csv'];

    const deleteFileSelected = () => {
        setFile(null);
        setUploadError(null);
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

    return (
        <Dialog open={open} onClose={closeDialog} maxWidth={questions.length > 0 ? "" : "sm"} fullWidth>
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                <Grid2 container={questions.length > 0 ? true : false} spacing={1}>
                    {/* Upload Section */}
                    <Grid2 item xs={12} md={3}>
                        <Box sx={{ mb: 1 }}>
                            <Typography variant="subtitle2">
                                Lưu ý:
                            </Typography>
                            <List dense>
                                <ListItem>
                                    <InfoIcon color="warning" sx={{ mr: 1 }} />
                                    <ListItemText primary="Kích thước tối đa: 10MB" />
                                </ListItem>
                                <ListItem>
                                    <InfoIcon color="warning" sx={{ mr: 1 }} />
                                    <ListItemText primary={`Định dạng file được hỗ trợ: ${allowedFileTypes.join(', ')}`} />
                                </ListItem>
                            </List>
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
                            <Typography variant="body1" color="text.secondary">
                                Click để chọn file hoặc kéo thả file vào đây
                            </Typography>
                        </UploadBox>

                        {file !== null && (
                            <ListItem>
                                <ListItemIcon>
                                    {uploadProgress === 100 ? (
                                        uploadError ? (
                                            <ErrorOutline color="error" />
                                        ) : (
                                            <CheckCircleOutline color="success" />
                                        )
                                    ) : (
                                        <Article />
                                    )}
                                </ListItemIcon>
                                <ListItemText
                                    primary={file.name}
                                    secondary={`${(file.size / 1024 / 1024).toFixed(2)} MB`}
                                    sx={{ color: 'Highlight' }}
                                />
                                <Tooltip title="Xóa file">
                                    <IconButton onClick={deleteFileSelected}>
                                        <Delete color="action" />
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

                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                            <Button onClick={closeDialog} variant="contained" sx={{ textTransform: 'none' }}>
                                Hủy
                            </Button>
                            <Button
                                onClick={uploadFile}
                                disabled={file === null || uploading}
                                variant="contained"
                                startIcon={<CloudUploadIcon />}
                                sx={{ textTransform: 'none' }}
                            >
                                {uploading ? 'Đang tải...' : "Tải file lên"}
                            </Button>
                        </Box>
                    </Grid2>

                    {/* Questions Table Section */}
                    {/* {questions.length > 0 ? (
                        <Grid item xs={12} md={9}>
                            <Typography variant="body1" gutterBottom>
                                Danh sách {questions.length} câu hỏi
                            </Typography>
                            <TableContainer component={Paper} sx={{ maxHeight: 420, overflow: 'auto' }}>
                                <Table stickyHeader size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            <TableCell sx={{fontWeight: 'bold'}}>STT</TableCell>
                                            <TableCell sx={{fontWeight: 'bold'}}>Câu hỏi</TableCell>
                                            <TableCell align="right" sx={{fontWeight: 'bold'}}>trả lời</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {questions
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((question, index) => (
                                            <Row key={index} row={question} index={index} pages={page} rowsPerPage={rowsPerPage}/>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={questions.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                labelRowsPerPage="Số hàng mỗi trang"
                                labelDisplayedRows={({ from, to, count }) => `${from} - ${to} trong tổng số ${count} sinh viên ,  Trang ${page + 1} trên ${Math.ceil(questions.length / rowsPerPage)}`}
                            />
                            <DialogActions>
                                <Button
                                    onClick={closeDialog}
                                    color="primary"
                                    variant="contained"
                                    sx={{ mr: 2 }}
                                >
                                Xong
                                </Button>
                                    <Button
                                    onClick={closeDialog}
                                    color="primary"
                                    variant="contained"
                                    sx={{ mr: 2 }}
                                    >
                                    Hủy
                                </Button>
                            </DialogActions>
                        </Grid>
                    ) : null} */}
                </Grid2>
            </DialogContent>
        </Dialog>
    );
};

export default DialogUploadFile;