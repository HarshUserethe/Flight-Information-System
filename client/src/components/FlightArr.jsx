import '../App.css'
import { useNavigate } from 'react-router-dom';



function FlightArr() {

  const navigate = useNavigate();

  const switchBetweenPage = () => {
  navigate('/');
  window.location.reload();
  }

  return (
    <div className="table-conatianer">
        <div className="title"><h2><span onClick={switchBetweenPage} style={{fontWeight: "600", fontSize: "1.8vw", cursor: "pointer"}}>Flight Arrival</span></h2></div>
    </div>
  )
}

export default FlightArr
