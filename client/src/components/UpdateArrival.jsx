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
import FlightsTable from './FlightsTable';
import UpdateArr from './UpdateArr';

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

const UpdateArrival = () => {
    const [data, setData] = useState([]);
    const [delayUpadate, setDelayUpdate] = useState(0);
    const [delayMin, setDelayMin] = useState(null);
    const [gateUpdate, setGateUpdate] = useState(null);
    const [remarkUpdate, setRemarkUpdate] = useState(null);
    const [editRowIndex, setEditRowIndex] = useState(null);
    const [flightid, setflightId] = useState(null);
    const [updateETD, setUpdateETD] = useState();
    const [estimatedTime, setEstimatedTime] = useState(null);
    const [timeInHours, setTimeInHours] = useState(null);
    const batchSize = 8;
    
    
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
     
  
      flightDataServer();
   setInterval(() => {
      flightDataServer();
   }, 1000);
     
  
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
  
      // Handle rollover if the updated time exceeds 24 hours
      const updatedHours = (updatedTotalMinutes / 60) % 24;
      const updatedMinutes = updatedTotalMinutes % 60;
      
      // Convert negative time to positive
      const positiveHours = updatedHours >= 0 ? updatedHours : updatedHours + 24;
  
      // Format the updated time
      const updatedTime = `${String(Math.floor(positiveHours)).padStart(2, '0')}:${String(updatedMinutes).padStart(2, '0')}`;
  
      setUpdateETD(updatedTime);
  }
  
  const handleEditButton = (index, item) => {
    setEditRowIndex(index);
    setflightId(item.ID);
    setEstimatedTime(null);
    setUpdateETD(item.ETD);
    // handleEstimatedUpdates(item.ETD);
    console.log(item.ETD)
    console.log(item.REMARK);
    console.log(item.GATE);
    setRemarkUpdate(item.REMARK);
    setGateUpdate(item.GATE);
    setTimeInHours('00:00');
  };
  
  
  const handleUpdateButton = async () => {
  
    const response = await axios.patch(`https://flight-information-server.onrender.com/api/update/${flightid}/${updateETD}/${gateUpdate}/${remarkUpdate}/${delayMin}`);
    console.log(response)
    console.log(delayUpadate);
    // Implement your update logic here
    setEditRowIndex(null); // Reset editRowIndex after updating
    
  };
  
  const converMinIntoHour = (delayTimeInMin) => {
    const hours = Math.floor(delayTimeInMin / 60);
    const remainingMinutes = delayTimeInMin % 60;
    
    // Formatting hours and minutes
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(remainingMinutes).padStart(2, '0');
    
    setTimeInHours(`${formattedHours}:${formattedMinutes}`);
  }
  
  
  return (
          <div className="item">
            <div className="switchPannel">
            <FlightsTable />
            <UpdateArr />
            </div>
     <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow >
              <StyledTableCell className='arr'>STA</StyledTableCell>
              <StyledTableCell className='arr'>ETA</StyledTableCell>
              <StyledTableCell className='arr' align="center">DELAY</StyledTableCell>
              <StyledTableCell className='arr' align="center"></StyledTableCell>
              <StyledTableCell className='arr' align="center">ID</StyledTableCell>
              {/* <StyledTableCell align="center">FROM</StyledTableCell> */}
              <StyledTableCell className='arr' align="center">TO</StyledTableCell>
              <StyledTableCell className='arr' align="center">DAYS</StyledTableCell>
              <StyledTableCell className='arr' align="center">GATE</StyledTableCell>
              <StyledTableCell className='arr' align="center">REMARK</StyledTableCell>
              <StyledTableCell className='arr' align="center">EDIT</StyledTableCell>
            </TableRow>
          </TableHead>
          
          
  
          {pageItems.map((item, index) => { 
            return(
              <TableBody className='odd' key={index}> 
              
              <StyledTableCell className='col' component="th" scope="row" style={{color: "#FFDB00"}}>{item.STD}</StyledTableCell>
              <StyledTableCell className='col' component="th" scope="row">
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
  
              <StyledTableCell className='col' align="center" style={{color: item.DELAY === 'No Delay' ? '#0FFF50' : 'red'}}> 
              {editRowIndex === index ? (
               <div className='displayHour'>
                <input type="number"  onChange={e => {handleEstimatedUpdates(e.target.value, item.STD), setDelayMin(e.target.value), converMinIntoHour(e.target.value)}} className='editable' style={{display: 'block'}} />
                <span style={{fontSize:"1vw"}}>{timeInHours}</span>
               </div>
          
              ) : (
                <span>{item.DELAY} Min</span>
              )}
              </StyledTableCell>
              <StyledTableCell className='col' align="center"><div className="logo-cell"><img src={item.LOGO} alt="" /></div></StyledTableCell>
              <StyledTableCell className='col' align="center">{item.ID}</StyledTableCell>
              {/* <StyledTableCell className='col' align="center">{item.FROM}</StyledTableCell> */}
              <StyledTableCell className='col' align="center">{item.DESTINATION}</StyledTableCell>
  
              <StyledTableCell className='col' align="center">
                  {item.DAYS}
                  </StyledTableCell>
  
              <StyledTableCell className='col' align="center">
              <span style={{color: "#FFDB00"}}>
              {editRowIndex === index ? (
                  <select value={gateUpdate} onChange={e => setGateUpdate(e.target.value)} id="mySelect" style={{display: 'block'}}>
                    <option value="Updating">select</option>
                    <option value="G1">G1</option>
                    <option value="G2">G2</option>
                    <option value="G3">G3</option>
                    <option value="G4">G4</option>
                    <option value="G5">G5</option>
                    <option value="G6">G6</option>
                    <option value="G7">G7</option>
                    <option value="G8">G8</option>
                    <option value="G9">G9</option>
                    <option value="G10">G10</option>
                    
                  </select>
                ) : (
                  <span>{item.GATE}</span>
                )}
  
                  </span>
              </StyledTableCell>
              <StyledTableCell className='col' align="center" >
              <span style={{color: "#FFDB00"}}>
              {editRowIndex === index ? (
                  <select value={remarkUpdate} onChange={e => setRemarkUpdate(e.target.value)} id="mySelect" style={{display: 'block'}}>
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
              <StyledTableCell className='col' align="center" >
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

export default UpdateArrival