import { findMaster } from "./fetchdata"

function DeleteModal({param, delete_event, mfiData, statusData}) {
    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="ModalLabel-1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="ModalLabel-1">Are you sure you want to delete it ?</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <b>Customer Name : </b>{param?.customerName} <br />
                    <b>Mfi Name : </b>{findMaster(param?.mfi, mfiData, 'mfi')} <br />
                    <b>Current Status: </b>{findMaster(param?.status, statusData, 'status')} <br />
                    <b>Client ID : </b>{param?.clientid} <br />
                    <b>Account ID : </b>{param?.accountid} <br />
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-danger" onClick={delete_event}>Delete</button>
                </div>
                </div>
            </div>
        </div>
    )
}



export default DeleteModal