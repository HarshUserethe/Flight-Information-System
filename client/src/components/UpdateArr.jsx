import '../App.css'
import { NavLink } from 'react-router-dom'

function UpdateArr() {

  const handleClick = () => {
    window.location.reload();
  }

  return (
    <div className="table-conatianer">
        <div className="title" onClick={handleClick}>
        <NavLink exact to="/admin/arrival" style={{textTransform: "uppercase"}}>
          <h2>
            <span style={{ fontWeight: "600", fontSize: "1.8vw", cursor: "pointer" }}>Update Arrival</span>
          </h2>
        </NavLink>
        </div>
    </div>
  )
}

export default UpdateArr
