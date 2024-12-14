import { useEffect, useState } from "react";
import { Box, Button, Card } from "@mui/material";
import ExamPaperSetTable from "../table/ExamPaperSetTable";
import DialogAddExamPaperSet from "../dialog/DialogAddExamPaperSet";
import { toast, ToastContainer } from "react-toastify";
import api from "../../../services/api/axios.config";

const TabExamPaperSet = () => {
    const [ isOpenDialogAddExamPaperTab, setIsOpenDialogAddExamPaperTab ] = useState(false);
    const [ examPaperSetList, setExamPaperSetList ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);

    const handleCloseDialogAddExamPaperTab = () => setIsOpenDialogAddExamPaperTab(false);
    const handleOpenDialogAddExamPaperTab = () => setIsOpenDialogAddExamPaperTab(true);

    // Xử lý lưu đề thi
    const fetchInitDataExamPaper = async () => {
        setIsLoading(true); 
        try {
            const response = await api.get(`/examPaperSet/getByUsername`);  
            if (response.data.success === false) {
                toast.warning("Hệ thống đang gặp sự cố, vui lòng thử lại sau!", {
                    icon: "⚠️",
                });
            }
            console.log(response)
            setExamPaperSetList(response.data.dataList);
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
    }, []);

    return (
        <Box sx={{mt: 2}}>
            <ToastContainer icon={true} />
            <Card sx={{p: 2}}>
                <Button 
                    variant="contained"
                    color="success"
                    sx={{textTransform: "capitalize"}}
                    onClick={handleOpenDialogAddExamPaperTab}
                >
                    Thêm mới bộ đề
                </Button>
                <Button>

                </Button>
            </Card>
            {/* Khu vực thanh tác vụ, tìm kiếm, thêm mới, import ..... */}


            {/* <Box sx={{ padding: 1}}>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                Job Board
                </Typography>

                <Box
                    display="flex"
                    gap={2}
                    alignItems="center"
                    flexWrap="wrap"
                    sx={{ marginBottom: 2 }}
                >
                    <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
                    <TextField
                        placeholder="Nhập tên bộ đề để tìm kiếm"
                        variant="outlined"
                        fullWidth
                        size="small"
                        InputProps={{
                            startAdornment: <SearchIcon sx={{ marginRight: 1 }} />,
                        }}
                    />
                    </Box>

                    <Box>
                    <Select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        size="small"
                        sx={{ width: 150 }}
                        placeholder="Lọc theo môn học"
                    >
                        <MenuItem value="Anywhere">Anywhere</MenuItem>
                        <MenuItem value="Remote">Remote</MenuItem>
                        <MenuItem value="On-site">On-site</MenuItem>
                    </Select>
                    </Box>

                    <IconButton color="primary">
                    <Badge badgeContent={filters.length} color="secondary">
                        <FilterListIcon />
                    </Badge>
                    </IconButton>
                </Box>
                <Box display="flex" gap={1} flexWrap="wrap" alignItems="center">
                    {filters.map((filter, index) => (
                    <Chip
                        key={index}
                        label={filter}
                        onDelete={() => handleRemoveFilter(filter)}
                        color="primary"
                    />
                    ))}
                    {filters.length > 0 && (
                    <Button onClick={handleClearFilters} variant="text">
                        Clear All
                    </Button>
                    )}
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginTop: 4 }}>
                    <Typography variant="body1">{`Tìm thấy 20 bộ đề có kết quả khớp!`}</Typography>

                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body2">Sort by:</Typography>
                            <Select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                size="small"
                                sx={{ width: 100 }}
                            >
                            <MenuItem value="Date">Date</MenuItem>
                            <MenuItem value="Relevance">Relevance</MenuItem>
                        </Select>
                    </Box>
                </Box>
            </Box> */}

            {/* Bảng hiển thị danh sách bộ đề */}
            <ExamPaperSetTable title={"Danh sách các bộ đề"} examPaperSetData={examPaperSetList}/>

            {/* Dialog thêm mới bộ đề */}
            <DialogAddExamPaperSet 
                onClose={handleCloseDialogAddExamPaperTab} 
                open={isOpenDialogAddExamPaperTab}
                title="Thêm mới bộ đề thi"
                username={JSON.parse(localStorage.getItem('user'))}
                // refreshExamPaper={fetchInitDataExamPaper}
            />
        </Box>
    );
}

export default TabExamPaperSet;