import React, { useEffect, useState } from "react";
import MyAppBar from "../../components/admin/appbar/MyAppBar";
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Grid2,
  CircularProgress,
} from "@mui/material";
import {
  Add as AddIcon,
  FileUpload as FileUploadIcon,
  FileDownload as FileDownloadIcon,
} from "@mui/icons-material";
import DialogUploadFile from "../../components/admin/dialog/DialogUploadFileQuestion";
import QuestionAnswerTable from "../../components/admin/table/QuestionAnswerTable";
import api from "../../services/api/axios.config";
import { ToastContainer, toast } from "react-toastify";
import DialogAddAndEditQuestion from "../../components/admin/dialog/DialogAddAndEditQuestion";

const QuestionBank = () => {

  // State cho dialog thêm/sửa câu hỏi
  const [ openDialog, setOpenDialog ] = useState(false);
  const [ selectedQuestion, setSelectedQuestion ] = useState(null);
  const [ currentTab, setCurrentTab ] = useState(0);
  const [ isEditQuestion, setIsEditQuestion ] = useState(false);

  // State cho dialog thêm mới câu hỏi từ file
  const [ openDialogUploadFile, setOpenDialogUploadFile ] = useState(false);
  const [ selectedFile, setSelectedFile ] = useState(null);

  const [questionsData, setQuestionsData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

    // Xử lý mở dialog upload file
    const handleOpenDialogUploadFile = () => setOpenDialogUploadFile(true);

    const handleOpenDialogAddQuestion = () => setOpenDialog(true);

    const handleCloseDialogAddQuestion = () => setOpenDialog(false);

  // Xử lý khi đóng hộp thoại upload file
  const handleCloseDialogUploadFile = () => {
    setOpenDialogUploadFile(false);
    // Đặt lại giá trị của file khi đóng hộp thoại
    setSelectedFile(null);
  };

  // Xử lý chọn câu hỏi và hiển thị dialog để sửa
  const handleClickEditQuestion = (question) => {
    alert("edit")
    setIsEditQuestion(true); // Mở dialog update
    setSelectedQuestion(question);
    setOpenDialog(true);

  }

  // Lấy data chứa dữ liệu tổng quan
  const fetchInitData = async () => {
    setLoadingData(true);
    try {
      const response = await api.get(
      `/question/allBy?page=0&sort=id,asc&size=20&sort=content,desc`
      );
      if (response.data.success === false) {
        toast.warning(`${response.data.message}`, {
          icon: "⚠️",
        });
        return;
      }
      setTotalElements(response.data.data.totalElements);
      setTotalPages(response.data.data.totalPages);
      setQuestionsData(response.data.data.content);
    } catch (error) {
      toast.warning("Hệ thống đang gặp sự cố, vui lòng thử lại sau!", {
        icon: "⚠️",
      });
    } finally {
      setLoadingData(false);
    }
  };


  // Fetch data
  const fetchQuestions = async (params) => {
    setLoadingData(true);
    try {
      const response = await api.get("/question/allBy", {
        params: {
          page: params.page,
          size: params.size,
          sort: params.sort,
        },
      });

      console.log(response);
      if (response.data.success === false) {
        toast.warning(`${response.data.message}`, {
          icon: "⚠️",
        });
        return;
      }
      setTotalElements(response.data.data.totalElements);
      setTotalPages(response.data.data.totalPages);
      setQuestionsData(response.data.data.content);
    } catch (error) {
      toast.warning("Hệ thống đang gặp sự cố, vui lòng thử lại sau!", {
        icon: "⚠️",
      });
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchInitData();
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <ToastContainer icon={true} />

      <Box sx={{ p: 3 }}>
        {/* Thanh tác vụ */}
        <Grid2 container spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <Grid2 item xs={12} md={4}>
            <Grid2 container spacing={1}>
              <Grid2 item xs={4}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => {
                    handleOpenDialogAddQuestion();
                    setIsEditQuestion(false);
                  }}
                  sx={{ textTransform: "none" }}
                >
                  Thêm mới
                </Button>
              </Grid2>
              <Grid2 item xs={4}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<FileUploadIcon />}
                  onClick={() => handleOpenDialogUploadFile()}
                  sx={{ textTransform: "none" }}
                >
                  Tải lên file câu hỏi
                </Button>
              </Grid2>
              <Grid2 item xs={4}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<FileDownloadIcon />}
                  sx={{ textTransform: "none" }}
                >
                  Xuất file câu hỏi
                </Button>
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>
        <QuestionAnswerTable
          onDeleteQuestion={() => {}}
          questions={questionsData}
          isLoading={loadingData}
          totalElements={totalElements}
          onEditQuestion={handleClickEditQuestion}
          totalPages={totalPages}
          onPageChange={fetchQuestions}
          onSortChange={(sortParams) => {
            // Gọi lại API với tham số sắp xếp mới
            fetchQuestions({
              page: 0,
              size: 10,
              sort: `${sortParams.sort},${sortParams.direction}`,
            });
          }}
        />

        {/* Dialog import file cau hoi */}
        <DialogUploadFile
          open={openDialogUploadFile}
          onClose={handleCloseDialogUploadFile}
          title={"Tải lên file câu hỏi"}
          refreshData={fetchInitData}
        />

        {/* Dialog add, edit question */}
        <DialogAddAndEditQuestion
          open={openDialog}
          onClose={handleCloseDialogAddQuestion}
          isEdit={isEditQuestion}
        />
      </Box>
    </div>
  );
};

export default QuestionBank;
