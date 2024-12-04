import React from 'react';
import {  
  DialogContent, 
  CircularProgress, 
  Typography, 
  Box, 
} from '@mui/material';

const BubbleLoadingDialog = ({ 
  open = false, 
  message = "Đang tải dữ liệu...",
}) => {
  return (
    <Box
      open={open}
      PaperProps={{
        style: {
          backgroundColor: 'transparent', 
          boxShadow: 'none',
          overflow: 'hidden'
        }
      }}
      maxWidth="xs"
      fullWidth
    >
      <DialogContent 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          padding: 0,
          overflow: 'visible'
        }}
      >
        <Box 
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 200,
            height: 200,
          }}
        >
          {/* Các bong bóng bay */}
          <Box 
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              animation: 'bubbleFloat 3s ease-in-out infinite',
              '@keyframes bubbleFloat': {
                '0%, 100%': { 
                  transform: 'translateY(0) scale(1)',
                  opacity: 0.7
                },
                '50%': { 
                  transform: 'translateY(-20px) scale(1.1)',
                  opacity: 1
                }
              }
            }}
          >
            {/* Bong bóng lớn */}
            <Box 
              sx={{
                position: 'absolute',
                width: 150,
                height: 150,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), rgba(0,123,255,0.6))',
                filter: 'blur(10px)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />

            {/* Bong bóng nhỏ 1 */}
            <Box 
              sx={{
                position: 'absolute',
                width: 50,
                height: 50,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5), rgba(0,200,255,0.4))',
                filter: 'blur(5px)',
                top: '30%',
                left: '20%',
                animation: 'smallBubbleFloat 2s ease-in-out infinite alternate',
                '@keyframes smallBubbleFloat': {
                  '0%': { transform: 'translate(0, 0)' },
                  '100%': { transform: 'translate(10px, -10px)' }
                }
              }}
            />

            {/* Bong bóng nhỏ 2 */}
            <Box 
              sx={{
                position: 'absolute',
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5), rgba(100,100,255,0.4))',
                filter: 'blur(3px)',
                bottom: '30%',
                right: '20%',
                animation: 'smallBubbleFloat 2.5s ease-in-out infinite alternate-reverse',
              }}
            />
          </Box>

          {/* Loading indicator */}
          <Box 
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 10
            }}
          >
            <CircularProgress 
              size={60} 
              thickness={4} 
              sx={{ 
                color: 'primary.main',
                mb: 2
              }}
            />
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: 'text.secondary',
                fontWeight: 500,
                textAlign: 'center'
              }}
            >
            </Typography>
          </Box>
        </Box>
        <Typography variant='caption'>
            {message}
        </Typography>
      </DialogContent>
    </Box>
  );
};

export default BubbleLoadingDialog;