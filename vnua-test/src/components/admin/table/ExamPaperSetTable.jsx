import { useState } from "react";
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
} from "@mui/material";
import { visuallyHidden } from '@mui/utils';
import PropTypes from 'prop-types';
import { FcRatings } from "react-icons/fc";
import { FcTwoSmartphones } from "react-icons/fc";
import { FcAbout } from "react-icons/fc";

// Constants
const DEFAULT_ROWS_PER_PAGE = 10;
const DEFAULT_ORDER = 'asc';
const DEFAULT_ORDER_BY = 'name';

// Table header configuration
const headCells = [
  {
    id: 'examPaperSetName',
    numeric: false,
    disablePadding: true,
    label: 'Tên bộ đề',
  },
  {
    id: 'subjectName',
    numeric: false,
    disablePadding: false,
    label: 'Môn học',
  },
  {
    id: 'examPaperNum',
    numeric: false,
    disablePadding: false,
    label: 'Số lượng đề',
  },
  {
    id: 'createdUser',
    numeric: false,
    disablePadding: false,
    label: 'Người tạo',
  },
  {
    id: 'createdAt',
    numeric: false,
    disablePadding: false,
    label: 'Thời gian tạo',
  },
  {
    id: 'updatedAt',
    numeric: false,
    disablePadding: false,
    label: 'Cập nhật lần cuối',
  },
  {
    id: 'impact',
    numeric: false,
    disablePadding: false,
    label: '',
  },
];

// Table Header Component
const EnhancedTableHead = ({
  order,
  orderBy,
  onRequestSort,
}) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" sx={{fontWeight: 'bold'}} align="center">
            STT
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{fontWeight: 'bold'}}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const ExamPaperSetTable = ({ title, examPaperSetData }) => {


    const [order, setOrder] = useState(DEFAULT_ORDER);
    const [orderBy, setOrderBy] = useState(DEFAULT_ORDER_BY);
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
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
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - examPaperSetData?.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Thu nhỏ danh sách"
        sx={{fontSize: '12px', ml: 1}}
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
              rowCount={examPaperSetData?.length}
            />
            <TableBody>
              {examPaperSetData?.map((examPaperSet, index) => {
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={examPaperSet.id}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell>
                        {index + 1}
                    </TableCell>
                    <TableCell
                      component="th"
                      id={examPaperSet.id}
                      scope="row"
                      padding="none"
                      sx={{
                        maxWidth: 350, // Giới hạn chiều rộng
                        overflow: "visible",
                        textOverflow: "ellipsis",
                        whiteSpace: ""
                      }}
                    >
                      {examPaperSet.title}
                    </TableCell>
                    <TableCell align="left">{examPaperSet.subjectName}</TableCell>
                    <TableCell align="left">{examPaperSet.examPaperNum}</TableCell>
                    <TableCell align="left">{examPaperSet.createdUser}</TableCell>
                    <TableCell align="left">{examPaperSet.createdAt}</TableCell>
                    <TableCell align="left">{examPaperSet.updatedAt}</TableCell>
                    <TableCell>
                      <Tooltip title="Xem báo cáo">
                        <IconButton color="info">
                            <FcRatings />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Thêm mới ca thi tương tự">
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
          count={examPaperSetData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số hàng mỗi trang:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from} - ${to} trong tổng số ${count} sinh viên ,  Trang ${
              page + 1
            } trên ${Math.ceil(examPaperSetData?.length / rowsPerPage)}`
          }
        />
      </Paper>
    </Box>
  );
};

export default ExamPaperSetTable;
