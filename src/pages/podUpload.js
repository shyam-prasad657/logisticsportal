import React, { useState } from 'react';
import { complaints } from '../mockData/mockData';
import './podUpload.css';

export default function PODUpload() {
  const [idnumber, setIDnumber] = useState('');
    const invalidComplaint = false;

    const handlechange = (event) => {
        setIDnumber(event.target.value);
        // setInvalidComplaint(false); // Reset invalidComplaint state when user starts typing again
    };

    const filteredData = complaints.filter(item => item.complaintNumber.toString() === idnumber);
  return (
    <form className='needs-validation' noValidate>
    <div className='container-fluid' id = "upload-page">
        <div className='container upload'>
        <h3>POD Upload</h3>
            <div className='mt-4 p-2'>
            <div className='d-flex justify-content-between'>
            <div className="col-md-3">
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
            <div>
            <label htmlFor="uploadDC" className="form-label">IMEI Number</label>
            <input type="text" className="form-control" id="uploadDC" placeholder = "IMEI Number"/>
            </div>
            <div className='mt-4'>
            <label htmlFor="deliveryDate" className="form-label">Delivery Date</label>
            <input type="date" className="form-control" id="deliveryDate" placeholder = "Delivery Date"/>
            </div>
            </div>
            <div className='col-md-4'>
            <div>
            <label htmlFor="uploadDC" className="form-label">POD 1</label>
            <input type="file" className="form-control" id="uploadDC"/>
            </div>
            <div className = "mt-4">
            <label htmlFor="uploadDC" className="form-label">POD 2</label>
            <input type="file" className="form-control" id="uploadDC"/>
            </div>
            <div className = "mt-4">
            <label htmlFor="uploadDC" className="form-label">POD 2</label>
            <input type="file" className="form-control" id="uploadDC"/>
            </div>
            <div className = "d-flex justify-content-end mt-4">
            <button type="submit" className="btn btn-primary">Upload</button>
            </div>
            </div>
            </div>
            </div>
        </div>
    </div>
    </form>
  )
}
