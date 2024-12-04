// components/Table/EnhancedTable.jsx
import * as React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  FormControlLabel,
  Switch
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import PropTypes from 'prop-types';

// Constants
const DEFAULT_ROWS_PER_PAGE = 10;
const DEFAULT_ORDER = 'asc';
const DEFAULT_ORDER_BY = 'name';

// Table header configuration
const headCells = [
  {
    id: 'studentCode',
    numeric: false,
    disablePadding: true,
    label: 'Mã SV',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Họ tên SV',
  },
  {
    id: 'className',
    numeric: false,
    disablePadding: false,
    label: 'Lớp',
  },
  {
    id: 'dateOfBirth',
    numeric: false,
    disablePadding: false,
    label: 'Ngày sinh',
  },
  {
    id: 'address',
    numeric: false,
    disablePadding: false,
    label: 'Quê quán',
  },
  {
    id: 'lastAction',
    numeric: false,
    disablePadding: false,
    label: 'Hoạt động gần nhất',
  },
  {
    id: 'impact',
    numeric: false,
    disablePadding: false,
    label: '',
  },
];

// Helper functions
const createData = (id, studentCode, name, className, dateOfBirth, address, lastAction) => ({
    id,
    studentCode,
    name,
    className,
    dateOfBirth,
    address,
    lastAction,
});

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
};

const getComparator = (order, orderBy) =>
  order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);

// Sample data
const rows = [
  createData('6455435', '6455435', 'A', 'K66CNPMA', '01-01-2003', 'Hải Phòng', '01-01-2024 16:00:00'),
  createData('4535534', '4535534', 'B', 'K66CNPMA', '01-01-2003', 'Hà Nội', '01-01-2024 16:00:00'),
  createData('3453155', '3453155', 'C', 'K66CNPMA', '01-01-2003', 'Hải Dương', '01-01-2024 16:00:00'),
  createData('3453495', '3453495', 'D', 'K66CNPMA', '01-01-2003', 'Nam Định', '01-01-2024 16:00:00'),
  createData('8762344', '8762344', 'E', 'K66CNPMA', '01-01-2003', 'Cà Mau', '01-01-2024 16:00:00'),
  createData('7868866', '7868866', 'F', 'K66CNPMA', '01-01-2003', 'Hải Phòng', '01-01-2024 16:00:00'),
  createData('7978973', '7978973', 'G', 'K66CNPMA', '01-01-2003', 'Hải Phòng', '01-01-2024 16:00:00'),
  createData('4353553', '4353553', 'H', 'K66CNPMA', '01-01-2003', 'Hải Phòng', '01-01-2024 16:00:00'),
  createData('4353253', '4353253', 'I', 'K66CNPMA', '01-01-2003', 'Hải Phòng', '01-01-2024 16:00:00'),
  createData('6455435', '6455435', 'A', 'K66CNPMA', '01-01-2003', 'Hải Phòng', '01-01-2024 16:00:00'),
  createData('4535534', '4535534', 'B', 'K66CNPMA', '01-01-2003', 'Hà Nội', '01-01-2024 16:00:00'),
  createData('3453155', '3453155', 'C', 'K66CNPMA', '01-01-2003', 'Hải Dương', '01-01-2024 16:00:00'),
  createData('3453495', '3453495', 'D', 'K66CNPMA', '01-01-2003', 'Nam Định', '01-01-2024 16:00:00'),
  createData('8762344', '8762344', 'E', 'K66CNPMA', '01-01-2003', 'Cà Mau', '01-01-2024 16:00:00'),
  createData('7868866', '7868866', 'F', 'K66CNPMA', '01-01-2003', 'Hải Phòng', '01-01-2024 16:00:00'),
  createData('7978973', '7978973', 'G', 'K66CNPMA', '01-01-2003', 'Hải Phòng', '01-01-2024 16:00:00'),
  createData('4353553', '4353553', 'H', 'K66CNPMA', '01-01-2003', 'Hải Phòng', '01-01-2024 16:00:00'),
  createData('4353253', '4353253', 'I', 'K66CNPMA', '01-01-2003', 'Hải Phòng', '01-01-2024 16:00:00'),
  createData('6455435', '6455435', 'A', 'K66CNPMA', '01-01-2003', 'Hải Phòng', '01-01-2024 16:00:00'),
  createData('4535534', '4535534', 'B', 'K66CNPMA', '01-01-2003', 'Hà Nội', '01-01-2024 16:00:00'),
  createData('3453155', '3453155', 'C', 'K66CNPMA', '01-01-2003', 'Hải Dương', '01-01-2024 16:00:00'),
  createData('3453495', '3453495', 'D', 'K66CNPMA', '01-01-2003', 'Nam Định', '01-01-2024 16:00:00'),
  createData('8762344', '8762344', 'E', 'K66CNPMA', '01-01-2003', 'Cà Mau', '01-01-2024 16:00:00'),
  createData('7868866', '7868866', 'F', 'K66CNPMA', '01-01-2003', 'Hải Phòng', '01-01-2024 16:00:00'),
  createData('7978973', '7978973', 'G', 'K66CNPMA', '01-01-2003', 'Hải Phòng', '01-01-2024 16:00:00'),
  createData('4353553', '4353553', 'H', 'K66CNPMA', '01-01-2003', 'Hải Phòng', '01-01-2024 16:00:00'),
  createData('4353253', '4353253', 'I', 'K66CNPMA', '01-01-2003', 'Hải Phòng', '01-01-2024 16:00:00'),
  createData('6455435', '6455435', 'A', 'K66CNPMA', '01-01-2003', 'Hải Phòng', '01-01-2024 16:00:00'),
  createData('4535534', '4535534', 'B', 'K66CNPMA', '01-01-2003', 'Hà Nội', '01-01-2024 16:00:00'),
  createData('3453155', '3453155', 'C', 'K66CNPMA', '01-01-2003', 'Hải Dương', '01-01-2024 16:00:00'),
  createData('3453495', '3453495', 'D', 'K66CNPMA', '01-01-2003', 'Nam Định', '01-01-2024 16:00:00'),
  createData('8762344', '8762344', 'E', 'K66CNPMA', '01-01-2003', 'Cà Mau', '01-01-2024 16:00:00'),
  createData('7868866', '7868866', 'F', 'K66CNPMA', '01-01-2003', 'Hải Phòng', '01-01-2024 16:00:00'),
  createData('7978973', '7978973', 'G', 'K66CNPMA', '01-01-2003', 'Hải Phòng', '01-01-2024 16:00:00'),
  createData('4353553', '4353553', 'H', 'K66CNPMA', '01-01-2003', 'Hải Phòng', '01-01-2024 16:00:00'),
  createData('4353253', '4353253', 'I', 'K66CNPMA', '01-01-2003', 'Hải Phòng', '01-01-2024 16:00:00'),
  // ... rest of your data
];

// Table Header Component
const EnhancedTableHead = ({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
}) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="success"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
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
        Danh sách sinh viên
      </Typography>
    )}

    {numSelected > 0 ? (
      <Tooltip title="Delete">
        <IconButton>
          <DeleteIcon />
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

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

// Main Table Component
const EnhancedTable = () => {
  const [order, setOrder] = React.useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = React.useState(DEFAULT_ORDER_BY);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
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

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: '100%' }}>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Thu nhỏ danh sách"
      />
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="success"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.studentCode}
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.className}</TableCell>
                    <TableCell align="left">{row.dateOfBirth}</TableCell>
                    <TableCell align="left">{row.address}</TableCell>
                    <TableCell align="left">{row.lastAction}</TableCell>
                    <TableCell>
                      <Tooltip title='Sửa thông tin'>
                        <IconButton color='info'>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none">
                              <path d="M5.18007 15.2964C3.92249 16.0335 0.625213 17.5386 2.63348 19.422C3.6145 20.342 4.7071 21 6.08077 21H13.9192C15.2929 21 16.3855 20.342 17.3665 19.422C19.3748 17.5386 16.0775 16.0335 14.8199 15.2964C11.8709 13.5679 8.12906 13.5679 5.18007 15.2964Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M14 7C14 9.20914 12.2091 11 10 11C7.79086 11 6 9.20914 6 7C6 4.79086 7.79086 3 10 3C12.2091 3 14 4.79086 14 7Z" stroke="currentColor" stroke-width="1.5" />
                              <path d="M19.6221 4.56564C19.8457 4.32342 19.9574 4.20232 20.0762 4.13168C20.3628 3.96123 20.7157 3.95593 21.0071 4.1177C21.1279 4.18474 21.2431 4.30244 21.4735 4.53783C21.7039 4.77322 21.8192 4.89092 21.8848 5.01428C22.0431 5.31194 22.038 5.67244 21.8711 5.96521C21.8019 6.08655 21.6834 6.20073 21.4463 6.4291L18.6252 9.14629C18.1759 9.57906 17.9512 9.79545 17.6704 9.90512C17.3896 10.0148 17.081 10.0067 16.4636 9.99057L16.3796 9.98838C16.1917 9.98346 16.0977 9.98101 16.0431 9.91901C15.9885 9.85702 15.9959 9.7613 16.0108 9.56985L16.0189 9.4659C16.0609 8.92706 16.0819 8.65765 16.1871 8.41547C16.2923 8.17328 16.4738 7.97664 16.8368 7.58335L19.6221 4.56564Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                          </svg>
                        </IconButton>
                      </Tooltip>
                      <Tooltip title='Lịch sử thi'>
                        <IconButton color='success'>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none">
                              <path d="M21 21H10C6.70017 21 5.05025 21 4.02513 19.9749C3 18.9497 3 17.2998 3 14V3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                              <path d="M13 10L13 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M18 13L18 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M8 13L8 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M21 7.98693C19.16 7.98693 17.1922 8.24252 15.8771 6.49346C14.3798 4.50218 11.6202 4.50218 10.1229 6.49346C8.80782 8.24252 6.84003 7.98693 5 7.98693H3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Xem chi tiết">
                        <IconButton color='warning'>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none">
                              <path d="M19.4 19.4L22 22M20.7 14.85C20.7 11.6191 18.0809 9 14.85 9C11.6191 9 9 11.6191 9 14.85C9 18.0809 11.6191 20.7 14.85 20.7C18.0809 20.7 20.7 18.0809 20.7 14.85Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M19.075 19.075L22 22M12.9 14.85H14.85M14.85 14.85H16.8M14.85 14.85V12.9M14.85 14.85V16.8M20.7 14.85C20.7 11.6191 18.0809 9 14.85 9C11.6191 9 9 11.6191 9 14.85C9 18.0809 11.6191 20.7 14.85 20.7C18.0809 20.7 20.7 18.0809 20.7 14.85Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M2 6C2.1305 4.6645 2.4262 3.7663 3.09625 3.09625C3.7663 2.4262 4.6645 2.1305 6 2M6 22C4.6645 21.8695 3.7663 21.5738 3.09625 20.9037C2.4262 20.2337 2.1305 19.3355 2 18M22 6C21.8695 4.6645 21.5738 3.7663 20.9037 3.09625C20.2337 2.4262 19.3355 2.1305 18 2M2 10L2 14M14 2L10 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                          </svg>
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
          labelDisplayedRows={({ from, to, count }) => `${from} - ${to} trong tổng số ${count} sinh viên ,  Trang ${page + 1} trên ${Math.ceil(rows.length / rowsPerPage)}`}
        />
      </Paper>
    </Box>
  );
};

export default EnhancedTable;