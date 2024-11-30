import { Box } from '@mui/material';

function ExamLayout({ children }) {
  return (
    <Box className="min-h-screen bg-gray-50">
      <Box className="flex-grow">
        {children}
      </Box>
    </Box>
  );
}

export default ExamLayout;