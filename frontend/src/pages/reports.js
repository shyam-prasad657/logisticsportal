import { complaints, status, state } from '../mockData/mockData';
import './reports.css';
import { MdDelete } from "react-icons/md";
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { findMaster, useData } from '../components/fetchdata';
import DeleteModal from '../components/modal';
import Modal from '../components/selectModal';
import useSWR, { mutate } from 'swr';

    export default function Reports(){
        const [getData, setGetData] = useState([]);
        const { statusData, branchData, mfiData, vendorData,stateData } = useData();
        const [pageCount, setPageCount] = useState(0);
        const [currentPage, setCurrentPage] = useState(); // zero-indexed
        const [reset, setReset] = useState(false)

        const [filters, setFilters] = useState(
            {
                status : 0,
                state : 0,
                clientId : '',
                accountId : '',
                phoneNumber : '',
                from : '',
                to : ''
            }
        )
            const fetchData = async (page) => {
                try {
                    const response = await axios.get('http://localhost:8081/users', {
                        params : {
                            page,
                            status : filters.status || undefined,
                            state : filters.state || undefined,
                            clientId : filters.clientId || undefined,
                            accountId : filters.accountId || undefined,
                            phoneNumber : filters.phoneNumber || undefined,
                            from : filters.from || undefined,
                            to : filters.to || undefined
                        }
                    });
                    setGetData(response.data.data);
                    setPageCount(response.data.totalPages)
                }
                catch(error) {
                    console.error('Error fetching data', error);
                }
            }
        
        // Initial data load.
        useEffect(() => {
            fetchData(1);
        }, [reset]);

        // Handle page click event from ReactPaginate.
        const handlePageClick = (event) => {
            setCurrentPage(event.selected)
            fetchData(event.selected + 1)
        }
        const handlefilter = (e) => {
            setFilters({...filters, [e.target.name] : e.target.value});
            console.log(filters)
        }
        // Fetch data with current filters from first page.
        const handleFetch = () => {
            if(!filters.from || !filters.to) {
                setFilters({...filters, from : "", to : ""})
            }
            fetchData();
        };
        const handleReset = () => {
            setFilters({
                status : 0,
                state : 0,
                clientId : '',
                accountId : '',
                phoneNumber : '',
                from : '',
                to : ''
            });
            setReset(!reset);
            setCurrentPage(0);
            console.log("function ran")
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
            const params = new URLSearchParams();

        params.append("type", type);
        if (filters.status && filters.status !== "0") params.append("status", filters.status);
        if (filters.state && filters.state !== "0") params.append("state", filters.state);
        if (filters.clientId) params.append("clientId", filters.clientId);
        if (filters.accountId) params.append("accountId", filters.accountId);
        if (filters.phoneNumber) params.append("phoneNumber", filters.phoneNumber);
        if (filters.from) params.append("from", filters.from);
        if (filters.to) params.append("to", filters.to);
        window.open(`http://localhost:8081/export?${params.toString()}`, '_blank');
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
                fetchData(currentPage + 1);
            }
            catch(error) {
                console.error('An unexpected error occured.', error);
            }
        }

        //Select Item
        const [selectItem, setSelectItem] = useState();
        const fetcher = (url) => fetch(url).then((res) => res.json());
        const { data, error } = useSWR(selectItem ? `http://localhost:8081/reports/history?id=${selectItem?.accountid}` : null, fetcher);
        const handleSelect = (id) => {
            setSelectItem(id);
            // mutate(`http://localhost:8081/reports/history?id=${id?.accountid}`);
            if(error) {
                console.error('Get Error',error);
            }
            console.log('get Data',data?.list)
        }
        return(
            <div className= "container-fluid" id = "reports-page">
                <div className='container reports px-3'>
                    <div className='reports-header mb-3'>
                    <h3>Reports</h3>
                    <button onClick={() => handleExport('excel')} className="btn btn-success">Export to Excel</button>
                    {/* <button onClick={() => handleExport('csv')} className="btn btn-secondary">Export to CSV</button> */}
                    {/* <button onClick={() => handleExport('pdf')} className="btn btn-danger">Export to PDF</button> */}
                    </div>
                    <div className='row mb-4'>
                        <div className='filter-group col-md-4 mb-4'>
                        <label htmlFor="" className="form-label">Complaint Issued Date</label>
                        <div className="input-group filter-group col-md-3">
                        <input type = "date" className="form-control" placeholder="From" onChange={handlefilter} value = {filters.from} name = 'from'/>
                        <span className="input-group-text" >to</span>
                        <input type="date" className="form-control" placeholder="To" onChange={handlefilter} value = {filters.to} name = 'to'/>
                        </div>
                        </div>
                        <div className="filter-group col-md-4 mb-4">
                        <label htmlFor="col2_filter" className="form-label">Complaint Status</label>
                        <select className="form-select column_filter" aria-label="Default select example" value = {filters.status} onChange={handlefilter} name = "status" id="col2_filter">
                            <option defaultValue value = {0}>Select Complaint Status</option>
                            {statusData?.map((item, index) => 
                                <option key = {item.id} value = {item.id}>{item.status_name}</option>
                            )}
                            </select>
                        </div>
                        <div className="filter-group col-md-3 mb-4">
                        <label htmlFor="col3_filter" className="form-label">State</label>
                        <select className="form-select column_filter" aria-label="Default select example" value = {filters.state} onChange={handlefilter} name  = "state" id = "col3_filter">
                            <option defaultValue value = {0}>Select State</option>
                            {stateData?.map((item, index) =>
                            <option key = {item.id} value={item.id}>{item.state_name}</option>
                            )}
                        </select>
                        </div>
                        <div className="filter-group col-md-3 mb-4">
                        <label htmlFor="col4_filter" className="form-label">Client ID</label>
                        <input type="text" className="form-control column_filter" id="col4_filter" value = {filters.clientId} onChange={handlefilter} name = "clientId" placeholder="Enter Client ID" />
                        </div>
                        <div className="filter-group col-md-3 mb-4">
                        <label htmlFor="col5_filter" className="form-label">Account ID</label>
                        <input type="text" className="form-control column_filter" id="col5_filter" value = {filters.accountId} onChange={handlefilter} name = "accountId" placeholder="Enter Account ID" />
                        </div>
                        <div className="filter-group col-md-3 mb-4">
                        <label htmlFor="col6_filter" className="form-label">Customer Phone Number</label>
                        <input type="text" className="form-control column_filter" id="col6_filter" value = {filters.phoneNumber} onChange={handlefilter} name = "phoneNumber" placeholder="Enter Customer Ph No" />
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
                            {getData.map((item, index) => (
                            <tr key = {index}>
                            <td><MdDelete className='delete-icon'data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleDeleteClick(item)}/></td>
                            <td>{item.frontend_date}</td>
                            {/* <td scope="row">{item.id}</td> */}
                            <td>{item.clientid}</td>
                            <td><a data-bs-toggle="modal" data-bs-target="#order-detail" onClick = {() => handleSelect(item)}>{item.accountid}</a></td>
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
                        {/* Delete Modal */}
                        <DeleteModal param = {selectedItem} delete_event = {confirmDelete} mfiData = {mfiData} statusData={statusData}/>
                        {/* Modal */}
                        <Modal param = {selectItem} history = {data?.list} />
                    </div>
                </div>
        )
    }