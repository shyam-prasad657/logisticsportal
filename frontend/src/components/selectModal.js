import { findMaster, useData } from "./fetchdata";

export default function Modal ({ param, history }) {
    const { statusData, branchData, mfiData, vendorData,stateData } = useData();
    return(
        <div className="modal fade" id="order-detail" tabIndex="-1" aria-labelledby="ModalLabel-2" aria-hidden="true">
            <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="ModalLabel-2">Order History</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="row">
                    <span className="col-md-8"><b>Customer Name : </b>{param?.customerName}<br /></span>
                    <span className = "col-md-4"><b>MFI : </b>{findMaster(param?.mfi, mfiData, 'mfi')}<br /></span>
                    <span className = "col-md-8 mt-2"><b>Issue : </b>{param?.issue}<br /></span>
                    <span className = "col-md-4 mt-2"><b>Vendor : </b>{findMaster(param?.vendorName, vendorData, 'vendor')}<br /></span>
                    <span className = "col-md-8 mt-2"><b>Branch : </b>{findMaster(param?.branch, branchData, 'branch')}<br /></span>
                    <span className = "col-md-4 mt-2"><b>State : </b>{findMaster(param?.state, stateData, 'state')}<br /></span>
                    </div>
                    <hr />
                    <b>History Table :</b> 
                    <div className="table-container mt-2">
                    <table className="table">
                    <thead>
                    <th>Action</th>
                    <th>Status</th>
                    <th>Remarks</th>
                    <th>Updation Time</th>
                    </thead>
                    {history?.map((e, index) => (
                        <tr key={index} className='p-2'>
                        <td>{e.action}</td>
                        <td>{findMaster(e.status, statusData, 'status')}</td>
                        <td>{e.remarks}</td>
                        <td>{e.created_at}</td>
                        </tr>
                    ))}
                    </table>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
    )
}