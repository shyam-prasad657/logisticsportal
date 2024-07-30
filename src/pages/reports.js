import { complaints, status, state } from '../mockData/mockData';
import 'datatables.net-responsive-dt';
import $ from 'jquery';
import './reports.css';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/dataTables.buttons';
// import 'datatables.net-buttons/js/buttons.colVis'; 
import { useEffect } from 'react';

export default function Reports(){
    
    useEffect(() => {
        const table = $('#myTable').DataTable();
        function filterColumn(i) {
            table
              .column(i)
              .search(
                $(`#col${i}_filter`).val()
              )
              .draw();
          }
      
          $('input.column_filter').on('keyup click', function () {
            const columnIndex = $(this).data('column');
            filterColumn(columnIndex);
          });
          $('select.column_filter').on('change', function () {
            const columnIndex = $(this).data('column');
            filterColumn(columnIndex);
          });
          $('#col8_filter').on('change', function () {
            const selectedValue = this.value;
            if (selectedValue === 'Select Complaint Status') {
              table
                .column(8)
                .search('')
                .draw();
            } else {
              table
                .column(8)
                .search(selectedValue)
                .draw();
            }
          });
          $('#state_filter').on('change', function () {
            const selectedValue = this.value;
            if (selectedValue === 'Select State') {
                table
                    .column(6)
                    .search('')
                    .draw();
            } else {
                table
                    .column(6)
                    .search(selectedValue)
                    .draw();
            }
        });
          // Export to Excel button setup
        $('#exportBtn').on('click', function () {
            table.button('.buttons-excel').trigger();
        });

        // Initialize buttons after DataTable has been initialized
        new $.fn.dataTable.Buttons(table, {
            buttons: [
                {
                    extend: 'excelHtml5',
                    text: 'Export',
                    className: 'btn btn-success',
                    exportOptions: {
                        columns: ':visible'
                    }
                }
                // ,{
                //     extend: 'colvis',
                //     text: 'Toggle Columns',
                //     className: 'btn btn-info'
                // }
            ]
        });
        table.buttons(0, null).container().appendTo($('#export-container'));
    }, []);
    
    // new DataTable('#myTable');

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
            return '';
        };
    }
        
    return(
        <div className= "container-fluid" id = "reports-page">
            <div className='container reports px-3'>
                <div className='reports-header mb-3'>
                <h3>Reports</h3>
                <div id = "export-container"></div>
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
                    <label htmlFor="col1_filter" className="form-label">Complaint No.</label>
                    <input type="text" className="form-control column_filter" id="col1_filter" data-column="1" placeholder="Enter Complaint Number"/>
                    </div>
                    <div className="filter-group col-md-4 mb-4">
                    <label htmlFor="col8_filter" className="form-label">Complaint Status</label>
                    <select className="form-select column_filter" aria-label="Default select example" data-column="8" id="col8_filter">
                        <option defaultValue>Select Complaint Status</option>
                        {status.map((item, index) => 
                            <option key = {index} value = {item}>{item}</option>
                        )}
                        </select>
                    </div>
                    <div className="filter-group col-md-3 mb-4">
                    <label htmlFor="col6_filter" className="form-label">State</label>
                    <select className="form-select column_filter" aria-label="Default select example" data-column = "6" id = "col6_filter">
                        <option defaultValue>Select State</option>
                        {state.map((item, index) =>
                        <option key = {index} value={item}>{item}</option>
                        )}
                        </select>
                    </div>
                    <div className="filter-group col-md-3 mb-4">
                    <label htmlFor="col2_filter" className="form-label">Client ID</label>
                    <input type="text" className="form-control column_filter" id="col2_filter" data-column = "2" placeholder="Enter Cient ID" />
                    </div>
                    <div className="filter-group col-md-3 mb-4">
                    <label htmlFor="col3_filter" className="form-label">Account ID</label>
                    <input type="text" className="form-control column_filter" id="col3_filter" data-column = "3" placeholder="Enter Account ID" />
                    </div>
                    <div className="filter-group col-md-3 mb-4">
                    <label htmlFor="col11_filter" className="form-label">Customer Phone Number</label>
                    <input type="text" className="form-control column_filter" data-column = "11" id="col11_filter" placeholder="Enter Customer Ph No" />
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary px-3">Filter</button>
                    </div>
                </div>
                <div className='table-container'>
                    <table className="table table-hover table-bordered" id = "myTable">
                        {/* <caption>Total 12 out of 12</caption> */}
                    <thead>
                        <tr>
                        <th scope="col">Complaint Date</th>
                        <th scope="col">Complaint Number</th>
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
                        {complaints.map((item) => (
                        <tr key = {item.complaintNumber}>
                        <td>{item.complaintDate}</td>
                        <td scope="row">{item.complaintNumber}</td>
                        <td>{item.clientID}</td>
                        <td>{item.AccountID}</td>
                        <td>{item.customerName}</td>
                        <td>{item.branch}</td>
                        <td>{item.state}</td>
                        <td>{item.mfi}</td>
                        <td><div className="d-flex justify-content-center"><span className={`status-label ${getStatusClass(item.status)} col-md-6`}>{item.status}</span></div></td>
                        <td>{item.issue}</td>
                        <td>{item.remarks}</td>
                        <td>{item.customerPhone}</td>
                        <td>{item.vendorName}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                    </div>
                </div>
            </div>
    )
}