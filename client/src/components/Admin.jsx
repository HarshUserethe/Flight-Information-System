import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import '../App.css';
import {useNavigate} from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alingItems: "center",
    p: 4,
    borderRadius: "25px"
  };

const Admin = () => {

  const navigate = useNavigate();
  const handelUpdateButton = () => {
    navigate('/admin/update');
  }

    const [open, setOpen] =  useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [displayStatus, setDisplayStatus] = useState("none");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  
    const handleSubmit = async (event) => {
        event.preventDefault();
        
     const response = await axios.get('https://flight-information-server.onrender.com/api/admin');
       
        if(username === response.data[0].username && password === response.data[0].password){
            console.log("PASSED");
            setDisplayStatus("flex");
          
        }else{
          console.log("FAILED");
          setDisplayStatus("none");

          alert("Incorrect username or password")
        }

        handleClose();

    }


  return (
    <div className="card" style={{display: "flex", gap:"10px", position: "absolute", right: "0", padding: "15px"}}>
            <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="mf">
        <Typography id="modal-modal-description" sx={{ mt: 5 }} className="modalFont">
        <h3 style={{fontWeight: "500"}}>Admin Login</h3>
          <form>
            <div className="mb">
            <TextField onChange={(e) => setUsername(e.target.value)} id="outlined-basic" label="Username" variant="outlined" />
            <TextField onChange={(e) => setPassword(e.target.value)} id="outlined-basic" label="Password" variant="outlined" />
            <Button onClick={handleSubmit} variant="contained">Log In</Button>
            </div>
          </form>
        </Typography>
      </Box>
    </Modal>
        <div onClick={handleOpen}><p style={{fontSize: "1.2vw", cursor: "pointer", fontWeight: "600"}}>Admin</p></div>
        <div onClick={handelUpdateButton}><p style={{fontSize: "1.2vw", cursor: "pointer", fontWeight: "600", display: `${displayStatus}`}}>Update</p></div>
    </div>
  )
}

export default Admin