import { useState } from 'react';
import '../App.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const spaceStyle = {
    width: "100%",
    height: "1vw",
    backgroundColor: "#FFDB00"
}



const UpdateForm = () => {
    const navigate = useNavigate();
    const [flightId, setFlightId] = useState(null);
    const [flightdata, setFlightData] = useState('');
    const [flightDestination, setFlightDestination] = useState('');
    const [flightTime, setTime] = useState('');
    const [delayStatus, setDelayStatus] = useState('');
    const [gate, setGate] = useState('');
    const [remark, setRemark] = useState('');
    const [etd, setETD] = useState('');
    const [delayhour, setDelayHours] = useState('')
    const [delaymins, setDelayMins] = useState('')

    const [time, modifier] = etd.split(' ');
    let [hours, minutes] = time.split(':');

    if (hours === '12') {
      hours = '00';
     }

  if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
     }

  const newETD = `${hours}:${minutes}`;
  console.log(delayStatus);
    

    const searchById = async () => {
       const response = await axios.get(`https://flight-information-server.onrender.com/api/${flightId}`);
       setFlightData(response.data.ID);
       setFlightDestination(response.data.DESTINATION);
       setTime(response.data.STD);
       setDelayStatus(response.data.DELAY);
       setGate(response.data.GATE);
       setETD(response.data.ETD);
    }

   const handleUpdate = async () => {
    const newDelayStatus = `${delayhour}Hour ${delaymins}Mins`;
    const resp = await axios.patch(`https://flight-information-server.onrender.com/api/update/${flightId}/${flightTime}/${newETD}/${newDelayStatus}/${gate}/${remark}`); 
    console.log(resp)
    navigate('/');
}

      
  return (
    <div>
        <div className="space" style={spaceStyle}></div>
        <div className="updateFormConatiner">
        <div className="searchField" style={{marginTop: "3vw"}}>
                <label htmlFor="flight number" style={{fontWeight: "600", fontSize: "1.8vw"}}>Flight Number</label>
                <input type="text" placeholder='Enter flight number' onChange={(e) => setFlightId(e.target.value)} />
                <button onClick={searchById}>Search Flight</button>
        </div>

     <div className="flightInformation">
        <li>Flight Number: <span style={{fontWeight: "500"}}>{flightdata}</span></li>
        <li>Flight Destination: <span style={{fontWeight: "500"}}>{flightDestination}</span></li>

       <div className="in">
      <label htmlFor="">Standard Time</label>
      <input type="text" onChange={(e) => setTime(e.target.value)}  defaultValue={flightTime} placeholder='HH:MM'/>
       </div>
       <div className="in">
      <label htmlFor="">Estimated Time</label>
      <input type="time" onChange={(e) => setETD(e.target.value)} defaultValue={newETD} />
       </div>

       <div className="in">
      <label htmlFor="">Delay Status</label>

      <div className="etd-sec" style={{display :"flex", gap: "10px"}}>
    <div className="tt" style={{display: "flex", gap:"5px"}}>
     <label htmlFor="Hours">Hours</label>
      <input type="number" value={delayhour}  onChange={(e) => {setDelayHours(e.target.value)}} style={{width:"5vw"}} />
      </div>
     <div className="tt" style={{display: "flex", gap:"5px"}}>
     <label htmlFor="min">Min</label>
      <input type="number" value={delaymins} onChange={(e) => {setDelayMins(e.target.value)}} style={{width:"5vw"}} />
     </div>
    </div>
       </div>

       <div className="in">
      <label htmlFor="">Gate Number</label>
      <input type="text" onChange={(e) => setGate(e.target.value)} defaultValue={gate}/>
       </div>

       <div className="in">
       <label htmlFor="remark">Remark</label>
  <select id="remark" onChange={e => setRemark(e.target.value)}>
    <option value="normal">Normal</option>
    <option value="normal">On Time</option>
    <option value="delayed">Delayed</option>
    <option value="cancelled">Cancelled</option>
    <option value="diverted">Diverted</option>
    <option value="medical">Medical</option>
    <option value="security">Security</option>
    <option value="vip">VIP</option>
    <option value="fuel">Fuel</option>
    <option value="weather">Weather</option>
    <option value="mechanical">Mechanical</option>
    {/* Add more options as needed */}
  </select>
       </div>
<button style={{marginTop: "2vw"}} onClick={handleUpdate}>Update</button>
     </div>

        </div>
    </div>
  )
}

export default UpdateForm


