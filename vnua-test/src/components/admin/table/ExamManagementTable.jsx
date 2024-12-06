import React from "react";
import {
  Box,
  FormControlLabel,
  IconButton,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import PropTypes from "prop-types";
import { FcRatings } from "react-icons/fc";
import { FcTwoSmartphones } from "react-icons/fc";
import { FcAbout } from "react-icons/fc";

// Constants
const DEFAULT_ROWS_PER_PAGE = 10;
const DEFAULT_ORDER = "asc";
const DEFAULT_ORDER_BY = "name";

// Table header configuration
const headCells = [
  {
    id: "examName",
    numeric: false,
    disablePadding: true,
    label: "Tên kỳ thi",
  },
  {
    id: "poetryNum",
    numeric: false,
    disablePadding: false,
    label: "Số ca",
  },
  {
    id: "roomNum",
    numeric: false,
    disablePadding: false,
    label: "Số phòng",
  },
  {
    id: "studentNum",
    numeric: false,
    disablePadding: false,
    label: "Số sinh viên",
  },
  {
    id: "createdUser",
    numeric: false,
    disablePadding: false,
    label: "Người tạo",
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "Thời gian tạo",
  },
  {
    id: "impact",
    numeric: false,
    disablePadding: false,
    label: "",
  },
];

// Helper functions
const createData = (
  id,
  studentCode,
  name,
  className,
  dateOfBirth,
  address,
  lastAction
) => ({
  id,
  studentCode,
  name,
  className,
  dateOfBirth,
  address,
  lastAction,
});

// Sample data
const rows = [
  createData(
    "6455435",
    "Thi giữa học kỳ 1 năm học 2024 2025",
    "5",
    "345",
    "01-01-2003",
    "Hải Phòng",
    "01-01-2024 16:00:00"
  ),
  createData(
    "4535534",
    "Kỳ thi chứng chỉ tin học văn phòng Học viện Nông nghiệp Việt Nam",
    "6",
    "345",
    "01-01-2003",
    "Hà Nội",
    "01-01-2024 16:00:00"
  ),
  createData(
    "3453155",
    "3453155",
    "6",
    "14",
    "01-01-2003",
    "Hải Dương",
    "01-01-2024 16:00:00"
  ),
  createData(
    "3453495",
    "3453495",
    "7",
    "14",
    "01-01-2003",
    "Nam Định",
    "01-01-2024 16:00:00"
  ),
  createData(
    "8762344",
    "8762344",
    "5",
    "23",
    "01-01-2003",
    "Cà Mau",
    "01-01-2024 16:00:00"
  ),
  createData(
    "7868866",
    "7868866",
    "6",
    "34",
    "01-01-2003",
    "Hải Phòng",
    "01-01-2024 16:00:00"
  ),
  createData(
    "7978973",
    "7978973",
    "1",
    "13",
    "01-01-2003",
    "Hải Phòng",
    "01-01-2024 16:00:00"
  ),
  createData(
    "4353553",
    "4353553",
    "3",
    "34",
    "01-01-2003",
    "Hải Phòng",
    "01-01-2024 16:00:00"
  ),
  createData(
    "4353253",
    "4353253",
    "4",
    "14",
    "01-01-2003",
    "Hải Phòng",
    "01-01-2024 16:00:00"
  ),
  createData(
    "6455435",
    "6455435",
    "8",
    "123",
    "01-01-2003",
    "Hải Phòng",
    "01-01-2024 16:00:00"
  ),
  // ... rest of your data
];

// Table Header Component
const EnhancedTableHead = ({ order, orderBy, onRequestSort }) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell
          padding="checkbox"
          sx={{ fontWeight: "bold" }}
          align="center"
        >
          STT
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontWeight: "bold" }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const ExamManagementTable = ({ title }) => {
  const [order, setOrder] = React.useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = React.useState(DEFAULT_ORDER_BY);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="subtitle1"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Thu nhỏ danh sách"
          sx={{ fontSize: "5px", ml: 1 }}
        />

      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows.map((row, index) => {
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.id}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell
                      component="th"
                      id={row.id}
                      scope="row"
                      padding="none"
                      sx={{
                        maxWidth: 350, // Giới hạn chiều rộng
                        overflow: "visible",
                        textOverflow: "ellipsis",
                        whiteSpace: "",
                      }}
                    >
                      {row.studentCode}
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.className}</TableCell>
                    <TableCell align="left">{row.dateOfBirth}</TableCell>
                    <TableCell align="left">{row.address}</TableCell>
                    <TableCell align="left">{row.lastAction}</TableCell>
                    <TableCell>
                      <Tooltip title="Xem báo cáo">
                        <IconButton color="info">
                          <FcRatings />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Thêm mới kỳ thi tương tự">
                        <IconButton color="success">
                          <FcTwoSmartphones />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Xem chi tiết">
                        <IconButton color="warning">
                          <FcAbout />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số hàng mỗi trang:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from} - ${to} trong tổng số ${count} sinh viên ,  Trang ${
              page + 1
            } trên ${Math.ceil(rows.length / rowsPerPage)}`
          }
        />
      </Paper>
    </Box>
  );
};

export default ExamManagementTable;
