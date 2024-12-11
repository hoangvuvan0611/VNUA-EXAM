import React, {useState} from "react";
import { Badge, Box, Button, Card, CardContent, Chip, Grid2, IconButton, InputAdornment, MenuItem, Select, TextField, Typography } from "@mui/material";
import ExamPaperSetTable from "../table/ExamPaperSetTable";
import ExamPaperView from "../view/ExamPaperView";
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from "@mui/icons-material/FilterList";

const TabExamPaperSet = () => {

    const [filters, setFilters] = useState(["Design", "Regular", "Full time", "B2B"]);
    const [location, setLocation] = useState("Anywhere");
    const [sortBy, setSortBy] = useState("Date");

    const handleRemoveFilter = (filter) => {
    setFilters(filters.filter((item) => item !== filter));
    };

    const handleClearFilters = () => {
    setFilters([]);
    };

    return (
        <Box sx={{mt: 2}}>
            {/* Khu vực thanh tác vụ, tìm kiếm, thêm mới, import ..... */}

            <Box sx={{ padding: 1}}>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                Job Board
                </Typography>

                {/* Filter Section */}
                <Box
                    display="flex"
                    gap={2}
                    alignItems="center"
                    flexWrap="wrap"
                    sx={{ marginBottom: 2 }}
                >
                    {/* Search Bar */}
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

                    {/* Location Dropdown */}
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

                    {/* Filter Button with Badge */}
                    <IconButton color="primary">
                    <Badge badgeContent={filters.length} color="secondary">
                        <FilterListIcon />
                    </Badge>
                    </IconButton>
                </Box>

                {/* Active Filters */}
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

                {/* Result Info */}
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
            </Box>

            {/* Bảng hiển thị danh sách bộ đề */}
            <ExamPaperSetTable title={"Danh sách các bộ đề"}/>
        </Box>
    );
}

export default TabExamPaperSet;