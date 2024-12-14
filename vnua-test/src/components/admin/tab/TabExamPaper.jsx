import { useEffect, useState } from "react";
import { Box, Button, Card } from "@mui/material";
import ExamPaperTable from "../table/ExamPaperTable";
import DialogAddExamPaper from "../dialog/DialogAddExamPaper";

const TabExamPaper = () => {

    const [ isOpenDialogAddExamPaperTab, setIsOpenDialogAddExamPaperTab ] = useState(false);
    const [ user, setUser ] = useState();

    const handleCloseDialogAddExamPaperTab = () => setIsOpenDialogAddExamPaperTab(false);
    const handleOpenDialogAddExamPaperTab = () => setIsOpenDialogAddExamPaperTab(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        setUser(JSON.parse(storedUser));
    }, []);

    return (
        <Box>

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
            <ExamPaperTable/>

            {/* Dialog Thêm mới đề thi */}
            <DialogAddExamPaper 
                onClose={handleCloseDialogAddExamPaperTab} 
                open={isOpenDialogAddExamPaperTab}
                title="Thêm mới đề thi"
                username={JSON.parse(localStorage.getItem('user'))}
            />
        </Box>
    );
}

export default TabExamPaper;