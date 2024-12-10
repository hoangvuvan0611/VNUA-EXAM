import React, {useState} from "react";
import MyAppBar from "../../components/admin/appbar/MyAppBar";
import { Box, Tab, Tabs } from "@mui/material";
import TabExamPaperSet from "../../components/admin/tab/TabExamPaperSet";
import TabExamPaper from "../../components/admin/tab/TabExamPaper";

const ExamPaperBank = () => {

    const [ activeTab, setActiveTab ] = useState(0);

    return (
        <Box style={{position: 'relative'}}>
            <Box className="shadow-sm bg-white" style={{ position: 'sticky', top: 0, left: 0, right: 0, zIndex: 39 }}>
                <MyAppBar label={'Quản lý đề thi'}/>
            </Box>

            {/* Tiêu đề tab */}
            <Tabs
                value={activeTab} 
                onChange={(e, newValue) => setActiveTab(newValue)}
                sx={{ mb: 2, mt: 2 }}
            >
                <Tab
                    label="Danh sách bộ đề" 
                    sx={{
                        backgroundColor: 'transparent',
                        '&.Mui-selected': {
                            backgroundColor: '#2E8B21',
                            color: 'white',
                        },
                        borderRadius: '5px',
                        textTransform: 'capitalize'
                    }} 
                />
                <Tab
                    label="Danh sách đề thi" 
                    sx={{
                        backgroundColor: 'transparent',
                        '&.Mui-selected': {
                            backgroundColor: '#2E8B21',
                            color: 'white',
                        },
                        borderRadius: '5px',
                        textTransform: 'capitalize'
                    }}
                />
            </Tabs>

            {/* Nội dung tab danh sách bộ đề */}
            {activeTab === 0 && (
                <TabExamPaperSet/>
            )}

            {/* Nội dung danh sách các đề thi riêng lẻ */}
            {activeTab === 1 && (
                <TabExamPaper/>
            )}
        </Box>
    );
}

export default ExamPaperBank;