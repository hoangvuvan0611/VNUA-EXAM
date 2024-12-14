import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/auth/Login.css";
import api from "../../services/api/axios.config";
import Cookies from "js-cookie";

import { ToastContainer, toast } from "react-toastify";
import { Box, Button, Typography } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setLoggedIn }) => {

  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  const activeRegister = () => {
    setIsActive(true);
  };
  const activeLogin = async () => {
    setIsActive(false);
  };

  const [ usernameOrEmail, setUsernameOrEmail ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ isStudent, setIsStudent ] = useState(true);

  const validateUserInf = () => {
    if (usernameOrEmail.trim().length < 1) {
      toast.warning("Tên người dùng không được để trống!", {
        icon: "⚠️",
      });
      setUsernameOrEmail("");
      return;
    }

    // let regexEmail = new RegExp(
    //   "^[0-9a-zA-Z]+\\w+@\\w+(\\.\\w+)*(\\.[a-zA-Z]{2,6})$"
    // );
    // if (!regexEmail.test(email)) {
    //   toast.warning("Email không đúng định dạng!", {
    //     icon: "⚠️",
    //   });
    //   return;
    // }

    if (password.trim().length < 8) {
      toast.warning("Mật khẩu phải có ít nhất 8 ký tự!", {
        icon: "⚠️",
      });
      return;
    }

    return true;
  };

  const registerUser = async () => {
    if (validateUserInf()) {
      let response = await api.post("/api/v1/auth/register", {
        username: usernameOrEmail,
        email: email,
        password: password,
      });
      if (response.data.status === 201) {
        setUsernameOrEmail("");
        setEmail("");
        setPassword("");
        toast.success("Đăng ký thành công!", {
          icon: "✅",
        });
        setIsActive(true);
      } else if (response.data.status === 400) {
        if (response.data.message === "Email already exists!") {
          toast.warning("Email đã được đăng ký trước đó!", {
            icon: "⚠️",
          });
        } else if (response.data.message === "Username already exists!") {
          toast.warning("Username đã được đăng ký trước đó!", {
            icon: "⚠️",
          });
        }
      }
    }
  };

  const login = async () => {
    if (usernameOrEmail.trim().length < 1) {
      toast.warning("Mã thí sinh không được để trống!", {
        icon: "⚠️",
      });
      setUsernameOrEmail("");
      return;
    };

    if (password.trim().length < 1) {
      toast.warning("Mật khẩu không được để trống", {
        icon: "⚠️",
      });
      return;
    };

    try {
      const response = await api.post(
        "/auth/login", {
          usernameOrEmail,
          password,
        }, { withCredentials: true },
      );

      if (response.data.success === false) {
        toast.warning("Thông tin đăng nhập không chính xác", {
          icon: "⚠️",
        });
      }

      // Lưu token vào cookies sau khi đăng nhập thành công
      Cookies.set('token', response.data.data.accessToken, { secure: true, sameSite: 'strict' });
      Cookies.set('refreshToken', response.data.data.refreshToken, { secure: true, sameSite: 'strict' });

      localStorage.setItem('user', JSON.stringify(response.data.data.username));

      // setLoggedIn(true);
      navigate('/admin/'); // Chuyển hướng về trang chủ sau khi đăng nhập
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  return (
    <Box className="auth">
      <ToastContainer icon={true} />
      <Box
        className={isActive ? "auth_container active" : "auth_container"}
        id="container"
      >
        <Box className="form-container sign-up">

          {/* Đăng nhập vai trò giảng viên */}
          <form>
            <Typography variant="h5" fontWeight="bold">
              Đăng nhập
            </Typography>
            <div className="social-icons">
            </div>
            <Typography variant="caption">
              Sử dụng tên đăng nhập hoặc email để đăng nhập
            </Typography>
            <input
              type="text"
              autoComplete="section-blue shipping name"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              id="registerUserName"
              placeholder="Nhập tên đăng nhập hoặc email"
            />
            <input
              type="password"
              autoComplete="section-blue shipping new-password"
              value={password}
              onInput={(e) => setPassword(e.target.value)}
              id="registerPassword"
              placeholder="Mật khẩu"
            />
            <Button type="button" onClick={login}>
              Đăng nhập
            </Button>
          </form>
        </Box>
        <Box className="form-container sign-in">
          <form>
            <Typography variant="h5" fontWeight="bold">
              Đăng nhập
            </Typography>
            <Typography variant="subtitle2" sx={{ mb: 4 }}>
              Hệ thống thi trắc nghiệm trực tuyến
            </Typography>
            <Typography variant="caption">
              Đăng nhập ngay để làm bài thi
            </Typography>
            <input
              type="text"
              autoComplete="section-blue shipping name"
              value={usernameOrEmail}
              onInput={(e) => setUsernameOrEmail(e.target.value)}
              id="loginUsername"
              placeholder="Nhập mã thí sinh"
            />
            <Button onClick={login} sx={{ mt: 2 }}>
              Đăng nhập
            </Button>
          </form>
        </Box>
        <Box className="toggle-container">
          <Box className="toggle">
            <Box className="toggle-panel toggle-left">
              <Typography variant="subtitle1">
                Đăng nhập với tư cách Sinh viên!
              </Typography>
              <Typography>
                Nếu như bạn là sinh viên, hãy chuyển sang trang đăng nhập của
                sinh viên để làm bài thi
              </Typography>
              <Button
                className="button hidden"
                id="login"
                onClick={() => activeLogin()}
              >
                chuyển hướng
              </Button>
            </Box>
            <Box className="toggle-panel toggle-right">
              <Typography variant="subtitle1">
                Đăng nhập với tư cách Giảng viên!
              </Typography>
              <Typography>
                Chuyển sang trang đăng nhập của giảng viên ngay
              </Typography>
              <Button
                className="button hidden"
                id="register"
                onClick={() => activeRegister()}
              >
                Chuyển hướng
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
