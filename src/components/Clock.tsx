
import { useEffect, useState } from 'react';

const Clock = () => {
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      
      // Format time as HH:MM:SS
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}:${seconds}`);
      
      // Format date as DD/MM/YYYY
      const day = now.getDate().toString().padStart(2, '0');
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const year = now.getFullYear();
      setDate(`${day}/${month}/${year}`);
    };
    
    // Update immediately
    updateClock();
    
    // Update every second
    const interval = setInterval(updateClock, 1000);
    
    // Clean up on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center mt-6">
      <div className="text-2xl font-bold">{time}</div>
      <div className="text-gray-500">{date}</div>
    </div>
  );
};

export default Clock;
