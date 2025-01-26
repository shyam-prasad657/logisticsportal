import React, { useEffect, useMemo, useState } from 'react';
import './update.css';
import { complaints, status } from '../mockData/mockData';
import axios from 'axios';

function Update() {
    const [accountId, setAccountiD] = useState('');
    const [updatedStatus, setUpdatedstatus] = useState();
    const [remarks, setRemarks] = useState();
    const invalidComplaint = false;

    //put()
    const [data, setData] = useState([]);
    const [statusData, setStatusdata] = useState([]);
    const [stateData, setStatedata] = useState([]);
    const [branchData, setBranchdata] = useState([]);

        useEffect(()=> {//userdb
                    fetch('http://localhost:8081/userdb')
                    .then(res => res.json())
                    .then(data => setData(data))
                    .catch(err => console.log(err))
                },[data]);
        useEffect(()=> {//states
            fetch('http://localhost:8081/states')
            .then(res => res.json())
            .then(data => setStatedata(data))
            .catch(err => console.log(err))
        },[]);
        useEffect(()=> {//branch
            fetch('http://localhost:8081/branch')
            .then(res => res.json())
            .then(data => setBranchdata(data))
            .catch(err => console.log(err))
        },[]);
        useEffect(()=> {//status
            fetch('http://localhost:8081/status')
            .then(res => res.json())
            .then(data => setStatusdata(data))
            .catch(err => console.log(err))
        },[]);

        const findStatus = (e) => {
            const x = statusData.find((r) => r.id === e)
            return x.status_name
        }
        const findBranch = (e) => {
            const x = branchData.find((r) => r.id === e)
            return x.branch_name
        }
        const findState = (e) => {
            const x = stateData.find((r) => r.id === e)
            return x.state_name
        }

    const handleDownloadTemplate = () => {
        const link = document.createElement('a');
        link.href = `${process.env.PUBLIC_URL}/update-status.xlsx`; // Path to the template file in the public folder
        link.download = 'bulk_status_update.xlsx';
        document.body.appendChild(link); // Append the link to the body
        link.click(); // Programmatically click the link to trigger the download
        document.body.removeChild(link); // Remove the link from the document
    };
    const handleSubmit = async (e) => {
        console.log(accountId, updatedStatus)
        // e.preventDefault();
        try {
            console.log('Payload:', { accountId, updatedStatus, remarks });
            const response = await axios.put('http://localhost:8081/update-status', { accountId, updatedStatus, remarks });
            alert(response.data.message);
        } catch (error) {
            console.error('Error updating status:', error);
            if (!error.response) {
                alert('Network error: Unable to connect to the server.');
            } else {
                alert(error.response.data?.message || 'An unexpected error occurred.');
            }
        }

    }

    const filteredData = useMemo(
        () => data.filter(item => item.accountid === accountId), [data,accountId]
    )
    return (
        <div className='container-fluid' id="update-page">
                <div className='container update'>
                <h3>Update Status</h3>
                <div className='p-2'>
                <div className='d-flex justify-content-between'>
                <label htmlFor="bulkimport" className="form-label"><h4>Bulk Update</h4></label>
                <p><a href="#" className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" onClick={handleDownloadTemplate} required>Bulk Import Template</a></p>
                </div>
                <div className='d-flex justify-content-between'>
                <div className='col-8'>
                <input type="file" className="form-control" id="bulkimport"/>
                </div>
                <div>
                <button type="button" className="btn btn-success">Import</button>
                </div>
                </div>
                </div>
                </div>
            <form onSubmit={handleSubmit}>
                <div className='container update'>
                    <div className='d-flex justify-content-around'>
                        <div className="col-md-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Account ID</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Account ID" onChange={(e) => setAccountiD(e.target.value)} required />
                            {filteredData.length === 0 && accountId !== '' && !invalidComplaint && (
                                <div>
                                    <p className='error'>Complaint Number does not exist</p>
                                </div>
                            )}
                            {filteredData.map((item,index) => (
                                <div key={index} className='p-2'>
                                    <div><strong>Customer Name: </strong><i>{item.customerName}</i></div>
                                    <div><strong>Phone Number : </strong><i>{item.customerPhone}</i></div>
                                    <div><strong>Issue : </strong><i>{item.issue}</i></div>
                                    <div><strong>Current Status : </strong><i>{findStatus(item.status)}</i></div>
                                    <div><strong>Branch : </strong><i>{findBranch(item.branch)}</i></div>
                                    <div><strong>State : </strong><i>{findState(item.state)}</i></div>
                                </div>
                            ))}
                        </div>
                        <div className="col-md-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Remarks</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Remarks" onChange={(e) => setRemarks(e.target.value)} required />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="input4" className="form-label">Status</label>
                            <select className="form-select" id="input4" aria-label="Default select example" onChange={(e) => setUpdatedstatus(e.target.value)}>
                                <option defaultValue>--Select Status--</option>
                                {statusData.map((item, index) => 
                                <option key = {index} value = {item.id}>{item.status_name}</option>
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
