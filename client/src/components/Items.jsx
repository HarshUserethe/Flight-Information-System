
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
import Pagination from '../components/Pagination';

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
   function flightDataServer(){
    const socket = new WebSocket('ws://localhost:8080');

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

   const interval = setInterval(flightDataServer, 5000);

   return () => clearInterval(interval);

  }, []);



return (
        <div className="item">
  <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Time</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
            <StyledTableCell align="center">To</StyledTableCell>
            <StyledTableCell align="center">Gate</StyledTableCell>
            <StyledTableCell align="center">Remarks</StyledTableCell>
          </TableRow>
        </TableHead>
        

        {currentItems.map((item, index) => (
        <TableBody className='odd' key={index}>
         {/* map function */}
           
              <StyledTableCell component="th" scope="row" style={{color: "#FFDB00"}}>
                {item.TIME}
              </StyledTableCell>
              <StyledTableCell align="center"><div className="logo-cell"><img src={item.LOGO} alt="" /></div></StyledTableCell>
              <StyledTableCell align="center">{item.ID}</StyledTableCell>
              <StyledTableCell align="center">{item.DESTINATION}</StyledTableCell>
              <StyledTableCell align="center">{item.GATE}</StyledTableCell>
              <StyledTableCell align="center" ><span style={{color: "#FFDB00"}}>{item.REMARK}</span></StyledTableCell>
            
        {/* map function */}
        </TableBody>
        ))}

       
        
      </Table>
    </TableContainer>
    <Pagination 
    itemsPerPage={itemsPerPage}
    totalItems={data.length}
    currentPage={currentPage}
    paginate={paginate}
    />
        </div>
    )
}

export default Items
