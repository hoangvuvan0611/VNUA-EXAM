import React, { useState, useMemo } from "react";
import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Stack,
  TableSortLabel,
  InputAdornment,
  TablePagination,
  FormControlLabel,
  Switch,
  Tooltip,
  Checkbox,
  Toolbar,
  alpha,
} from "@mui/material";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Delete,
} from "@mui/icons-material";

const PropertyEditIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={""} fill={"none"} {...props}>
      <path d="M21 11.5C21 7.02166 21 4.78249 19.6088 3.39124C18.2175 2 15.9783 2 11.5 2C7.02166 2 4.78249 2 3.39124 3.39124C2 4.78249 2 7.02166 2 11.5C2 15.9783 2 18.2175 3.39124 19.6088C4.72972 20.9472 6.85301 20.998 11 20.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M2 7H21" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 16H11.5M6 16H7M10 12H16M6 12H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21.2633 14.8717C20.3622 13.8651 19.8215 13.925 19.2208 14.1048C18.8003 14.1647 17.3585 15.8422 16.7578 16.3765C15.7714 17.3478 14.7806 18.3479 14.7153 18.4784C14.5285 18.781 14.3548 19.3172 14.2707 19.9163C14.1145 20.815 13.8041 21.7815 14.1746 21.9133C14.3548 22.153 15.2559 21.8335 16.157 21.7017C16.7578 21.5938 17.1783 21.474 17.4787 21.2943C17.8992 21.0426 18.6801 20.1559 20.0258 18.8379C20.8697 17.9521 21.6838 17.34 21.9241 16.7409C22.1644 15.8422 21.804 15.3629 21.2633 14.8717Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
);

const DeletePutBackIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={""} fill={"none"} {...props}>
      <path d="M4.47461 6.10018L5.31543 18.1768C5.40886 19.3365 6.28178 21.5536 8.51889 21.8022C10.756 22.0507 15.2503 21.9951 16.0699 21.9951C16.8895 21.9951 19.0128 21.4136 19.0128 19.0059C19.0128 16.5756 16.9833 15.9419 15.7077 15.9635H12.0554M12.0554 15.9635C12.0607 15.7494 12.1515 15.5372 12.3278 15.3828L14.487 13.4924M12.0554 15.9635C12.0497 16.1919 12.1412 16.4224 12.33 16.5864L14.487 18.4609M19.4701 5.82422L19.0023 13.4792" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 5.49561H21M16.0555 5.49561L15.3729 4.08911C14.9194 3.15481 14.6926 2.68766 14.3015 2.39631C14.2148 2.33168 14.1229 2.2742 14.0268 2.22442C13.5937 2 13.0739 2 12.0343 2C10.9686 2 10.4358 2 9.99549 2.23383C9.89791 2.28565 9.80479 2.34547 9.7171 2.41265C9.32145 2.7158 9.10044 3.20004 8.65842 4.16854L8.05273 5.49561" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const LockedIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={""} fill={"none"} {...props}>
      <path d="M2.5 8.18689C2.60406 6.08717 2.91537 4.77804 3.84664 3.84676C4.77792 2.91549 6.08705 2.60418 8.18677 2.50012M21.5 8.18689C21.3959 6.08717 21.0846 4.77804 20.1534 3.84676C19.2221 2.91549 17.9129 2.60418 15.8132 2.50012M15.8132 21.5001C17.9129 21.396 19.2221 21.0847 20.1534 20.1535C21.0846 19.2222 21.3959 17.913 21.5 15.8133M8.18676 21.5001C6.08705 21.396 4.77792 21.0847 3.84664 20.1535C2.91537 19.2222 2.60406 17.913 2.5 15.8133" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 10.5545C9.5 9.7128 9.36781 8.41337 9.87602 7.65569C10.9985 5.98217 13.38 6.20448 14.22 7.83797C14.6323 8.63969 14.4769 9.76055 14.496 10.5545M9.5 10.5545C8.20267 10.5545 7.93843 11.2972 7.74002 11.8797C7.55687 12.535 7.37042 14.0997 7.65602 15.8142C7.86969 16.9064 8.70479 17.3868 9.42297 17.4477C10.1098 17.5059 13.0097 17.4837 13.8492 17.4837C15.1501 17.4837 15.9624 17.1977 16.344 15.887C16.5272 14.8676 16.5773 13.0447 16.272 11.8797C15.8676 10.7146 15.0523 10.5545 14.496 10.5545M9.5 10.5545C10.8736 10.5 13.7107 10.5108 14.496 10.5545" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

// Component cho mỗi hàng và phần collapse
const Row = ({ row, index, onDeleteQuestion, onEditQuestion, onToggleLock, selected, handleClick, isSelected }) => {
  const [open, setOpen] = useState(false);
  const labelId = `enhanced-table-checkbox-${index}`;

  return (
    <>
      <TableRow
        hover
        role="checkbox"
        aria-checked={isSelected}
        tabIndex={-1}
        selected={isSelected}
        
      >
        <TableCell padding="checkbox">
          <Checkbox
            color="success"
            checked={isSelected}
            onChange={(event) => handleClick(event, row.id)}
            inputProps={{
              'aria-labelledby': labelId,
            }}
          />
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{index}</TableCell>
        <TableCell>{row.content}</TableCell>
        <TableCell>{row.subject}</TableCell>
        <TableCell>{row.chapter}</TableCell>
        <TableCell>{row.type}</TableCell>
        <TableCell>{row.level}</TableCell>
        <TableCell>
          <Tooltip title="Sửa câu hỏi">
            <IconButton color="info" onClick={() => onEditQuestion(row.id)}>
              <PropertyEditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Cho phép mọi người cùng thấy">
            <IconButton color="secondary" onClick={() => onToggleLock(row.id)}>
              <LockedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa câu hỏi">
            <IconButton color="error" onClick={() => onDeleteQuestion(row.id)}>
              <DeletePutBackIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="body1" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>
                Đáp án
              </Typography>
              <Table size="small" aria-label="answers">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Lựa chọn</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Nội dung</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Đúng/Sai</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Giải thích</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.answers.map((answer, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        backgroundColor: answer.isCorrect
                          ? "rgba(46, 125, 50, 0.1)"
                          : "inherit",
                      }}
                    >
                      <TableCell>{String.fromCharCode(65 + index)}</TableCell>
                      <TableCell>{answer.content}</TableCell>
                      <TableCell>{answer.isCorrect ? "Đúng" : "Sai"}</TableCell>
                      <TableCell>{answer.explanation}</TableCell>
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

// Table Toolbar Component
const EnhancedTableToolbar = ({ numSelected }) => (
  <Toolbar
    sx={{
      pl: { sm: 2 },
      pr: { xs: 1, sm: 1 },
      ...(numSelected > 0 && {
        bgcolor: (theme) =>
          alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
      }),
    }}
  >
    {numSelected > 0 ? (
      <Typography
        sx={{ flex: '1 1 100%' }}
        color="inherit"
        variant="subtitle1"
        component="div"
      >
        {numSelected} đã chọn
      </Typography>
    ) : (
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Danh sách câu hỏi
      </Typography>
    )}

    {numSelected > 0 ? (
      <Tooltip title="Delete">
        <IconButton>
          <Delete />
        </IconButton>
      </Tooltip>
    ) : (
      <Tooltip title="Lọc danh sách">
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    )}
  </Toolbar>
);

// Constants
const DEFAULT_ROWS_PER_PAGE = 10;

// Component chính
const QuestionTable = ({ onDeleteQuestion }) => {
  // States for filtering, sorting and searching
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  const [filterChapter, setFilterChapter] = useState("");
  const [filterLevel, setFilterLevel] = useState("");
  const [orderBy, setOrderBy] = useState("content");
  const [order, setOrder] = useState("asc");

  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Dữ liệu mẫu
  const initialRows = [
    {
      id: "14334",
      content: "Đâu là thủ đô của Việt Nam?",
      subject: "Địa lý",
      chapter: "Chương 1",
      type: "1 đáp án đúng",
      level: "Dễ",
      answers: [
        {
          content: "Hà Nội",
          isCorrect: true,
          explanation: "Hà Nội là thủ đô của Việt Nam từ năm 1945",
        },
        {
          content: "TP. Hồ Chí Minh",
          isCorrect: false,
          explanation:
            "TP. Hồ Chí Minh là thành phố lớn nhất nhưng không phải thủ đô",
        },
        {
          content: "Đà Nẵng",
          isCorrect: false,
          explanation: "Đà Nẵng là thành phố trực thuộc trung ương",
        },
      ],
    },
    {
      id: "14335",
      content: "Quá trình nào sau đây là quá trình tổng hợp?",
      subject: "Hóa học",
      chapter: "Chương 2",
      type: "1 đáp án đúng",
      level: "Khó",
      answers: [
        {
          content: "2H2 + O2 → 2H2O",
          isCorrect: true,
          explanation: "Đây là phản ứng tổng hợp nước từ khí H2 và O2",
        },
        {
          content: "CaCO3 → CaO + CO2",
          isCorrect: false,
          explanation: "Đây là phản ứng phân hủy",
        },
      ],
    },
  ];

  // Get unique values for filters
  const subjects = [...new Set(initialRows.map((row) => row.subject))];
  const chapters = [...new Set(initialRows.map((row) => row.chapter))];
  const levels = [...new Set(initialRows.map((row) => row.level))];

  // Sorting function
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Filter and sort data
  const filteredAndSortedRows = useMemo(() => {
    return initialRows
      .filter((row) => {
        const matchesSearch = row.content
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesSubject = filterSubject
          ? row.subject === filterSubject
          : true;
        const matchesChapter = filterChapter
          ? row.chapter === filterChapter
          : true;
        const matchesLevel = filterLevel ? row.level === filterLevel : true;
        return (
          matchesSearch && matchesSubject && matchesChapter && matchesLevel
        );
      })
      .sort((a, b) => {
        const isAsc = order === "asc";
        if (isAsc) {
          return a[orderBy] < b[orderBy] ? -1 : 1;
        } else {
          return a[orderBy] > b[orderBy] ? -1 : 1;
        }
      });
  }, [searchTerm, filterSubject, filterChapter, filterLevel, order, orderBy]);

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const [selected, setSelected] = React.useState([]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = initialRows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  // Xử lý chọn một dòng
  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else if (selectedIndex === 0) {
      newSelected = selected.slice(1);
    } else if (selectedIndex === selected.length - 1) {
      newSelected = selected.slice(0, -1);
    } else if (selectedIndex > 0) {
      newSelected = [
        ...selected.slice(0, selectedIndex),
        ...selected.slice(selectedIndex + 1),
      ];
    }

    setSelected(newSelected);
  };

  // Kiểm tra một dòng có được chọn không
  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <Box sx={{ width: "100%" }}>
      {/* Toolbar với Search và Filters */}
      <Paper sx={{ mb: 2, p: 2 }}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            variant="outlined"
            label="Tìm kiếm câu hỏi"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Stack direction="row" spacing={2}>
            <FormControl fullWidth>
              <InputLabel>Môn học</InputLabel>
              <Select
                value={filterSubject}
                label="Môn học"
                onChange={(e) => setFilterSubject(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <FilterListIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value="">Tất cả</MenuItem>
                {subjects.map((subject) => (
                  <MenuItem key={subject} value={subject}>
                    {subject}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Chương</InputLabel>
              <Select
                value={filterChapter}
                label="Chương"
                onChange={(e) => setFilterChapter(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <FilterListIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value="">Tất cả</MenuItem>
                {chapters.map((chapter) => (
                  <MenuItem key={chapter} value={chapter}>
                    {chapter}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Mức độ</InputLabel>
              <Select
                value={filterLevel}
                label="Mức độ"
                onChange={(e) => setFilterLevel(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <FilterListIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value="">Tất cả</MenuItem>
                {levels.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Stack>
      </Paper>

      {/* Table */}
      <EnhancedTableToolbar numSelected={selected.length}/>
      <TableContainer component={Paper}>
        <FormControlLabel
            control={<Switch checked={dense} color="success" onChange={handleChangeDense} />}
            label="Thu nhỏ danh sách"
            sx={{ml: 1}}
        />
        <Table aria-label="collapsible table" size={dense ? 'small' : 'medium'}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="success"
                  indeterminate={selected.length > 0 && selected.length < initialRows.length}
                  checked={initialRows.length > 0 && selected.length === initialRows.length}
                  onChange={handleSelectAllClick}
                  inputProps={{
                    'aria-label': 'select all desserts',
                  }}
                />
              </TableCell>
              <TableCell
                sx={{fontWeight:"bold"}}
              >
                Phương án
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "content"}
                  direction={orderBy === "content" ? order : "asc"}
                  onClick={() => handleRequestSort("content")}
                  sx={{ fontWeight: "bold" }}
                >
                  STT
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "content"}
                  direction={orderBy === "content" ? order : "asc"}
                  onClick={() => handleRequestSort("content")}
                  sx={{ fontWeight: "bold" }}
                >
                  Nội dung câu hỏi
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "subject"}
                  direction={orderBy === "subject" ? order : "asc"}
                  onClick={() => handleRequestSort("subject")}
                  sx={{ fontWeight: "bold" }}
                >
                  Môn học
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "chapter"}
                  direction={orderBy === "chapter" ? order : "asc"}
                  onClick={() => handleRequestSort("chapter")}
                  sx={{ fontWeight: "bold" }}
                >
                  Chương
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "level"}
                  direction={orderBy === "level" ? order : "asc"}
                  onClick={() => handleRequestSort("level")}
                  sx={{ fontWeight: "bold" }}
                >
                  Loại câu hỏi
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "level"}
                  direction={orderBy === "level" ? order : "asc"}
                  onClick={() => handleRequestSort("level")}
                  sx={{ fontWeight: "bold" }}
                >
                  Mức độ
                </TableSortLabel>
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Không tìm thấy câu hỏi phù hợp
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedRows.map((row, index) => (
                <Row 
                  key={index} 
                  row={row} 
                  index={index + 1} 
                  onDeleteQuestion={onDeleteQuestion} 
                  selected={selected} 
                  handleClick={handleClick} 
                  isSelected={isSelected(row.id)}
                />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={filteredAndSortedRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Số hàng mỗi trang:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from} - ${to} trong tổng số ${count} câu hỏi, Trang ${
            page + 1
          } trên ${Math.ceil(filteredAndSortedRows.length / rowsPerPage)}`
        }
      />
    </Box>
  );
};

export default QuestionTable;
