import React, { useState } from 'react';
import './update.css';
import axios from 'axios';
import * as XLSX from "xlsx";
import { findMaster, useData } from '../components/fetchdata';
import useSWR, { mutate } from 'swr';

function Update() {
    const [accountId, setAccountiD] = useState('');
    const [updatedStatus, setUpdatedstatus] = useState();
    const [remarks, setRemarks] = useState();
    
    //put()
    const { statusData, stateData, branchData } = useData();
    // console.log(data.remarks)
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
            // if(response.data.message) {
            //     setData(); //Mutate data by swr
            // }
            alert(response.data.message);
        } catch (error) {
            console.error('Error updating status:', error);
            alert(error?.response?.data?.message || 'An unexpected error occurred.');
        }
    }
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const {data, error } = useSWR(accountId ? `http://localhost:8081/getValue?id=${accountId}` : null, fetcher)
    const handleFind = (e) => {
        console.log(e.target.value);
        setAccountiD(e.target.value);
        mutate(`http://localhost:8081/getValue?id=${accountId}`);
    }
    console.log(error);

    //Export File
    const [excelData, setExcelData] = useState([]);
    const handleFile = (e) => {
        const file = e.target.files[0];
        // console.log('Uploaded file: ',file)
        if(!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            const data = event.target.result;
            let workbook;

            if(file.name.endsWith(".csv")) {
                //Parse CSV file
                const csvData = XLSX.read(data, {type : "string"});
                const sheet = csvData.Sheets[csvData.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(sheet);
                setExcelData(jsonData);
            } else {
                // Parse Excel file (.xlsx, .xls)
                const binaryData = new Uint8Array(data);
                workbook = XLSX.read(binaryData, {type : "array"});
                const SheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[SheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                setExcelData(jsonData);
            }
        }
        if (file.name.endsWith(".csv")) {
            reader.readAsText(file);
        } else {
            reader.readAsArrayBuffer(file);
        }
        console.log(excelData)
    }
    const handleImport = async () => {
        console.log("Uploading Data", excelData);
        try {
            const response = await axios.put("http://localhost:8081/import-excel/update", {update : excelData});
            // if(response.data.message) {
            //     setData(); //Mutate data by swr
            // }
            alert(response.data.message);
        }
        catch(error) {
            console.error("Error Details: ",error);
            const ac = error?.response?.data?.message;
            if(ac === 'Status Validation') {
                let status_message = 'Invalid Status \n';
                error?.response?.data?.value.forEach((err) => 
                    status_message += `Row ${err.row} : ${err.message} \n`
            )
            alert(status_message)
            return false;
        }
        if (ac === "Account ID does not exists") {
            let accountid_message = "Account ID does not exists \n";
            error?.response?.data?.accountid.forEach((err) => 
                accountid_message += `${err} \n`
            )
            alert(accountid_message);
        return false;
        }
        if (ac === "Duplicate Account Ids") {
            let duplicate_message = "Duplicate Account IDs \n";
            error?.response?.data?.duplicates.forEach((err) => 
                duplicate_message += `${err} \n`
            )
            alert(duplicate_message);
        return false;
        }
            alert(ac)
        }
    }
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
                <input type="file" className="form-control" id="bulkimport" onChange={handleFile} accept = ".xlsx, .xls, .csv"/>
                </div>
                <div>
                <button type="button" className="btn btn-success" onClick={handleImport}>Import</button>
                </div>
                </div>
                </div>
                </div>
            <form onSubmit={handleSubmit}>
                <div className='container update'>
                    <div className='d-flex justify-content-around'>
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
                        <div className="col-md-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Remarks</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Remarks" onChange={(e) => setRemarks(e.target.value)} />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="input4" className="form-label">Status</label>
                            <select className="form-select" id="input4" aria-label="Default select example" onChange={(e) => setUpdatedstatus(e.target.value)}>
                                <option defaultValue>--Select Status--</option>
                                {statusData?.map((item, index) => 
                                <option key = {index} value = {item?.id}>{item?.status_name}</option>
                                )}
                            </select>
                            <div className="d-flex justify-content-end mt-4">
                            <button type="submit" className="btn btn-primary" 
                                disabled = {!data?.data || error}>
                                Update Status</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Update;
