import './App.css'
import FlightsTable from './components/FlightsTable'
import List from './components/List'
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

function App() {


  return (
    <div className="main">
      <div className="top-heading-bar">
        <div className="icon"><CIcon icon={icon.cilFlightTakeoff} style={{color:"#fff", fontSize: "2vw !important"}} /></div>
        <h2>Jay Prakash Narayan International Airport</h2>
      </div>
      <FlightsTable />
      <List />

    </div>
  )
}

export default App
