import { complaints, status } from '../mockData/mockData';
import './datatable.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function DataTableprime(){
    
    const getStatusClass = (status) => {
        switch (status) {
            case 'In Process':
                return 'status-in-process';
            case 'Resolution Pending':
                return 'status-resolution-pending';
            case 'Resolved':
                return 'status-resolved';
            case 'Replacement Raised':
                return 'status-replacement-raised';
            return '';
        };
    }
        
    return(
        <div class="container-fluid" id = "reports-page">
            <div className='container reports px-3'>
                <div className='reports-header mb-3'>
                <h3>Reports</h3>
                <button type="button" className="btn btn-success">Export</button>
                </div>
                <div className='row mb-4'>
                    <div className='filter-group col-md-4 mb-4'>
                    <label htmlFor="" className="form-label">Complaint Issued Date</label>
                    <div className="input-group filter-group col-md-3">
                    <input type = "date" className="form-control" placeholder="From"/>
                    <span className="input-group-text" >to</span>
                    <input type="date" className="form-control" placeholder="To"/>
                    </div>
                    </div>
                    <div className="filter-group col-md-4 mb-4">
                    <label htmlFor="formGroupExampleInput" className="form-label">Complaint No.</label>
                    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Enter Complaint Number" />
                    </div>
                    <div className="filter-group col-md-4 mb-4">
                    <label htmlFor="dropdown" className="form-label">Complaint Status</label>
                    <select className="form-select" aria-label="Default select example" id = "dropdown">
                        <option defaultValue>Select Complaint Status</option>
                        {status.map((item, index) => 
                            <option key = {index} value = {item}>{item}</option>
                        )}
                        </select>
                    </div>
                    <div className="filter-group col-md-3 mb-4">
                    <label htmlFor="state" className="form-label">State</label>
                    <select className="form-select" aria-label="Default select example" id = "state">
                        <option defaultValue>Select State</option>
                        <option value="1">Tamil Nadu</option>
                        <option value="2">Kerala</option>
                        <option value="3">Karnataka</option>
                        </select>
                    </div>
                    <div className="filter-group col-md-3 mb-4">
                    <label htmlFor="formGroupExampleInput" className="form-label">Client ID</label>
                    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Enter Cient ID" />
                    </div>
                    <div className="filter-group col-md-3 mb-4">
                    <label htmlFor="formGroupExampleInput" className="form-label">Account ID</label>
                    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Enter Account ID" />
                    </div>
                    <div className="filter-group col-md-3 mb-4">
                    <label htmlFor="formGroupExampleInput" className="form-label">Customer Phone Number</label>
                    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Enter Customer Ph No" />
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary px-3">Filter</button>
                    </div>
                </div>
                <table className="table table-hover table-bordered">
                        <caption>Total 12 out of 12</caption>
                    <thead>
                        <tr>
                        <th scope="col">Complaint Number</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Branch</th>
                        <th scope="col">State</th>
                        <th scope="col">MFI</th>
                        <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.map((item) => (
                        <tr key = {item.complaintNumber}>
                        <th scope="row">{item.complaintNumber}</th>
                        <td>{item.customerName}</td>
                        <td>{item.branch}</td>
                        <td>{item.state}</td>
                        <td>{item.mfi}</td>
                        <td><div className="d-flex justify-content-center"><span className={`status-label ${getStatusClass(item.status)} col-md-6`}>{item.status}</span></div></td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
    )
}