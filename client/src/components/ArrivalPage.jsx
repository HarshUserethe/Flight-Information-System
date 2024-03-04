
import '../App.css';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FlightArr from './FlightArr';
 


 

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#FFDB00",
      color: "#000",
      fontWeight: "600 !important",
      fontFamily: "Poppins",
      fontSize: 16
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 15,
      fontWeight: "500 !important",
      fontFamily: "Poppins",
      color: "#fff",
      borderTop: "1px solid #dfdfdf",
      borderBottom: "1px solid #dfdfdf"
    },
  }));
  
 
 


function ArrivalPage() {

  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const batchSize = 9;
  const displayDuration = 10000; // 10 seconds

  const startIndex = (currentIndex - 1) * batchSize;
  const endIndex = Math.min(startIndex + batchSize, data.length);
  
  const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });
  const filteredData = data.filter(item => {
    // Assuming ETD is in HH:MM format
    return item.ETD >= currentTime;
  });


  const pageItems = filteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredData.length / batchSize);

  useEffect(() => {
   function flightDataServer(){
    const socket = new WebSocket('wss://flight-information-server.onrender.com');

    socket.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setData(newData);
    };

    socket.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    return () => {
      socket.close();
    };
   }
   
  setInterval(() => {
    flightDataServer();
 }, 1000);
   
  
   const interval = setInterval(() => {
   setCurrentIndex(prevIndex => (prevIndex % totalPages) + 1);
}, displayDuration);

return () => clearInterval(interval);
}, [totalPages, displayDuration]);

 


const emptyDivsCount = batchSize - pageItems.length;
for (let i = 0; i < emptyDivsCount; i++) {
  pageItems.push({
    STD: '---', // Assuming these fields are needed for rendering empty columns
    ETD: '---', // Assuming these fields are needed for rendering empty columns
    DELAY: '---',
    LOGO: 'https://www.icolorpalette.com/download/solidcolorimage/ffffff_solid_color_background_icolorpalette.png',
    ID: '---',
    DESTINATION: '---',
    GATE: '---',
    REMARK: '---'
  });
}


return (
        <div className="item">
          <FlightArr />
  <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow >
            <StyledTableCell className='arr'>STA</StyledTableCell>
            <StyledTableCell className='arr'>ETA</StyledTableCell>
            {/* <StyledTableCell className='arr' align="center">DELAY</StyledTableCell> */}
            <StyledTableCell className='arr' align="center"></StyledTableCell>
            <StyledTableCell className='arr' align="center">FLIGHT NUMBER</StyledTableCell>
            <StyledTableCell className='arr' align="center">FROM</StyledTableCell>
            <StyledTableCell className='arr' align="center">TO</StyledTableCell>
            {/* <StyledTableCell className='arr' align="center">DAYS</StyledTableCell> */}
            <StyledTableCell className='arr' align="center">GATE</StyledTableCell>
            <StyledTableCell className='arr' align="center">REMARK</StyledTableCell>
          </TableRow>
        </TableHead>
        
        

        {pageItems.map((item, index) => {
          return(
            <TableBody className='odd' key={index}> 
            
            <StyledTableCell className='col' component="th" scope="row" style={{color: "#FFDB00"}}>
                {item.STD}
            </StyledTableCell>
            <StyledTableCell className='col' component="th" scope="row">
                {item.ETD}
            </StyledTableCell>
            {/* <StyledTableCell className='col' align="center" style={{color: item.DELAY === 'No Delay' ? '#0FFF50' : 'red'}}>{item.DELAY} Min</StyledTableCell> */}
            <StyledTableCell className='col' align="center"><div className="logo-cell"><img src={item.LOGO} alt="" /></div></StyledTableCell>
            <StyledTableCell className='col' align="center">{item.ID}</StyledTableCell>
            <StyledTableCell className='col' align="center">{item.FROM}</StyledTableCell>
            <StyledTableCell className='col'  align="center">{item.DESTINATION}</StyledTableCell>
            {/* <StyledTableCell className='col' align="center">{item.DAYS}</StyledTableCell> */}
            <StyledTableCell className='col' align="center">{item.GATE}</StyledTableCell>
            <StyledTableCell className='col' align="center" ><span style={{color: "#FFDB00"}}>{item.REMARK}</span></StyledTableCell>

            </TableBody>
          )
        })}

     
      



       
        
      </Table>
    </TableContainer>
    {/* <Pagination 
    itemsPerPage={itemsPerPage}
    totalItems={data.length}
    currentPage={currentPage}
    paginate={paginate}
    /> */}
        </div>
    )
}

export default ArrivalPage
