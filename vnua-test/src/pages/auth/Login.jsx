import { useState, useMediaQuery } from "react";
import { Box, Button, Checkbox, Container, FormControlLabel, Grid2, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleIcon from '@mui/icons-material/Google';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Implement login logic here
      navigate("/exams");
    } catch (error) {
      setError("Đăng nhập không thành công");
    }
  };

  return (
    <Grid2
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        bgcolor: "#EDEDED",
      }}
    >
      {/* Left illustration */}
      <Grid2 size={{md: 8}}>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#EDEDED",
          }}
        >
          {/* Placeholder for illustration */}
          <Box
            sx={{
              width: 300,
              height: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 160,
                bgcolor: "#6A3BFF",
                borderRadius: 2,
              }}
            />
            <Box
              sx={{
                width: 60,
                height: 120,
                bgcolor: "#1C1C1C",
                borderRadius: 2,
              }}
            />
            <Box
              sx={{
                width: 100,
                height: 100,
                bgcolor: "#FF9900",
                borderRadius: "50%",
              }}
            />
            <Box
              sx={{
                width: 80,
                height: 80,
                bgcolor: "#FFD700",
                borderRadius: "50%",
              }}
            />
          </Box>
        </Box>
      </Grid2>

      {/* Login form */}
      <Grid2>
        <Container
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#FFFFFF",
            borderRadius: 4,
            px: 4,
            margin: 2
            // px: isMobile ? 2 : 4, // Padding nhỏ hơn cho thiết bị di động
          }}
        >
          <Typography variant="h4" fontWeight="bold" mb={2}>
            Welcome back!
          </Typography>
          <Typography variant="body2" color="textSecondary" mb={3}>
            Please enter your details
          </Typography>
          <Box component="form" sx={{ width: "100%", maxWidth: 400 }}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Remember me for 30 days"
            />
            <Typography
              variant="body2"
              color="primary"
              sx={{ cursor: "pointer", float: "right", mb: 2 }}
            >
              Forgot password?
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                bgcolor: "#000000",
                color: "#FFFFFF",
                textTransform: "none",
                height: "50px",
                mb: 2,
                "&:hover": { bgcolor: "#333333" },
              }}
            >
              Log In
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{
                color: "#000000",
                textTransform: "none",
                height: "50px",
                mb: 2,
                border: "2px solid #000000",
                "&:hover": { border: "2px solid #333333" },
              }}
            >
              Log in with Google
            </Button>
            <Typography variant="body2" align="center">
              Don’t have an account?{" "}
              <Typography
                component="span"
                color="primary"
                sx={{ cursor: "pointer" }}
              >
                Sign Up
              </Typography>
            </Typography>
          </Box>
        </Container>
      </Grid2>
    </Grid2>
  );
}
