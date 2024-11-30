import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

// Create a theme instance.
const AppThemeProvider = ({children}) => {
    const [mode, setMode] = useState('light');

    const toggleTheme = () => {
        setMode((preMode) => (preMode === 'light' ? 'dark' : 'light'));
    };

    // Tao theme dua tren mode
    const theme = createTheme({
        palette: {
            mode: mode, 
            ...(
                mode === 'light' ? {
                    // Mau cho light mode
                    primary: {
                        main: '#ffffff'
                    },
                    background: {
                        default: '#ffffff',
                        hoverSideBar: '#efefef'
                    },
                    action: {
                        default: ''
                    },
                    icon: {
                        default: '#000efe'
                    }
                } : {
                    // Mau cho dark mode
                    primary: {
                        main: '#90caf9',
                    },
                    background: {
                        default: '#000000',
                        hoverSideBar: '#efefef'
                    },
                    action: {
                        default: ''
                    },
                    icon: {
                        default: '#ffffff'
                    }
                } 
            )
        },
        components: {
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        '&.Mui-focused': {
                            color: 'green', // Màu nhãn khi focus
                        },
                    },
                },
            },
        },
    });


    return (
        <ThemeContext.Provider value={{mode, toggleTheme}}>
            <ThemeProvider theme={theme}>
                <CssBaseline>
                    {children}
                </CssBaseline>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}

export default AppThemeProvider;