
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
  
 


function Items() {

  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const batchSize = 8;
  const displayDuration = 5000; // 5 seconds

  // const totalPages = Math.ceil(data.length / batchSize);
  const startIndex = (currentIndex - 1) * batchSize;
  const endIndex = Math.min(startIndex + batchSize, data.length);

  const pageItems = data.slice(startIndex, endIndex);

  useEffect(() => {
   function flightDataServer(){
    const socket = new WebSocket('ws://flight-information-server.onrender.com');

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
   
   
   flightDataServer();
   const interval = setInterval(() => {
     setCurrentIndex((prevPage) => (prevPage % Math.ceil(data.length / batchSize)) + 1);
   flightDataServer();
}, displayDuration);

return () => clearInterval(interval);
}, [data.length]);


const emptyDivsCount = batchSize - pageItems.length;
for (let i = 0; i < emptyDivsCount; i++) {
  pageItems.push({
    TIME: '---', // Assuming these fields are needed for rendering empty columns
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
  <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow >
            <StyledTableCell>Time</StyledTableCell>
            <StyledTableCell align="center">Delay</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
            <StyledTableCell align="center">To</StyledTableCell>
            <StyledTableCell align="center">Gate</StyledTableCell>
            <StyledTableCell align="center">Remarks</StyledTableCell>
          </TableRow>
        </TableHead>
        
        

        {pageItems.map((item, index) => {
          return(
            <TableBody className='odd' key={index}> 
            
            <StyledTableCell component="th" scope="row" style={{color: "#FFDB00"}}>
                {item.TIME}
            </StyledTableCell>
            <StyledTableCell align="center" style={{color: item.DELAY === 'No Delay' ? '#0FFF50' : 'red'}}>{item.DELAY}</StyledTableCell>
            <StyledTableCell align="center"><div className="logo-cell"><img src={item.LOGO} alt="" /></div></StyledTableCell>
            <StyledTableCell align="center">{item.ID}</StyledTableCell>
            <StyledTableCell align="center">{item.DESTINATION}</StyledTableCell>
            <StyledTableCell align="center">{item.GATE}</StyledTableCell>
            <StyledTableCell align="center" ><span style={{color: "#FFDB00"}}>{item.REMARK}</span></StyledTableCell>

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
