
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
import axios from 'axios'; 

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
  
 
   const editStyle = {
     backgroundColor:"green", padding:"10px", borderRadius:"7px", cursor:"pointer"
   }
   const edittStyle = {
     backgroundColor:"navy", padding:"10px", borderRadius:"7px", cursor:"pointer"
   }


function Items() {

  const [data, setData] = useState([]);
  const [delayUpadate, setDelayUpdate] = useState(0);
  const [gateUpdate, setGateUpdate] = useState(null);
  const [remarkUpdate, setRemarkUpdate] = useState(null);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [flightid, setflightId] = useState(null);
  const [updateETD, setUpdateETD] = useState();
  const [estimatedTime, setEstimatedTime] = useState(null);
  const batchSize = 8;
  console.log(estimatedTime)
  
  const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });
  const filteredData = data.filter(item => {
    // Assuming ETD is in HH:MM format
    return item.ETD >= currentTime;
  });


  const pageItems = filteredData

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
   
   
   const interval = setInterval(() => {
     flightDataServer();
}, 1000);

return () => clearInterval(interval);
}, [pageItems.length]);



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


const handleEstimatedUpdates = (delayTime, estimatedTime) => {
 
  const [estimatedHours, estimatedMinutes] = estimatedTime.split(':').map(Number);
  const totalEstimatedMinutes = estimatedHours * 60 + estimatedMinutes;
  const updatedTotalMinutes = totalEstimatedMinutes + parseInt(delayTime, 10);
  const updatedHours = Math.floor(updatedTotalMinutes / 60);
  const updatedMinutes = updatedTotalMinutes % 60;
  const updatedTime = `${updatedHours.toString().padStart(2, '0')}:${updatedMinutes.toString().padStart(2, '0')}`;
  
  console.log(delayUpadate);
  setUpdateETD(updatedTime);
}

const handleEditButton = (index, item) => {
  setEditRowIndex(index);
  setflightId(item.ID);
  setEstimatedTime(null);
  setUpdateETD(item.ETD);
  // handleEstimatedUpdates(item.ETD);
  console.log(item.ETD)
};


const handleUpdateButton = async () => {

  const response = await axios.patch(`https://flight-information-server.onrender.com/api/update/${flightid}/${updateETD}/${gateUpdate}/${remarkUpdate}/${delayUpadate}`);
  console.log(response)
  // Implement your update logic here
  setEditRowIndex(null); // Reset editRowIndex after updating
  
};


return (
        <div className="item">
   <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow >
            <StyledTableCell>STD</StyledTableCell>
            <StyledTableCell>ETD</StyledTableCell>
            <StyledTableCell align="center">DELAY</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
            <StyledTableCell align="center">ID</StyledTableCell>
            <StyledTableCell align="center">FROM</StyledTableCell>
            <StyledTableCell align="center">TO</StyledTableCell>
            <StyledTableCell align="center">DAYS</StyledTableCell>
            <StyledTableCell align="center">GATE</StyledTableCell>
            <StyledTableCell align="center">REMARK</StyledTableCell>
            <StyledTableCell align="center">EDIT</StyledTableCell>
          </TableRow>
        </TableHead>
        
        

        {pageItems.map((item, index) => { 
          return(
            <TableBody className='odd' key={index}> 
            
            <StyledTableCell component="th" scope="row" style={{color: "#FFDB00"}}>{item.STD}</StyledTableCell>
            <StyledTableCell component="th" scope="row">
            {editRowIndex === index ? (
              <input 
                type="text" 
                value={updateETD} 
                readOnly
                className='editable' 
                style={{display: 'block'}}
                
              />
            ) : (
              <span>{item.ETD}</span>
            )}
            </StyledTableCell>

            <StyledTableCell align="center" style={{color: item.DELAY === 'No Delay' ? '#0FFF50' : 'red'}}> 
            {editRowIndex === index ? (
              <input type="number" onChange={e => handleEstimatedUpdates(e.target.value, item.ETD)} className='editable' style={{display: 'block'}} />
            ) : (
              <span>{item.DELAY}</span>
            )}
            </StyledTableCell>
            <StyledTableCell align="center"><div className="logo-cell"><img src={item.LOGO} alt="" /></div></StyledTableCell>
            <StyledTableCell align="center">{item.ID}</StyledTableCell>
            <StyledTableCell align="center">{item.FROM}</StyledTableCell>
            <StyledTableCell align="center">{item.DESTINATION}</StyledTableCell>

            <StyledTableCell align="center">
                {item.DAYS}
                </StyledTableCell>

            <StyledTableCell align="center">
            {editRowIndex === index ? (
              <input type="text" onChange={e => setGateUpdate(e.target.value)} className='editable' style={{display: 'block'}} />
            ) : (
              <span>{item.GATE}</span>
            )}
            </StyledTableCell>
            <StyledTableCell align="center" >
            <span style={{color: "#FFDB00"}}>
            {editRowIndex === index ? (
                <select onChange={e => setRemarkUpdate(e.target.value)} id="mySelect" style={{display: 'block'}}>
                  <option value="Updating">select</option>
                  <option value="On Time">On Time</option>
                  <option value="Delay">Delay</option>
                  <option value="Boarding">Boarding</option>
                  <option value="Security">Security</option>
                </select>
              ) : (
                <span>{item.REMARK}</span>
              )}

                </span>
             </StyledTableCell>
            <StyledTableCell align="center" >
            {editRowIndex === index ? (
              <>
                <span onClick={() => setEditRowIndex(null)} style={editStyle}>Cancel</span>
                <span onClick={handleUpdateButton} style={edittStyle}>UPDATE</span>
              </>
            ) : (
              <span onClick={() => handleEditButton(index, item)} style={editStyle}>Edit</span>
            )}
            </StyledTableCell>

            </TableBody>
          )
        })}
    
      </Table>
    </TableContainer>
    
        </div>
    )
}

export default Items
