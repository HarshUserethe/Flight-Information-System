
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
import FlightDep from './FlightDep';
import TakeOffIcon from './TakeOffIcon';
import DateTime from './DateTime';
import axios from 'axios';

 

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "yellow",
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
  
 


function Items() {

  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const batchSize = 9;
  const displayDuration = 10000; // 10 seconds
 
  const startIndex = (currentIndex - 1) * batchSize;
  const endIndex = Math.min(startIndex + batchSize, data.length);
  
  const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });
  const filteredData = data.filter(item => {
    // Assuming ETD is in HH:MM format
    return item.ETD >= currentTime && item.MODE === 'D';
  });


  const pageItems = filteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredData.length / batchSize);

  //api testing --->
  useEffect(() => {
    async function testAPI(){
     try {
      const response = await axios.get('https://flight-information-server.onrender.com/api/data') ;
      setData(response.data);
     } catch (error) {
      console.log(error);
     }
    }

    setInterval(() => {
      testAPI();
    }, 1000)

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex % totalPages) + 1);
   }, displayDuration);
   
   
   return () => clearInterval(interval);
  }, [totalPages, displayDuration])

  // useEffect(() => {
  
//    function flightDataServer(){
//     const socket = new WebSocket('wss://fddsbackend.onrender.com');

//     socket.onopen = () => {
//       console.log('Connected to WebSocket server');
//     };

//     socket.onmessage = (event) => {
//       const newData = JSON.parse(event.data);
//       setData(newData);
//     };

//     socket.onclose = () => {
//       console.log('Disconnected from WebSocket server');
//     };

//     return () => {
//       socket.close();
//     };
//    }
   
// setInterval(() => {
//     flightDataServer();
//  }, 1000);
  
//  setTimeout(() => {
//   clearInterval(dataInterval);
// }, 5000);
  
//    const interval = setInterval(() => {
//    setCurrentIndex(prevIndex => (prevIndex % totalPages) + 1);
// }, displayDuration);


// return () => clearInterval(interval);
// }, [totalPages, displayDuration]);




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
        <div className="top-heading-bar"> 
        <DateTime />
        <div className="icon"><TakeOffIcon /></div>
        <h2>DEPARTURES</h2>
      </div>
          {/* <FlightDep /> */}
  <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell className='tv'>STD</StyledTableCell>
            <StyledTableCell className='tv'>ETD</StyledTableCell>
            {/* <StyledTableCell className='tv' align="center">DELAY</StyledTableCell> */}
            <StyledTableCell className='tv' align="center">AIRLINE</StyledTableCell>
            <StyledTableCell className='tv' align="center">FL. CODE</StyledTableCell>
            {/* <StyledTableCell align="center">FROM</StyledTableCell> */}
            <StyledTableCell sx={{ minWidth: 200, maxWidth: 200 }} className='tv' align="center">DESTINATION</StyledTableCell>
            {/* <StyledTableCell className='tv' align="center">DAYS</StyledTableCell> */}
            <StyledTableCell className='tv' align="center">GATE</StyledTableCell>
            <StyledTableCell sx={{ minWidth: 130, maxWidth: 130 }} className='tv' align="center">STATUS</StyledTableCell>
          </TableRow>
        </TableHead>
        
        

        {pageItems.map((item, index) => {
          return(
            <TableBody className='odd' key={index} sx={{ padding: "0px" }}> 
            
            <StyledTableCell className='col' component="th" scope="row" style={{color: "yellow"}}>
                {item.STD}
            </StyledTableCell>
            <StyledTableCell className='col' component="th" scope="row">
                {item.ETD}
            </StyledTableCell>
            {/* <StyledTableCell className='col' align="center" style={{color: item.DELAY === 'No Delay' ? '#0FFF50' : 'red'}}>{item.DELAY} Min</StyledTableCell> */}
            <StyledTableCell className='col' align="center"><div className="logo-cell"><img src={item.LOGO} alt="" /></div></StyledTableCell>
            <StyledTableCell className='col' align="center">{item.ID}</StyledTableCell>
            {/* <StyledTableCell align="center">{item.FROM}</StyledTableCell> */}
            <StyledTableCell className='col'sx={{ minWidth: 200, maxWidth: 200 }}  align="center">{item.DESTINATION}</StyledTableCell>
            {/* <StyledTableCell className='col' align="center">{item.DAYS}</StyledTableCell> */}
            <StyledTableCell className='col' align="center">{item.GATE}</StyledTableCell>
            <StyledTableCell sx={{ minWidth: 130, maxWidth: 130 }} className='col' align="center" ><span style={{color: "aqua"}}>{item.REMARK}</span></StyledTableCell>

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

export default Items
