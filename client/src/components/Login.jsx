
import { useNavigate } from "react-router-dom"
const Login = () => {
    const navigate = useNavigate();
  return (
    <div>
        <span style={{cursor: "pointer"}} onClick={() => {navigate('/admin/update')}}>Admin</span>
    </div>
  )
}

export default Login