import { useEffect, useState } from "react";
import { Box, Button, Card } from "@mui/material";
import ExamPaperTable from "../table/ExamPaperTable";
import DialogAddExamPaper from "../dialog/DialogAddExamPaper";
import api from "../../../services/api/axios.config";
import { toast, ToastContainer } from "react-toastify";

const TabExamPaper = () => {

    const [ isOpenDialogAddExamPaperTab, setIsOpenDialogAddExamPaperTab ] = useState(false);
    const [ examPaperList, setExamPaperList ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ user, setUser ] = useState();

    const handleCloseDialogAddExamPaperTab = () => setIsOpenDialogAddExamPaperTab(false);
    const handleOpenDialogAddExamPaperTab = () => setIsOpenDialogAddExamPaperTab(true);

    // Xử lý lưu đề thi
    const fetchInitDataExamPaper = async () => {
        setIsLoading(true); 
        try {
            const response = await api.get(`/examPaper/getByUsername`);  
            if (response.data.success === false) {
                toast.warning("Hệ thống đang gặp sự cố, vui lòng thử lại sau!", {
                    icon: "⚠️",
                });
            }
            setExamPaperList(response.data.dataList);
        } catch (error) {
            toast.warning("Hệ thống đang gặp sự cố, vui lòng thử lại sau!", {
                icon: "⚠️",
            });
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchInitDataExamPaper();
        const storedUser = localStorage.getItem('user');
        setUser(JSON.parse(storedUser));
    }, []);

    return (
        <Box>
            <ToastContainer icon={true} />
            <Card sx={{p: 2}}>
                <Button 
                    variant="contained"
                    color="success"
                    sx={{textTransform: "capitalize"}}
                    onClick={handleOpenDialogAddExamPaperTab}
                >
                    Thêm mới đề thi
                </Button>
                <Button>

                </Button>
            </Card>

            {/* Bảng hiển thị danh sách các đề thi */}
            <ExamPaperTable examPaperData={examPaperList}/>

            {/* Dialog Thêm mới đề thi */}
            <DialogAddExamPaper 
                onClose={handleCloseDialogAddExamPaperTab} 
                open={isOpenDialogAddExamPaperTab}
                title="Thêm mới đề thi"
                username={JSON.parse(localStorage.getItem('user'))}
                refreshExamPaper={fetchInitDataExamPaper}
            />
        </Box>
    );
}

export default TabExamPaper;