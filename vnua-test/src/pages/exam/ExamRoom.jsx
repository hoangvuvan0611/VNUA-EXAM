import { useState } from 'react';
import { 
  Container,          // Component bọc ngoài giới hạn width tối đa và căn giữa nội dung
  Box,                // Div với các utility props của Material-UI
  Typography,         // Component để hiển thị text với các variant khác nhau
  RadioGroup,         // Wrapper cho nhóm Radio buttons
  Radio,              // Input Type Radio
  FormControlLabel,   // Label wrapper cho input controls
  Button,             // Component button
  Paper,               // Container với box-shadow và background màu trắng
  Grid2,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import '../../assets/styles/exams/ExamRoom.css';

const FlipCard = ({ digit = 0 }) => {
  return (
    <div className="flip-card">
      <div className="top">{digit}</div>
      <div className="bottom">{digit}</div>
    </div>
  );
};

function ExamRoom() {
  // const [timeLeft, setTimeLeft] = useState(1900); // 15:30 in seconds
  
    // Format time
    // const formatTime = (totalSeconds) => {
    //   const hours = Math.floor(totalSeconds / 3600);
    //   const minutes = Math.floor((totalSeconds % 3600) / 60);
    //   const seconds = totalSeconds % 60;
    //   return {
    //     hours: String(hours).padStart(2, '0'),
    //     minutes: String(minutes).padStart(2, '0'),
    //     seconds: String(seconds).padStart(2, '0')
    //   };
    // };
  
    // useEffect(() => {
    //   const timer = setInterval(() => {
    //     setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    //   }, 1000);
    //   return () => clearInterval(timer);
    // }, []);
  
    // const time = formatTime(timeLeft);

    const countToDate = new Date().setSeconds(new Date().getSeconds() + 20);
    let previousTimeBetweenDates;
    setInterval(() => {
      const currentDate = new Date();
      const timeBetweenDates = Math.ceil((countToDate - currentDate) / 1000);
      
      if(timeBetweenDates >= 0) {
        flipAllCards(timeBetweenDates);
        previousTimeBetweenDates = timeBetweenDates;
      }
    }, 1000);

    function flipAllCards(time) {
      const seconds = time % 60
      const minutes = Math.floor(time / 60) % 60
      const hours = Math.floor(time / 3600)

      flip(document.querySelector("[data-hours-tens]"), Math.floor(hours / 10))
      flip(document.querySelector("[data-hours-ones]"), hours % 10)
      flip(document.querySelector("[data-minutes-tens]"), Math.floor(minutes / 10))
      flip(document.querySelector("[data-minutes-ones]"), minutes % 10)
      flip(document.querySelector("[data-seconds-tens]"), Math.floor(seconds / 10))
      flip(document.querySelector("[data-seconds-ones]"), seconds % 10)
    };

    function flip(flipCard, newNumber) {
      const topHalf = flipCard.querySelector(".top")
      const startNumber = parseInt(topHalf.textContent)
      if (newNumber === startNumber) return

      const bottomHalf = flipCard.querySelector(".bottom")
      const topFlip = document.createElement("div")
      topFlip.classList.add("top-flip")
      const bottomFlip = document.createElement("div")
      bottomFlip.classList.add("bottom-flip")

      topFlip.textContent = startNumber
      bottomHalf.textContent = startNumber
      topFlip.textContent = startNumber
      bottomFlip.textContent = newNumber

      topFlip.addEventListener("animationstart", e => {
        topHalf.textContent = newNumber
      })
      topFlip.addEventListener("animationend", e => {
        topFlip.remove()
      })
      bottomFlip.addEventListener("animationend", e => {
        bottomHalf.textContent = newNumber
        bottomFlip.remove()
      })
      flipCard.append(topFlip, bottomFlip)
    };

  return (
    <div className='background-container'>
      {/* <div className='glass w-[500px] h-[500px]'></div> */}
      <Container maxWidth="xl" sx={{ py: 2, mb: 1}}>
        <Grid2 container spacing={3}>
          {/* Sidebar */}
          <Grid2 item size={{ xs: 12, md: 3}}>
            <Box sx={{ 
              position: 'sticky',
              top: 0, // Khoảng cách từ top khi sticky
              height: 'fit-content',
              maxHeight: '100vh', // Chiều cao tối đa bằng viewport
              overflowY: 'auto', // Cho phép scroll nếu nội dung quá dài
              p: 1,
              scrollbarColor: 'green'
            }}>
              <Paper sx={{ p: 2, mb: 1, bgcolor: '#ffffff99'}} className='glass'>
                <Typography variant="h6" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
                  Bài thi tin học Công Nghệ Thông Tin
                </Typography>
                <Typography sx={{ color: 'emerald.600', fontWeight: 'medium', mb: 1 }}>
                  Thí sinh: Vũ Văn Hoàng
                </Typography>
                <Typography sx={{ color: 'emerald.600', fontWeight: 'medium', mb: 1 }}>
                  Mã thí sinh: 6656485
                </Typography>

                <Typography sx={{ color: 'emerald.600', fontWeight: 'medium', mb: 1 }}>
                  Lớp: K66CNPMA
                </Typography>
                <Typography sx={{ mb: 1 }}>Mã đề: 99</Typography>
                <Typography sx={{ mb: 1 }}>Thời gian làm bài: 45 phút</Typography>
              </Paper>

              <Paper sx={{ p: 2, mb: 2 }}>
                <AccessTimeIcon/>
                <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>Thời gian còn lại</Typography>
                <div className="container">
                  <div className="container-segment">
                    <div className="segment-title">Giờ</div>
                    <div className="segment">
                      <div className="flip-card" style={{color: 'green'}} data-hours-tens>
                        <div className="top">0</div>
                        <div className="bottom">0</div>
                      </div>
                      <div className="flip-card" style={{color: 'green'}} data-hours-ones>
                        <div className="top">0</div>
                        <div className="bottom">0</div>
                      </div>
                    </div>
                  </div>
                  <div className="container-segment">
                    <div className="segment-title">Phút</div>
                    <div className="segment">
                      <div className="flip-card" style={{color: 'green'}} data-minutes-tens>
                        <div className="top">0</div>
                        <div className="bottom">0</div>
                      </div>
                      <div className="flip-card"  style={{color: 'green'}} data-minutes-ones>
                        <div className="top">0</div>
                        <div className="bottom">0</div>
                      </div>
                    </div>
                  </div>
                  <div className="container-segment">
                    <div className="segment-title">Giây</div>
                    <div className="segment">
                      <div className="flip-card"  style={{color: 'green'}} data-seconds-tens>
                        <div className="top">0</div>
                        <div className="bottom">0</div>
                      </div>
                      <div className="flip-card"  style={{color: 'green'}} data-seconds-ones>
                        <div className="top">0</div>
                        <div className="bottom">0</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Paper>

              <Paper sx={{ p: 2, mb: 4, maxWidth: '100%', overflow: 'hidden'}}>
                <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>Đáp án đã chọn</Typography>
                <Box sx={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(35px, 1fr))',
                  gap: { xs: 0.5, sm: 1 },
                }}>
                  {[...Array(60)].map((_, index) => (
                    <Button
                      key={index}
                      variant={index === 29 ? "contained" : "outlined"}
                      size="small"
                      sx={{
                        minWidth: '0',
                        minHeight: '0',
                        aspectRatio: 1/1,
                        p: { xs: 1, sm: 2 },
                        bgcolor: index === 29 ? '#03ca5d' : 'initial',
                        borderColor: '#03ca5d',
                        color: index === 29 ? 'white' : '#03ca5d',
                        fontWeight: 'bold',
                        '&:hover': {
                          backgroundColor: '#c1e327',
                          borderColor: '#c1e327',
                          color: 'white'
                        },
                        '&.Mui-focusVisible': {
                          backgroundColor: '#c1e327',
                        }
                      }}
                    >
                      {index + 1}
                    </Button>
                  ))}
                </Box>
              </Paper>
            </Box>
          </Grid2>

          {/* Main Content */}

          <Grid2 item size={{ xs: 12, md: 9 }}>
            {[...Array(60)].map((_, index) => (
              <Paper key={index} sx={{ p: 4, mb: 4 }}>
                <div className='no-copy'>
                  <Typography sx={{ mb: 2 }}>
                    Câu {index + 1}:   Lima anakwan Ratu: Joko, Adi, Rimba, và Sato, selalu bermain bersama. Rumah 
                    mereka sekolah: Joko, selain memperoleh Sano, setelah di dimulai Adi. Rimba 
                    menjadi anak terakhir yang ditempui. Sementara rumah Ratu terletak di antara rumah Joko 
                    và rumah Adi. Berikut ini pernyataan yang benar adalah
                  </Typography>
                </div>
                <RadioGroup>
                  <FormControlLabel
                    value="1"
                    control={<Radio color='success'/>}
                    label="Rumah Ratu terletak paling jauh"
                    sx={{ mb: 1 }}
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio color='success'/>}
                    label="Rumah Adi terletak paling jauh"
                    sx={{ mb: 1 }}
                  />
                  <FormControlLabel
                    value="3"
                    control={<Radio color='success'/>}
                    label="Rumah Rimba terletak paling jauh"
                    sx={{ mb: 1 }}
                  />
                  <FormControlLabel
                    value="4"
                    control={<Radio color='success'/>}
                    label="Rumah Sano terletak paling dekat"
                    sx={{ mb: 1 }}
                  />
                  <FormControlLabel
                    value="5"
                    control={<Radio color='success'/>}
                    label="Rumah Adi terletak paling dekat"
                  />
                </RadioGroup>
              </Paper>
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 10 }}>
              <Button
                variant="contained"
                sx={{ bgcolor: '#03ca5d', '&:hover': { bgcolor: 'emerald.600' } }}
              >
                Nộp bài
              </Button>
            </Box>
          </Grid2>
        </Grid2>
      </Container>
    </div>
  );
}

export default ExamRoom;