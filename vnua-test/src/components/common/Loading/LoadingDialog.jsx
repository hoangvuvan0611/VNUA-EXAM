import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  CircularProgress, 
  Typography, 
  Box 
} from '@mui/material';

const LoadingDialog = ({ 
  open,
  message,
  backgroundColor = "rgba(255,255,255,0.9)"
}) => {
  return (
    <Dialog
      open={open}
      PaperProps={{
        style: {
          backgroundColor: 'transparent', 
          boxShadow: 'none',
          overflow: 'hidden'
        }
      }}
      BackdropProps={{
        style: { 
          backgroundColor: 'rgba(0,0,0,0.1)' 
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
          backgroundColor: backgroundColor,
          borderRadius: 3,
          padding: 3,
          textAlign: 'center'
        }}
      >
        <Box 
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            animation: 'float 2s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(-10px)' }
            },
          }}
        >
          <CircularProgress 
            size={60} 
            thickness={4} 
            sx={{ 
              color: 'primary.main',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              borderRadius: '50%',
              padding: 1
            }}
          />
          <Typography 
            variant="subtitle1" 
            sx={{ 
              mt: 2, 
              color: 'text.secondary',
              fontWeight: 500
            }}
          >
            {message}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoadingDialog;