import React, { useState } from 'react';
import { complaints } from '../mockData/mockData';
import './podUpload.css';
import { findMaster, useData } from '../components/fetchdata';
import useSWR from 'swr';
import axios from 'axios';

export default function PODUpload() {
    const [accountId, setAccountiD] = useState('');
    const [remarks, setRemarks] = useState('');
    const [deliverydate, setDeliverydate] = useState(null);

    const [ pod1, setPod1 ] = useState(null);
    const [ pod2, setPod2 ] = useState(null);
    const [ pod3, setPod3 ] = useState(null);

    const { statusData, stateData, branchData } = useData();

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
    const uploadPOD = async () => {
        const formData = new FormData();
        
        formData.append('accountId', accountId);
        formData.append('remarks', remarks);
        formData.append('deliveryDate', deliverydate);

        if(pod1) {
            formData.append('pod1', pod1)
        }
        if(pod2) {
            formData.append('pod2', pod2)
        }
        if(pod3) {
            formData.append('pod3', pod3)
        }

        try {
            const response = await axios.post(`http://localhost:8081/upload-pod/`,formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            );
            const success = response?.data?.message
            console.log(response)
            alert(success);
        } catch(err) {
            const x = err?.response?.data?.message;
            console.error(err)
            alert(x);
        }
    }
    
  return (
    <div className='container-fluid' id = "upload-page">
        <div className='container upload'>
        <h3>POD Upload</h3>
            <div className='mt-4 p-2'>
            <div className='d-flex justify-content-between'>
            <div className="col-md-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Account ID</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Account ID" onBlur={handleFind} required />
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
            <div className="col-md-4">
            <div>
            <label htmlFor="uploadDC" className="form-label">Remarks</label>
            <input type="text" className="form-control" id="uploadDC" placeholder = "Remarks" onChange={(e) => setRemarks(e.target.value)}/>
            </div>
            <div className='mt-4'>
            <label htmlFor="deliveryDate" className="form-label">Delivery Date</label>
            <input type="date" onChange={(e) => setDeliverydate(e.target.value)} className="form-control" id="deliveryDate" placeholder = "Delivery Date"/>
            </div>
            </div>
            <div className='col-md-4'>
            <div>
            <label htmlFor="uploadPOD1" className="form-label">POD 1</label>
            <input type="file" className="form-control" id="uploadPOD1" accept = ".png, .jpg" onChange={(e) => setPod1(e.target.files[0])} required/>
            </div>
            <div className = "mt-4">
            <label htmlFor="uploadPOD2" className="form-label">POD 2</label>
            <input type="file" className="form-control" id="uploadPOD2" accept = ".png, .jpg" onChange={(e) => setPod2(e.target.files[0])} required/>
            </div>
            <div className = "mt-4">
            <label htmlFor="uploadPOD3" className="form-label">POD 3</label>
            <input type="file" className="form-control" id="uploadPOD3" accept = ".png, .jpg" onChange={(e) => setPod3(e.target.files[0])} required/>
            </div>
            <div className = "d-flex justify-content-end mt-4">
            <button type="submit" className="btn btn-primary" onClick={uploadPOD}
            disabled = {!data?.data || !pod1 || !pod2 || !pod3 || error}
            >
                Upload
            </button>
            </div>
            </div>
            </div>
            </div>
        </div>
    </div>
  )
}
