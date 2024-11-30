import React, {useState, useEffect} from "react";
import { useNavigate} from "react-router-dom";
import { Box, Toolbar, Typography, IconButton } from "@mui/material";
import '../../../assets/styles/admins/MyAppBar.css';

import { Avatar } from "@mui/material";
import { useThemeContext } from "../../../utils/AppThemeProvider";
import { MaterialUISwitch } from "../../common/switch/MaterialUISwitch ";

import { useTheme } from '@mui/material/styles';

const MyAppBar = ({label}) => {
    const navigate = useNavigate();
    const { mode, toggleTheme } = useThemeContext();
    const theme = useTheme();

    const [date, setDate] = useState(new Date());
    useEffect(() => {
        setInterval(() => {
            setDate(new Date()); 
        }, 1000);
    }, []);

    const formattedDate = new Intl.DateTimeFormat('vi-VN', {
        weekday: 'long',  // Thứ (ví dụ: Thứ Hai)
        day: 'numeric',   // Ngày
        month: 'long',    // Tháng (ví dụ: Tháng 11)
        year: 'numeric'   // Năm
      }).format(date);

    return (
        <div className="myAppBar" style={{backgroundColor: theme.palette.background.default}}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                    <Typography variant="h6" fontWeight="bold">{label}</Typography>
                    <Typography variant="body2" color="textSecondary">{formattedDate}</Typography>
                </Box>
                <Box>
                    <span className={`${mode === 'dark' ? 'text-white' : 'text-gray-600'}`} id='headerBar_clock'>{date.toLocaleTimeString()}</span>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{mr: 4}}>
                        <MaterialUISwitch checked={mode === 'dark'} onChange={toggleTheme}/>
                    </Box>
                    <IconButton>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
                            <path d="M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M2.01576 13.4756C2.08114 16.5411 2.11382 18.0739 3.24495 19.2093C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.755 19.2093C21.8862 18.0739 21.9189 16.5411 21.9842 13.4756C22.0053 12.4899 22.0053 11.51 21.9842 10.5244C21.9189 7.45883 21.8862 5.92606 20.755 4.79063C19.6239 3.6552 18.0497 3.61565 14.9012 3.53654C12.9607 3.48778 11.0393 3.48778 9.09882 3.53653C5.95033 3.61563 4.37608 3.65518 3.24495 4.79062C2.11382 5.92605 2.08113 7.45882 2.01576 10.5243C1.99474 11.51 1.99474 12.4899 2.01576 13.4756Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                        </svg>
                    </IconButton>
                    <IconButton>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
                            <path d="M2.52992 14.394C2.31727 15.7471 3.268 16.6862 4.43205 17.1542C8.89481 18.9486 15.1052 18.9486 19.5679 17.1542C20.732 16.6862 21.6827 15.7471 21.4701 14.394C21.3394 13.5625 20.6932 12.8701 20.2144 12.194C19.5873 11.2975 19.525 10.3197 19.5249 9.27941C19.5249 5.2591 16.1559 2 12 2C7.84413 2 4.47513 5.2591 4.47513 9.27941C4.47503 10.3197 4.41272 11.2975 3.78561 12.194C3.30684 12.8701 2.66061 13.5625 2.52992 14.394Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M9 21C9.79613 21.6219 10.8475 22 12 22C13.1525 22 14.2039 21.6219 15 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </IconButton>
                    <IconButton>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
                            <path d="M15 17.625C14.9264 19.4769 13.3831 21.0494 11.3156 20.9988C10.8346 20.987 10.2401 20.8194 9.05112 20.484C6.18961 19.6768 3.70555 18.3203 3.10956 15.2815C3 14.723 3 14.0944 3 12.8373L3 11.1627C3 9.90561 3 9.27705 3.10956 8.71846C3.70555 5.67965 6.18961 4.32316 9.05112 3.51603C10.2401 3.18064 10.8346 3.01295 11.3156 3.00119C13.3831 2.95061 14.9264 4.52307 15 6.37501" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M21 12H10M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </IconButton>
                    <Avatar sx={{ bgcolor: 'red', marginLeft: 2 }}>H</Avatar>
                    <Typography variant="body1" sx={{ marginLeft: 1 }}>Hoàng</Typography>
                </Box>
            </Toolbar>
        </div>
    );
}

export default MyAppBar;