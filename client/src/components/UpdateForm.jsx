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

    const searchById = async () => {
       const response = await axios.get(`https://flight-information-server.onrender.com/api/${flightId}`);
       setFlightData(response.data.ID);
       setFlightDestination(response.data.DESTINATION);
       setTime(response.data.TIME);
       setDelayStatus(response.data.DELAY);
       setGate(response.data.GATE);
    }

   const handleUpdate = async () => {
    const resp = await axios.patch(`https://flight-information-server.onrender.com/api/update/${flightId}/${flightTime}/${delayStatus}/${gate}/${remark}`); 
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
      <label htmlFor="">Delay Status</label>
      <input type="text" onChange={(e) => setDelayStatus(e.target.value)} defaultValue={delayStatus} placeholder='example: 1H 10M'/>
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
