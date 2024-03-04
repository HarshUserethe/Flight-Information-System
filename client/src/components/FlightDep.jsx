import '../App.css'
import { useNavigate } from 'react-router-dom';


function FlightsTable() {
const navigate = useNavigate();
const switchBetweenPage = () => {
  navigate('/arrival');
  window.location.reload();
}

  return (
    <div className="table-conatianer">
        <div className="title"><h2><span onClick={switchBetweenPage} style={{fontWeight: "600", fontSize: "1.8vw", cursor:"pointer"}}>Flight Departure</span></h2></div>
    </div>
  )

}
export default FlightsTable
