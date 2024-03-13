import '../App.css'
import { NavLink } from 'react-router-dom'
const spanStyle = {
  fontWeight: 600,
  fontSize: "1.8vw",
  cursor: "pointer",
};

function UpdateArr() {

  const handleClick = () => {
    window.location.reload();
  }

  return (
    <div className="table-conatianer">
        <div className="title" onClick={handleClick}>
        <NavLink exact to="/admin/arrival" style={{textTransform: "uppercase"}} activeClassName="active-link">
          <h2>
            <span style={spanStyle} >Update Arrivals</span>
          </h2>
        </NavLink>
        </div>
    </div>
  )
}

export default UpdateArr
