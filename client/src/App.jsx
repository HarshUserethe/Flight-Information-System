import './App.css'
import FlightsTable from './components/FlightsTable'
import List from './components/List'
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import Admin from './components/Admin';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import UpdateForm from './components/UpdateForm';
import NewFlightForm from './components/NewFlightForm';
import Login from './components/Login';

function App() {


  return (
    <Router>
    
    <div className="main">
      <div className="top-heading-bar"> 
        <div className="icon"><CIcon icon={icon.cilFlightTakeoff} style={{color:"#fff", fontSize: "2vw !important"}} /></div>
        <h2>Jay Prakash Narayan International Airport</h2>
        <Login />
      </div>
      <FlightsTable />
      

      <Routes>
      <Route path="/admin/update" element={<UpdateForm />} />
      <Route path="/" element={<List />} />
      <Route path="/admin/login" element={<Admin />} />
      <Route path="/admin/addnew" element={<NewFlightForm />} />
      </Routes>

    </div>

    </Router>
  )
}

export default App
