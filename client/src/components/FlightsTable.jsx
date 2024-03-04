import '../App.css'
import { NavLink } from 'react-router-dom'

function FlightsTable() {

  const handleClick = () => {
    window.location.reload();
  }

  return (
    <div className="table-conatianer" onClick={handleClick}>
        <div className="title">
        <NavLink exact to="/admin/update" style={{textTransform: "uppercase"}}>
          <h2>
            <span style={{ fontWeight: "600", fontSize: "1.8vw", cursor: "pointer" }}>Update Departure</span>
          </h2>
        </NavLink>
        </div>
    </div>
  )
}

export default FlightsTable
