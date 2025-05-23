import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Navbar from './components/sidebar/navbar';
import { lazy, Suspense, useState } from 'react';
// import DataTable from './pages/datatable';
import Loading from './components/loading';
import SidebarComponent from './components/sidebar/react-sidebar';

const Reports = lazy(() => import("./pages/reports"));
const Home = lazy(() => import("./pages/home"));
const Complaint = lazy(() => import("./pages/addComplaint"));
const Update = lazy(() => import("./pages/update"));
const Upload = lazy(() => import("./pages/upload"));
const PODUpload = lazy(() => import("./pages/podUpload"));
const Mfi = lazy(() => import('./pages/master/mfi'));
const Status = lazy(() => import('./pages/master/status'));
const Vendor = lazy(() => import('./pages/master/vendor'));
const Branch = lazy(() => import('./pages/master/branch'));
const State = lazy(() => import('./pages/master/state'));

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
      {/* <Sidebar sidepanel={sidepanel}/> */}
      <SidebarComponent toggle={sidepanel} />
      {/* <div className = {sidepanel ? 'App shrink' : 'App grow'}> */}
      <div className='App'>
      <Suspense fallback = {<Loading />}>
      <Routes>
        <Route path = "/complaint-portal" element={<Home />} />
        <Route path = "/master/mfi" element={<Mfi />} />
        <Route path = "/master/status" element={<Status />} />
        <Route path = "/master/vendor" element={<Vendor />} />
        <Route path = "/master/branch" element={<Branch />} />
        <Route path = "/master/state" element={<State />} />

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
