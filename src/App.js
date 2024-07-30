import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Home from "./pages/home";
import Reports from "./pages/reports";
import Complaint from './pages/addComplaint';
import Navbar from './components/sidebar/navbar';
import { useState } from 'react';
import Update from './pages/update';
import Upload from './pages/upload';
import DataTable from './pages/datatable';
import PODUpload from './pages/podUpload';

function App() {
  const [sidepanel, setSidepanel] = useState(false);
    const showSidebar = () => {
        setSidepanel(!sidepanel)
        console.log(sidepanel)
    }
  return (
    <>
    <BrowserRouter>
    <Navbar showSidebar = {showSidebar}/>
      <div className = "container-fluid" id = "container-box">
      <Sidebar sidepanel={sidepanel}/>
      <div className = {sidepanel ? 'App shrink' : 'App grow'}>
      <Routes>
        <Route path = "/complaint-portal" element={<Home />} />
        <Route path = "/reports" element={<Reports />} />
        <Route path = "/datatable" element={<DataTable />} />
        <Route path = "/add" element={<Complaint />} />
        <Route path = "/update" element={<Update />} />
        <Route path = "/upload" element={<Upload />} />
        <Route path = "/podUpload" element={<PODUpload />} />
      </Routes>
      </div>
      </div>
      </BrowserRouter>
    </>
  );
}

export default App;
