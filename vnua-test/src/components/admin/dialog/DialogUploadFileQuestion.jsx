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
    Grid2,
} from '@mui/material';
import {
    CloudUpload as CloudUploadIcon,
    Info as InfoIcon,
    CheckCircleOutline,
    ErrorOutline,
    Article,
    Delete,
} from '@mui/icons-material';
import api from "../../../services/api/axios.config";
import { ToastContainer, toast } from "react-toastify";

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

const DialogUploadFileQuestion = ({ open, onClose, title, refreshData }) => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [questions, setQuestions] = useState([]);

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


    // Luồng upload file
    const uploadFile = async () => {
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

            if (response.data.success === false) {
                toast.error(`Lỗi khi tải danh sách câu hỏi lên: ${response.data.message}`);
            }

            toast.success("Tải danh sách câu hỏi từ file thành công!", {
                icon: "✅",
            });

            setFile(null);
            setUploading(false);
            setUploadError(null);
            setUploadProgress(0);
            refreshData();
        } catch (error) {
            setUploadError("Có lỗi xảy ra khi tải lên. Vui lòng thử lại!");
        } finally {
            setUploading(false);
        }
    };

    return (
        <Dialog open={open} onClose={closeDialog} maxWidth={questions?.length > 0 ? "" : "sm"} fullWidth>
            <ToastContainer icon={true} />
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                <Grid2 container={questions?.length > 0 ? true : false} spacing={1}>
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
                </Grid2>
            </DialogContent>
        </Dialog>
    );
};

export default DialogUploadFileQuestion;