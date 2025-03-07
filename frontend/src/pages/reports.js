    import { complaints, status, state } from '../mockData/mockData';
    import './reports.css';
    import { MdDelete } from "react-icons/md";
    // import 'datatables.net-buttons/js/buttons.colVis'; 
    import React, { useEffect, useState } from 'react';
    import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { findMaster, useData } from '../components/fetchdata';
    export default function Reports(){
        const [data, setData] = useState([]);
        const { statusData, branchData, mfiData, vendorData,stateData } = useData();
        const [pageCount, setPageCount] = useState(0);
        const [currentPage, setCurrentPage] = useState(0); // zero-indexed

        const [filters, setFilters] = useState(
            {
                status : 0,
                state : 0,
                clientId : '',
                accountId : '',
                phoneNumber : 0
            }
        )

        const fetchData = async (page = 1) => {
            try {
                const response = await axios.get('http://localhost:8081/users', {
                    params : {
                        page,
                        status : filters.status || undefined,
                        state : filters.state || undefined,
                        clientId : filters.clientId || undefined,
                        accountId : filters.accountId || undefined,
                        phoneNumber : filters.phoneNumber || undefined
                    }
                });
                setData(response.data.data);
                setPageCount(response.data.totalPages)
            }
            catch(error) {
                console.error('Error fetching data', error);
            }
        }
        // Initial data load.
        useEffect(() => {
            fetchData();
        }, []);

        // Handle page click event from ReactPaginate.
        const handlePageClick = (event) => {
            setCurrentPage(event.selected)
            fetchData(event.selected + 1)
        }
        const handlefilter = (e) => {
            setFilters({...filters, [e.target.name] : e.target.value})
        }
          // Fetch data with current filters from first page.
          const handleFetch = () => {
            fetchData(1);
        };
        const handleReset = () => {
            setFilters({
                status : 0,
                state : 0,
                clientId : '',
                accountId : '',
                phoneNumber : 0
            })
            fetchData(1);
            setCurrentPage(0);
        }

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
                        case 'Replacement Done':
                            return 'status-replacement-done';
                return '';
            };
        }
        // Open export endpoint in a new window (or tab)
        const handleExport = (type) => {
            // You can use window.location or window.open
            window.open(`http://localhost:8081/export?type=${type}&status=${filters.status || undefined}&state=${filters.state || undefined}&accountId=${filters.accountId || undefined}&clientId=${filters.clientId || undefined}&phoneNumber=${filters.phoneNumber || undefined}`, '_blank', '_blank');
        }
        //Delete
        const [selectedItem, setSelectedItem] = useState(null);
        const handleDeleteClick = (e) => {
            setSelectedItem(e);
            console.log(selectedItem)
        }

        const confirmDelete = async () => {
            try {
                const response = await axios.delete(`http://localhost:8081/api/delete/${selectedItem.id}`)
                alert(response.data.message)
                console.log(selectedItem.id)
                window.location.reload();
            }
            catch(error) {
                console.error('An unexpected error occured.', error);
            }
        }
        return(
            <div className= "container-fluid" id = "reports-page">
                <div className='container reports px-3'>
                    <div className='reports-header mb-3'>
                    <h3>Reports</h3>
                    <button onClick={() => handleExport('excel')} className="btn btn-success">Export to Excel</button>
                    <button onClick={() => handleExport('csv')} className="btn btn-secondary">Export to CSV</button>
                    <button onClick={() => handleExport('pdf')} className="btn btn-danger">Export to PDF</button>
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
                        <label htmlFor="col2_filter" className="form-label">Complaint Status</label>
                        <select className="form-select column_filter" aria-label="Default select example" onChange={handlefilter} name = "status" id="col2_filter">
                            <option defaultValue value = {0}>Select Complaint Status</option>
                            {statusData.map((item, index) => 
                                <option key = {item.id} value = {item.id}>{item.status_name}</option>
                            )}
                            </select>
                        </div>
                        <div className="filter-group col-md-3 mb-4">
                        <label htmlFor="col3_filter" className="form-label">State</label>
                        <select className="form-select column_filter" aria-label="Default select example" onChange={handlefilter} name  = "state" id = "col3_filter">
                            <option defaultValue value = {0}>Select State</option>
                            {stateData.map((item, index) =>
                            <option key = {item.id} value={item.id}>{item.state_name}</option>
                            )}
                        </select>
                        </div>
                        <div className="filter-group col-md-3 mb-4">
                        <label htmlFor="col4_filter" className="form-label">Client ID</label>
                        <input type="text" className="form-control column_filter" id="col4_filter" onChange={handlefilter} name = "clientId" placeholder="Enter Client ID" />
                        </div>
                        <div className="filter-group col-md-3 mb-4">
                        <label htmlFor="col5_filter" className="form-label">Account ID</label>
                        <input type="text" className="form-control column_filter" id="col5_filter" onChange={handlefilter} name = "accountId" placeholder="Enter Account ID" />
                        </div>
                        <div className="filter-group col-md-3 mb-4">
                        <label htmlFor="col6_filter" className="form-label">Customer Phone Number</label>
                        <input type="text" className="form-control column_filter" id="col6_filter" onChange={handlefilter} name = "phoneNumber" placeholder="Enter Customer Ph No" />
                        </div>
                        <div className="d-flex justify-content-around">
                            <button onClick = {handleFetch} className="btn btn-primary px-3">Filter</button>
                            <button onClick = {handleReset} className="btn btn-primary px-3">Reset</button>
                        </div>
                    </div>
                    <div className='table-container'>
                        <table className="table table-hover table-bordered">
                            {/* <caption>Total 12 out of 12</caption> */}
                        <thead>
                            <tr>
                            <th scope="col">Action</th>
                            <th scope="col">Complaint Date</th>
                            <th scope="col">Client ID</th>
                            <th scope="col">Account ID</th>
                            <th scope="col">Customer Name</th>
                            <th scope="col">Branch</th>
                            <th scope="col">State</th>
                            <th scope="col">MFI</th>
                            <th scope="col">Status</th>
                            <th scope="col">Issue</th>
                            <th scope="col">Remarks</th>
                            <th scope="col">Customer Phone Number</th>
                            <th scope="col">Vendor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                            <tr key = {index}>
                            <td><MdDelete className='delete-icon'data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleDeleteClick(item)}/></td>
                            <td>{item.complaintDate}</td>
                            {/* <td scope="row">{item.id}</td> */}
                            <td>{item.clientid}</td>
                            <td>{item.accountid}</td>
                            <td>{item.customerName}</td>
                            <td>{findMaster(item.branch, branchData, 'branch')}</td>
                            <td>{findMaster(item.state, stateData, 'state')}</td>
                            <td>{findMaster(item.mfi, mfiData, 'mfi')}</td>
                            <td><div className="d-flex justify-content-center"><span className={`status-label ${getStatusClass(findMaster(item.status, statusData, 'status'))} col-md-6`}>{findMaster(item.status, statusData, 'status')}</span></div></td>
                            <td>{item.issue}</td>
                            <td>{item.remarks}</td>
                            <td>{item.customerPhone}</td>
                            <td>{findMaster(item.vendorName, vendorData, 'vendor')}</td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                        </div>
                        <ReactPaginate 
                            previousLabel = {'Previous'}
                            nextLabel = {'Next'}
                            breakLabel = {'...'}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            forcePage={currentPage}
                            onPageChange={handlePageClick}
                            containerClassName = 'pagination'
                            activeClassName = 'active'
                            previousClassName = 'page-item'
                            previousLinkClassName = 'page-link'
                            nextClassName = 'page-item'
                            nextLinkClassName = 'page-link'
                            pageClassName = 'page-item'
                            pageLinkClassName = 'page-link'
                            />
                        {/* Modal */}
                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Are you sure you want to delete it ?</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <b>Customer Name : </b>{selectedItem?.customerName} <br />
                                <b>Mfi Name : </b>{findMaster(selectedItem?.mfi, mfiData, 'mfi')} <br />
                                <b>Current Status: </b>{findMaster(selectedItem?.status, statusData, 'status')} <br />
                                <b>Client ID : </b>{selectedItem?.clientid} <br />
                                <b>Account ID : </b>{selectedItem?.accountid} <br />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
        )
    }