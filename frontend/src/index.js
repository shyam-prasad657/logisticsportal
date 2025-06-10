import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import 'datatables.net';
import { AuthProvider } from './components/fetchdata';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
    <App />
    </AuthProvider>
  </React.StrictMode>
);
