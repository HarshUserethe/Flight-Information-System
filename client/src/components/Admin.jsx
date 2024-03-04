
import '../App.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';



const Admin = () => {

   const navigate = useNavigate();
   const [username, setUsername] = useState(); 
   const [password, setPassword] = useState(); 

   const handelUpdateButton = async () => {
    
    const response = await axios.get('http://localhost:8080/api/admin');
    
    if(username === response.data[0].username && password === response.data[0].password){
      navigate('/admin/update');
    }else{
      navigate('/admin/login');
      alert("Invalid Username or Password");
    }
   }

  return (
    <div className="card">
         <div className="sample-border"></div>
          
        <div className="login-container">
           <div className="login-area">
        <h3 style={{color:"#000", fontWeight:"500"}}>Admin Login</h3>
            <div className="lg">
              <label htmlFor="">Username</label>
              <input style={{width:"25vw"}} onChange={(e) => {setUsername(e.target.value)}} type="text" />
            </div>
            <div className="lg">
              <label htmlFor="">Password</label>
              <input style={{width:"25vw"}} onChange={(e) => {setPassword(e.target.value)}} type="password" />
            </div>
            <button onClick={handelUpdateButton}  style={{marginTop: "2vw"}}>Login</button>
           </div>
        </div>
    </div>
  )
}

export default Admin