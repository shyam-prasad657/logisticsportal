import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Navbar from './components/sidebar/navbar';
import { lazy, Suspense, useState } from 'react';
// import DataTable from './pages/datatable';
import Loading from './components/loading';

const Reports = lazy(() => import("./pages/reports"));
const Home = lazy(() => import("./pages/home"));
const Complaint = lazy(() => import("./pages/addComplaint"));
const Update = lazy(() => import("./pages/update"));
const Upload = lazy(() => import("./pages/upload"));
const PODUpload = lazy(() => import("./pages/podUpload"));

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
      <Suspense fallback = {<Loading />}>
      <Routes>
        <Route path = "/complaint-portal" element={<Home />} />
        <Route path = "/reports" element={<Reports />} />
        <Route path = "/add" element={<Complaint />} />
        <Route path = "/update" element={<Update />} />
        <Route path = "/upload" element={<Upload />} />
        <Route path = "/podUpload" element={<PODUpload />} />
        {/* <Route path = "/datatable" element={<DataTable />} /> */}
      </Routes>
      </Suspense>
      </div>
      </div>
      </BrowserRouter>
    </>
  );
}

export default App;
