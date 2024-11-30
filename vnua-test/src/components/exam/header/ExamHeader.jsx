import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Menu, 
  MenuItem,
  Box,
  Avatar,
  useMediaQuery,
  useTheme 
} from '@mui/material';
import { Menu as MenuIcon, AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function ExamHeader() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Implement logout logic
    navigate('/');
  };

  return (
    <AppBar position="static" className="bg-white shadow-md">
      <Toolbar className="justify-between">
        <Box className="flex items-center">
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              className="mr-2"
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" className="text-primary-dark font-bold">
            ExamSystem
          </Typography>
        </Box>

        <Box className="flex items-center">
          <Typography className="mr-4 hidden md:block">
            Nguyễn Văn A
          </Typography>
          <IconButton onClick={handleMenu} color="inherit">
            <Avatar className="bg-primary-main">
              <AccountCircle />
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Thông tin cá nhân</MenuItem>
            <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}