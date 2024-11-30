import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid2,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Tooltip,
    Typography,
  } from "@mui/material";
  import React, { useState } from "react";
  
  import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Save as SaveIcon,
  } from "@mui/icons-material";
  
  const DialogAddNew = ({ open, onClose, title }) => {
    const [students, setStudents] = useState([]);
    const [newStudent, setNewStudent] = useState({
      id: "",
      studentCode: "",
      name: "",
      className: "",
      dateOfBirth: "",
      address: "",
    });
    const [errors, setErrors] = useState({});
    const [isEditing, setIsEditing] = useState(false);
  
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    const handleCloseDialog = () => {
      onClose();
      setNewStudent({
        id: "",
        studentCode: "",
        name: "",
        className: "",
        dateOfBirth: "",
        address: "",
      });
      setIsEditing(false);
    };
  
    const validateForm = () => {
      let tempErrors = {};
      tempErrors.studentCode = newStudent.studentCode ? "" : "Mã sinh viên là bắt buộc";
      tempErrors.name = newStudent.name ? "" : "Họ tên sinh viên là bắt buộc";
      tempErrors.className = newStudent.className ? "" : "Lớp là bắt buộc";
      tempErrors.dateOfBirth = newStudent.dateOfBirth
        ? ""
        : "Ngày sinh là bắt buộc";
  
      setErrors(tempErrors);
      return Object.values(tempErrors).every((x) => x === "");
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewStudent((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (validateForm()) {
        if (isEditing) {
          // Update existing student
          setStudents(students.map(student => 
            student.id === newStudent.id ? newStudent : student
          ));
          setIsEditing(false);
        } else {
          // Add new student
          setStudents(prev => [...prev, { ...newStudent, id: Date.now() }]);
        }
        
        // Reset form
        setNewStudent({
          id: "",
          studentCode: "",
          name: "",
          className: "",
          dateOfBirth: "",
          address: "",
        });
      }
    };
  
    const handleDelete = (id) => {
      setStudents((prev) => prev.filter((student) => student.id !== id));
    };
  
    const handleEdit = (student) => {
      setNewStudent(student);
      setIsEditing(true);
    };
  
    const handleRowClick = (student) => {
      handleEdit(student);
    };
  
    return (
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth=""
        fullWidth
        sx={{ "& .MuiDialog-paper": { borderRadius: "15px" } }}
      >
        <DialogTitle alignItems="center" display={"flex"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            color=""
            fill="none"
          >
            <path
              d="M2.5 6L8 4L13.5 6L11 7.5V9C11 9 10.3333 8.5 8 8.5C5.66667 8.5 5 9 5 9V7.5L2.5 6ZM2.5 6V10"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11 8.5V9.38889C11 11.1071 9.65685 12.5 8 12.5C6.34315 12.5 5 11.1071 5 9.38889V8.5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15.3182 11.0294C15.3182 11.0294 15.803 10.6765 17.5 10.6765C19.197 10.6765 19.6818 11.0294 19.6818 11.0294M15.3182 11.0294V10L13.5 9L17.5 7.5L21.5 9L19.6818 10V11.0294M15.3182 11.0294V11.3182C15.3182 12.5232 16.295 13.5 17.5 13.5C18.705 13.5 19.6818 12.5232 19.6818 11.3182V11.0294"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4.38505 15.926C3.44187 16.4525 0.96891 17.5276 2.47511 18.8729C3.21087 19.53 4.03033 20 5.06058 20H10.9394C11.9697 20 12.7891 19.53 13.5249 18.8729C15.0311 17.5276 12.5581 16.4525 11.6149 15.926C9.40321 14.6913 6.59679 14.6913 4.38505 15.926Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16 20H19.7048C20.4775 20 21.0921 19.624 21.6439 19.0983C22.7736 18.0221 20.9189 17.162 20.2115 16.7408C18.9362 15.9814 17.3972 15.8059 16 16.2141"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <Typography variant="h6" ml={1}>
            {title}
          </Typography>
        </DialogTitle>
  
        <DialogContent sx={{overflow: 'hidden'}}>
          <Box sx={{ display: "flex", gap: 2, mt: 1}}>
            <Paper sx={{ width: "25%", padding: 2 }}>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  {isEditing ? "Chỉnh sửa sinh viên" : "Thêm sinh viên mới"}
                </Typography>
                <Grid2 container spacing={1}>
                  <Grid2 item size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Mã sinh viên"
                      name="studentCode"
                      value={newStudent.studentCode}
                      onChange={handleInputChange}
                      error={!!errors.studentCode}
                      helperText={errors.studentCode}
                      variant="filled"
                      margin="none"
                    />
                  </Grid2>
                  <Grid2 item size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Họ và tên"
                      name="name"
                      value={newStudent.name}
                      onChange={handleInputChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      variant="filled"
                      margin="none"
                    />
                  </Grid2>
                  <Grid2 item size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Lớp"
                      name="className"
                      value={newStudent.className}
                      onChange={handleInputChange}
                      error={!!errors.className}
                      helperText={errors.className}
                      variant="filled"
                      margin="none"
                    />
                  </Grid2>
                  <Grid2 item size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      type="date"
                      label="Ngày sinh"
                      name="dateOfBirth"
                      value={newStudent.dateOfBirth}
                      onChange={handleInputChange}
                      error={!!errors.dateOfBirth}
                      helperText={errors.dateOfBirth}
                      variant="standard"
                      margin="none"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid2>
                  <Grid2 item size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Quê quán"
                      name="address"
                      value={newStudent.address}
                      onChange={handleInputChange}
                      error={!!errors.address}
                      helperText={errors.address}
                      variant="filled"
                      margin="none"
                    />
                  </Grid2>
                </Grid2>
                <Box sx={{ mt: 3, mb: 2 }}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    startIcon={isEditing ? <SaveIcon /> : <AddIcon />}
                    color={isEditing ? "warning" : "success"}
                    sx={{ textTransform: "capitalize" }}
                  >
                    {isEditing ? "Lưu thay đổi" : "Thêm sinh viên"}
                  </Button>
                  {isEditing && (
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{ mt: 1, textTransform: "capitalize" }}
                      onClick={() => {
                        setIsEditing(false);
                        setNewStudent({
                          id: "",
                          studentCode: "",
                          name: "",
                          className: "",
                          dateOfBirth: "",
                          address: "",
                        });
                      }}
                    >
                      Hủy chỉnh sửa
                    </Button>
                  )}
                </Box>
              </Box>
            </Paper>
  
            <Box sx={{ width: "75%"}}>
              <Typography variant="inherit" gutterBottom fontWeight={"bold"}>
                Danh sách sinh viên vừa thêm
              </Typography>
              <TableContainer component={Paper} variant="outlined" sx={{maxHeight: '70%', overflowY: "auto"}}>
                <Table size="small" aria-label="sticky table" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>STT</TableCell>
                      <TableCell>Mã sinh viên</TableCell>
                      <TableCell>Họ và tên</TableCell>
                      <TableCell>Lớp</TableCell>
                      <TableCell>Ngày sinh</TableCell>
                      <TableCell>Quê quán</TableCell>
                      <TableCell align="center">Thao tác</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          Chưa thêm mới sinh viên nào
                        </TableCell>
                      </TableRow>
                    ) : (
                      students
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((student, index) => (
                        <TableRow 
                          key={student.id} 
                          hover
                          onClick={() => handleRowClick(student)}
                          sx={{ cursor: 'pointer' }}
                          selected={isEditing && newStudent.id === student.id}
                        >
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{student.studentCode}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>{student.className}</TableCell>
                          <TableCell>{student.dateOfBirth}</TableCell>
                          <TableCell>{student.address}</TableCell>
                          <TableCell align="center">
                              <Tooltip title="Xóa">
                                  <IconButton
                                      size="small"
                                      color="error"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(student.id);
                                      }}
                                  >
                                      <DeleteIcon fontSize="small" />
                                  </IconButton>
                              </Tooltip>
                              <Tooltip title="Sửa">
                                  <IconButton 
                                    size="small" 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEdit(student);
                                    }}
                                  >
                                      <EditIcon fontSize="small" />
                                  </IconButton>
                              </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={students.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelRowsPerPage="Số hàng mỗi trang"
                  labelDisplayedRows={({ from, to, count }) => `${from} - ${to} trong tổng số ${count} sinh viên ,  Trang ${page + 1} trên ${Math.ceil(students.length / rowsPerPage)}`}
              />
              <Divider sx={{ mb: 2 }} />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
            <Button
                onClick={() => handleCloseDialog()}
                color="primary"
                variant="contained"
                sx={{ mr: 2, mb: 2 }}
            >
          Xong
        </Button>
        <Button
          onClick={() => handleCloseDialog()}
          color="primary"
          variant="contained"
          sx={{ mr: 2, mb: 2 }}
        >
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogAddNew;
