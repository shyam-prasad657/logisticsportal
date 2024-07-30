import { branch, mfi, state, status, vendorName } from '../mockData/mockData';
import './addComplaint.css';

export default function Complaint(){
    const handleDownloadTemplate = () => {
        const link = document.createElement('a');
        link.href = `${process.env.PUBLIC_URL}/import-complaint.xlsx`; // Path to the template file in the public folder
        link.download = 'bulk_import_template.xlsx';
        document.body.appendChild(link); // Append the link to the body
        link.click(); // Programmatically click the link to trigger the download
        document.body.removeChild(link); // Remove the link from the document
    };
    
    return(
        <div className= "container-fluid" id = "add-complaint-page">
            <div className='container add-complaint'>
                <h3>New Complaint</h3>
                <div className='px-4'>
                <div className='d-flex justify-content-between'>
                <label htmlFor="bulkimport" className="form-label"><h4>Bulk Import</h4></label>
                <p><a href="#" className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" onClick={handleDownloadTemplate}>Bulk Import Template</a></p>
                </div>
                <div className='d-flex justify-content-between'>
                <div className='col-8'>
                <input type="file" className="form-control" id="bulkimport"/>
                </div><div>
                <button type="button" className="btn btn-success">Import</button>
                </div></div></div></div>
            <div className='container add-complaint'>
                <div className='px-4'>
                <div className='add-header'>
                    <h4>Create New</h4>
                    </div>
                <div className = "row">
                <div className="col-md-6 mt-4">
                <label for="exampleFormControlInput1" className="form-label">Complaint Number</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Complaint Number" />
                </div>
                <div className="col-md-6 mt-4">
                <label for="exampleFormControlInput1" className="form-label">Customer Name</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Customer Name" />
                </div>
                <div className="col-md-6 mt-4">
                <label for="exampleFormControlInput1" className="form-label">Complaint Date</label>
                <input type="date" className="form-control" id="exampleFormControlInput1" placeholder="Complaint Number" />
                </div>
                <div className="col-md-6 mt-4">
                <label for="exampleFormControlInput1" className="form-label">Client ID</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Client ID" />
                </div>
                <div className="col-md-6 mt-4">
                <label for="exampleFormControlInput1" className="form-label">Account ID</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Account ID" />
                </div>
                <div className="col-md-6 mt-4">
                <label for="exampleFormControlInput1" className="form-label">Customer Phone Number</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Customer Phone Number" />
                </div>
                <div className="col-md-6 mt-4">
                <label for="input4" className="form-label">MFI</label>
                <select className="form-select" id = "input4" aria-label="Default select example">
                    {mfi.map((item, index) => 
                            <option key = {index} value = {item}>{item}</option>
                    )}
                </select>
                </div>
                <div className="col-md-6 mt-4">
                <label for="input4" className="form-label">Branch</label>
                <select className="form-select" id = "input4" aria-label="Default select example">
                <option defaultValue>--Select Branch--</option>
                    {branch.map((item, index) => 
                            <option key = {index} value = {item}>{item}</option>
                    )}
                </select>
                </div>
                <div className="col-md-6 mt-4">
                <label for="input4" className="form-label">State</label>
                <select className="form-select" id = "input4" aria-label="Default select example">
                <option defaultValue>--Select State--</option>
                    {state.map((item, index) => 
                            <option key = {index} value = {item}>{item}</option>
                    )}
                </select>
                </div>
                <div className="col-md-6 mt-4">
                <label for="input4" className="form-label">Vendor Name</label>
                <select className="form-select" id = "input4" aria-label="Default select example">
                <option defaultValue>--Select Vendor Name--</option>
                    {vendorName .map((item, index) =>
                            <option key = {index} value = {item}>{item}</option>
                    )}
                </select>
                </div>
                <div className="col-md-6 mt-4">
                <label for="exampleFormControlInput1" className="form-label">Issue</label>
                <textarea type="text" className="form-control" id="exampleFormControlInput1" placeholder="Explain the Issue" />
                </div>
                <div className='d-flex justify-content-center mt-4'>
                    <button type="submit" className="btn btn-success px-4">Create</button>
                </div>
                </div>
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