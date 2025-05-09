import React, { useState } from 'react';
import { complaints } from '../mockData/mockData';
import './upload.css';
import { findMaster, useData } from '../components/fetchdata';
import useSWR from 'swr';
import axios from 'axios';

export default function Upload() {
    const [accountId, setAccountiD] = useState('');
    const { statusData, stateData, branchData } = useData();
    const [file, setFile] = useState(null);
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const {data, error } = useSWR(accountId ? `http://localhost:8081/getValue?id=${accountId}` : null, fetcher)
    const handleFind = (e) => {
        console.log(e.target.value);
        setAccountiD(e.target.value);
        // mutate(`http://localhost:8081/getValue?id=${accountId}`);
        if(error) {
            console.error('Get Error in Update Screen',error)
        }
    }
    console.log(error);
    const uploadDC = async () => {
        if (!file) return alert("Please choose a file");

        const formData = new FormData();
        formData.append("accountId", accountId)
        formData.append("dcfile", file);
        console.log(formData)
        try {
            const response = await axios.put(`http://localhost:8081/upload`,formData);
            const success = response?.data?.message
            alert(success)
            setAccountiD('');
            setFile(null);
        } catch(error) {
            const x = error?.response?.data?.message
            alert(x)
        }
    }
  return (
    <div className='container-fluid' id = "upload-page">
        <div className='container upload'>
        <h3>Upload Delivery Challan</h3>
            <div className='mt-4 p-2'>
            <div className='d-flex justify-content-between'>
            <div className="col-md-4">
                            <label htmlFor="uploadDC" className="form-label">Complaint Number</label>
                            <input type="text" className="form-control" id="uploadDC" placeholder="Account ID" onBlur={handleFind} required />
                            {!data?.data && (
                                <div>
                                    <p className='error'>{data?.message}</p>
                                </div>
                            )}
                            {data?.data?.map((item,index) => (
                                <div key={index} className='p-2'>
                                    <div><strong>Customer Name: </strong><i>{item?.customerName}</i></div>
                                    <div><strong>Phone Number : </strong><i>{item?.customerPhone}</i></div>
                                    <div><strong>Issue : </strong><i>{item?.issue}</i></div>
                                    <div><strong>Current Status : </strong><i>{findMaster(item?.status, statusData, 'status')}</i></div>
                                    <div><strong>Branch : </strong><i>{findMaster(item?.branch, branchData, 'branch')}</i></div>
                                    <div><strong>State : </strong><i>{findMaster(item?.state, stateData, 'state')}</i></div>
                                </div>
                            ))}
                        </div>
            <div className='col-md-5 align-self-start'>
            <label htmlFor="uploadDC" className="form-label">Upload DC</label>
            <input type="file" className="form-control" id="uploadDC" onChange={(e) => setFile(e.target.files[0])} accept = ".png, .jpg, .pdf"/>
            <div className = "d-flex justify-content-end mt-4">
            <button type="button" className="btn btn-success" onClick={uploadDC}
            disabled = {!data?.data || error || !file}>Import</button>
            </div>
            </div>
            </div>
            </div>
        </div>
        <div className='container upload'>
            <strong>Note: </strong><span>Once the DC is uploaded the status gets moved to <i>'DC Uploaded'</i></span>
        </div>
    </div>
  )
}
