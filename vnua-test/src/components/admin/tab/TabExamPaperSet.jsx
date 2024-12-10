import { Box } from "@mui/material";
import ExamPaperSetTable from "../table/ExamPaperSetTable";
import ExamPaperView from "../view/ExamPaperView";

const TabExamPaperSet = () => {
    return (
        <Box>
            Vũ Văn Hoàng
            <ExamPaperSetTable title={"Danh sách các bộ đề"}/>
        </Box>
    );
}

export default TabExamPaperSet;