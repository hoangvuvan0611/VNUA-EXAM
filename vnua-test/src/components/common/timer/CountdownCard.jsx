import { useState, useEffect } from 'react';
import '../../../assets/styles/exams/ExamRoom.css'

const CountdownCard = ({ digit, unit }) => {
  const [flip, setFlip] = useState(false);

  // Mỗi khi 'digit' thay đổi, kích hoạt animation lật thẻ
  useEffect(() => {
    setFlip(true);
    const timer = setTimeout(() => setFlip(false), 1500); // Kết thúc animation sau 600ms
    return () => clearTimeout(timer);
  }, [digit]);

  return (
    <div class="container-segment">
      <div class="segment-title">{unit}</div>
      <div class="segment">
        <div className='flip-card'>
          <div className={`top ${flip ? 'top-flip' : ''}`}>{digit[0]}</div>
          <div class={`bottom ${flip ? 'bottom-flip' : ''}`}>{digit[0]}</div>
        </div>
        <div className="flip-card">
          <div class={`top ${flip ? 'top-flip' : ''}`}>{digit[1]}</div>
          <div class={`bottom ${flip ? 'bottom-flip' : ''}`}>{digit[1]}</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownCard;
