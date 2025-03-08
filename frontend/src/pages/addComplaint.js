import { useState } from 'react';
import axios from 'axios';
import './addComplaint.css';
import * as XLSX from "xlsx";
import { useData } from '../components/fetchdata';

export default function Complaint(){
    const handleDownloadTemplate = () => {
        const link = document.createElement('a');
        link.href = `${process.env.PUBLIC_URL}/import-complaint.xlsx`; // Path to the template file in the public folder
        link.download = 'bulk_import_template.xlsx';
        document.body.appendChild(link); // Append the link to the body
        link.click(); // Programmatically click the link to trigger the download
        document.body.removeChild(link); // Remove the link from the document
    };
    //fetch sql data
    const { mfiData, branchData, vendorData, stateData } = useData();
    //post data
    const [formData, setFormData] = useState({
        name : '',
        phone : '',
        accountid : '',
        date : '',
        clientid : '',
        mfi : '',
        branch : '',
        state : '',
        vendor : '',
        issue : ''
    })
    const handleForm = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.name, formData.phone, formData.accountid, formData.date, formData.clientid, formData.mfi, formData.branch, formData.state, formData.vendor, formData.issue)
    try {
      const response = await axios.post('http://localhost:8081/submit', {formData});
      alert(response.data.message);
      window.location.reload();
    } catch (error) {
        console.error(error?.response?.data?.message)
        alert(error?.response?.data?.message || "Unknown Error");
    }
  };
   //Excel Import
   const [excelData, setExcelData] = useState([]);

   const handleFileUpload = (e) => {
    const file = e.target.files[0];
    // console.log(file)

    if(!file) return;
    const reader = new FileReader();
    // console.log(reader);
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
            const binaryData = new Uint8Array(event.target.result);
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
   const handleUpload = async () => {
    console.log("Uploading Data: ",excelData); //log data in console
    try {
        const response = await axios.post("http://localhost:8081/import-excel", { users : excelData });
        alert(response.data.message);
        window.location.reload();
    } catch(error) {
        console.error("Error Details:", error);
        if (error?.response?.data?.message === "Validation errors found") {
            let errorMessage = "Validation Errors:\n";
            error?.response?.data?.errors.forEach(err => {
                errorMessage += `Row ${err?.row}: ${err?.field} - ${err?.message}\n`;
            });
            alert(errorMessage);
            return false;
        }
        else if (error?.response?.data?.message === "Account ID already exists") {
            let errorMessage = "Account ID already exists: \n";
            error?.response?.data?.duplicates.forEach(err => {
                errorMessage += `${err} \n`;
            })
            alert(errorMessage);
            window.location.reload();
        }
    }
   }


    return(
        <div className= "container-fluid" accountid = "add-complaint-page">
            <div className='container add-complaint'>
                <h3>New Complaint</h3>
                <div className='px-4'>
                <div className='d-flex justify-content-between'>
                <label htmlFor="bulkimport" className="form-label"><h4>Bulk Import</h4></label>
                <p><a href="#" className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" onClick={handleDownloadTemplate}>Bulk Import Template</a></p>
                </div>
                <div className='d-flex justify-content-between'>
                <div className='col-8'>
                <input type="file" accept = ".xlsx, .xls, .csv" onChange={handleFileUpload} className="form-control" id="bulkimport"/>
                </div><div>
                <button type="button" className="btn btn-success" onClick={handleUpload}>Import</button>
                </div></div></div></div>
            <div className='container add-complaint'>
                <div className='px-4'>
                <div className='add-header'>
                    <h4>Create New</h4>
                    </div>
                <form onSubmit={handleSubmit}>
                <div className = "row">
                <div className="col-md-6 mt-4">
                <label htmlFor="exampleFormControlInput1" className="form-label">Customer Name</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Customer Name" name = 'name' onChange={handleForm} required/>
                </div>
                <div className="col-md-6 mt-4">
                <label htmlFor="exampleFormControlInput1" className="form-label">Complaint Date</label>
                <input type="date" className="form-control" id="exampleFormControlInput1" placeholder="Complaint Date" name = 'date' onChange={handleForm} required/>
                </div>
                <div className="col-md-6 mt-4">
                <label htmlFor="exampleFormControlInput1" className="form-label">Client ID</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Client ID" name = 'clientid' onChange={handleForm} required/>
                </div>
                <div className="col-md-6 mt-4">
                <label htmlFor="exampleFormControlInput1" className="form-label">Account ID</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Account ID" name = 'accountid' onChange={handleForm} required/>
                </div>
                <div className="col-md-6 mt-4">
                <label htmlFor="exampleFormControlInput1" className="form-label">Customer Phone Number</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Customer Phone Number" name = 'phone' onChange={handleForm} required/>
                </div>
                <div className="col-md-6 mt-4">
                <label htmlFor="input4" className="form-label">MFI</label>
                <select className="form-select" id = "input4" aria-label="Default select example" name = 'mfi' onChange={handleForm} required>
                <option defaultValue>--Select MFI--</option>
                    {mfiData.map((item, index) => 
                            <option key = {index} value = {item.id}>{item.mfi_name}</option>
                    )}
                </select>
                </div>
                <div className="col-md-6 mt-4">
                <label htmlFor="input4" className="form-label">Branch</label>
                <select className="form-select" id = "input4" aria-label="Default select example" name = 'branch' onChange={handleForm} required>
                <option defaultValue>--Select Branch--</option>
                    {branchData.map((item, index) => 
                        <option key = {index} value = {item.id}>{item.branch_name}</option>
                    )}
                </select>
                </div>
                <div className="col-md-6 mt-4">
                <label htmlFor="input4" className="form-label">State</label>
                <select className="form-select" id = "input4" aria-label="Default select example" name = 'state' onChange={handleForm} required>
                <option defaultValue>--Select State--</option>
                    {stateData.map((item, index) => 
                            <option key = {index} value = {item.id}>{item.state_name}</option>
                    )}
                </select>
                </div>
                <div className="col-md-6 mt-4">
                <label htmlFor="input4" className="form-label">Vendor Name</label>
                <select className="form-select" id = "input4" aria-label="Default select example" name = 'vendor' onChange={handleForm} required>
                <option defaultValue>--Select Vendor Name--</option>
                    {vendorData.map((item, index) =>
                            <option key = {index} value = {item.id}>{item.vendor_name}</option>
                    )}
                </select>
                </div>
                <div className="col-md-6 mt-4">
                <label htmlFor="exampleFormControlInput1" className="form-label">Issue</label>
                <textarea type="text" className="form-control" id="exampleFormControlInput1" placeholder="Explain the Issue" name = 'issue' onChange={handleForm}/>
                </div>
                <div className='d-flex justify-content-center mt-4'>
                    <button type="submit" className="btn btn-success px-4">Create</button>
                </div>
                </div>
                </form>
                </div>
            </div>
        </div>
    )
}

// To fulfill your requirement of downloading an Excel template when clicking the "Bulk Import Template" link, I incorporated the following concepts:

// Environment Variable:

// Used process.env.PUBLIC_URL to dynamically reference the public URL of the template file. This ensures the correct file path regardless of the deployment environment.
// DOM Manipulation:

// Created an anchor (<a>) element programmatically using JavaScript.
// Set the href attribute of the anchor to the template file path and the download attribute to specify the filename for the download.
// Appended the anchor element to the document body to make it part of the DOM.
// Triggered a click event on the anchor element programmatically to start the download.
// Removed the anchor element from the document body after the download to keep the DOM clean.
// Event Handling:

// Added an onClick event handler to the link to call the handleDownloadTemplate function when the link is clicked.