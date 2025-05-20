import { findMaster, useData } from "./fetchdata";

export default function Modal ({ param,pod, history }) {
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
                    <span className = "col-md-4"><b>MFI : </b>{param?.mfi}<br /></span>
                    <span className = "col-md-8 mt-2"><b>Issue : </b>{param?.issue}<br /></span>
                    <span className = "col-md-4 mt-2"><b>Vendor : </b>{param?.vendor}<br /></span>
                    <span className = "col-md-8 mt-2"><b>Branch : </b>{param?.branch}<br /></span>
                    <span className = "col-md-4 mt-2"><b>State : </b>{param?.state}<br /></span>
                    </div>
                    <hr />
                    {pod?.pod_1 || pod?.pod_2 || pod?.pod_3 ? (
                        <>
                        <b className="mb-2">Delivery Data</b>
                        <p>Delivery Date - {pod?.delivery_date}</p>
                        <div className="row justify-content-around">
                            <img className="col-md-2"
                            src = {`http://localhost:8081/${pod?.pod_1}`}
                            height= '100'
                            width = '100'
                            onClick={() => {window.open(`http://localhost:8081/${pod?.pod_1}`, '_blank')}}
                            ></img>
                            <img className="col-md-2"
                            src = {`http://localhost:8081/${pod?.pod_2}`}
                            height= '100'
                            width = '100'
                            onClick={() => {window.open(`http://localhost:8081/${pod?.pod_2}`, '_blank')}}
                            ></img>
                            <img className="col-md-2"
                            src = {`http://localhost:8081/${pod?.pod_3}`}
                            height= '100'
                            width = '100'
                            onClick={() => {window.open(`http://localhost:8081/${pod?.pod_3}`, '_blank')}}
                            ></img>
                        </div>
                        </>
                        ) : 'POD not yet uploaded'}

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
                        <td>{e.status_name}</td>
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