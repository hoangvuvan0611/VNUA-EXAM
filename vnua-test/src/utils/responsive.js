// src/utils/responsive.js
export const getResponsiveValue = (value, breakpoint) => {
    const breakpoints = {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    };
  
    return typeof value === 'object'
      ? Object.entries(value).reduce((acc, [key, val]) => {
          if (window.innerWidth >= breakpoints[key]) {
            acc = val;
          }
          return acc;
        }, value.xs)
      : value;
  };
  
  // Sử dụng:
  const fontSize = getResponsiveValue({
    xs: '14px',
    sm: '16px',
    md: '18px',
    lg: '20px'
  });