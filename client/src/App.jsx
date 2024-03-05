import './App.css'
import List from './components/List'
 
import Admin from './components/Admin';
import { HashRouter, Routes, Route} from 'react-router-dom';
import EditFlight from './components/EditFlight';
import ArrivalPage from './components/ArrivalPage';
import UpdateArrival from './components/UpdateArrival';
 

function App() {


  return (
    <HashRouter>
    
    <div className="main">
    

      <Routes>
      <Route path="/admin/update" element={<EditFlight />} />
      <Route path="/admin/login" element={<Admin />} />
      <Route path="/admin/arrival" element={<UpdateArrival />} />
      <Route path="/arrival" element={<ArrivalPage />} />
      <Route path="/" element={<List />} />
      </Routes>

    </div>

    </HashRouter>
  )
}

export default App
