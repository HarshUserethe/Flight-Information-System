import '../App.css'
import { NavLink } from 'react-router-dom'
const spanStyle = {
  fontWeight: 600,
  fontSize: "1.8vw",
  cursor: "pointer",
};

function FlightsTable() {

  const handleClick = () => {
    window.location.reload();
  }

  return (
    <div className="table-conatianer" onClick={handleClick}>
        <div className="title">
        <NavLink exact to="/admin/update" style={{textTransform: "uppercase"}} activeClassName="active-link">
          <h2>
            <span style={spanStyle}>Update Departures</span>
          </h2>
        </NavLink>
        </div>
    </div>
  )
}

export default FlightsTable
