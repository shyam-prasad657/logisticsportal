import React, { useState } from 'react';
import './update.css';
import { complaints, status } from '../mockData/mockData';

function Update() {
    const [idnumber, setIDnumber] = useState('');
    const invalidComplaint = false;

    const handlechange = (event) => {
        setIDnumber(event.target.value);
        // setInvalidComplaint(false); // Reset invalidComplaint state when user starts typing again
    };
    const handleDownloadTemplate = () => {
        const link = document.createElement('a');
        link.href = `${process.env.PUBLIC_URL}/update-status.xlsx`; // Path to the template file in the public folder
        link.download = 'bulk_status_update.xlsx';
        document.body.appendChild(link); // Append the link to the body
        link.click(); // Programmatically click the link to trigger the download
        document.body.removeChild(link); // Remove the link from the document
    };

    const filteredData = complaints.filter(item => item.complaintNumber.toString() === idnumber);

    return (
        <div className='container-fluid' id="update-page">
                <div className='container update'>
                <h3>Update Status</h3>
                <div className='p-2'>
                <div className='d-flex justify-content-between'>
                <label htmlFor="bulkimport" className="form-label"><h4>Bulk Update</h4></label>
                <p><a href="#" class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" onClick={handleDownloadTemplate}>Bulk Import Template</a></p>
                </div>
                <div className='d-flex justify-content-between'>
                <div className='col-8'>
                <input type="file" className="form-control" id="bulkimport"/>
                </div>
                <div>
                <button type="button" class="btn btn-success">Import</button>
                </div>
                </div>
                </div>
                </div>
            <form className='needs-validation' noValidate>
                <div className='container update'>
                    <div className='d-flex justify-content-between'>
                        <div className="col-md-4">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Complaint Number</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Complaint Number" onBlur={handlechange} required />
                            {filteredData.length === 0 && idnumber !== '' && !invalidComplaint && (
                                <div>
                                    <p className='error'>Complaint Number does not exist</p>
                                </div>
                            )}
                            {filteredData.map(item => (
                                <div key={item.complaintNumber} className='p-2'>
                                    <div><strong>Customer Name: </strong><i>{item.customerName}</i></div>
                                    <div><strong>Phone Number : </strong><i>{item.customerPhone}</i></div>
                                    <div><strong>Issue : </strong><i>{item.issue}</i></div>
                                    <div><strong>Current Status : </strong><i>{item.status}</i></div>
                                    <div><strong>Branch : </strong><i>{item.branch}</i></div>
                                    <div><strong>State : </strong><i>{item.state}</i></div>
                                </div>
                            ))}
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="input4" className="form-label">Status</label>
                            <select className="form-select" id="input4" aria-label="Default select example">
                                <option defaultValue>--Select Status--</option>
                                {status.map((item, index) => 
                                <option key = {index} value = {item}>{item}</option>
                                )}
                            </select>
                            <div className="d-flex justify-content-end mt-4">
                            <button type="submit" className="btn btn-primary">Update Status</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Update;
