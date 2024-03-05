import { useState, useEffect } from 'react';

const datetimeStyle = {
    position: "absolute",
    right: "2vw",
    top: "3vw",
    fontSize: "1.3vw",
    fontWeight: 500,
    textAlign: "right"

}

const DateTime = () => {


  const [currentTime, setCurrentTime] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await fetch('https://api.worldtimeapi.org/api/timezone/Asia/Kolkata'); // Replace with your preferred Indian time server API
        const data = await response.json();
        const datetime = data.datetime;
        const time = datetime.slice(11, 16); // Extract time (24-hour format)
        const date = datetime.slice(0, 10); // Extract date (YYYY-MM-DD)
        const formattedDate = formatDate(date); // Function to format date
        setCurrentTime(time);
        setCurrentDate(formattedDate);
      } catch (error) {
        console.error('Error fetching time:', error);
      }
    };

    fetchTime();
    const intervalId = setInterval(fetchTime, 60000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };


  return (
    <div>
     <div style={datetimeStyle}>
      {currentTime && currentDate && (
        <>
          <span>{currentTime}</span>
          <br />
          <span>{currentDate}</span>
        </>
      )}
    </div>
    </div>
  )
}

export default DateTime