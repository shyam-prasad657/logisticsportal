import { MdDelete } from "react-icons/md";
import { useData } from "../../components/fetchdata";
import './master.css';
import axios from "axios";
import { useState } from "react";

export default function Status() {
    const { statusData } = useData();
    const [status, setStatus] = useState('');
    const handleAdd = async () => {
        try {
            const response = await axios.post(`http://localhost:8081/master/status?value=${status}`);
            alert(response.data.message);
        } catch (err) {
            console.error(err);
            const x = err?.response?.data?.message || 'Network Error';
            alert(x);
        }
    }
    console.log(statusData)
    return(
        <div className="container-fluid" id = "master-page">
            <div className="container master">
                <h3 className='text-center'>Status table</h3>
                <button className = 'btn btn-primary mb-3' data-bs-toggle="modal" data-bs-target="#status-modal">Add</button>
                <table className="table table-hover table-bordered">
                    {/* <caption>Total 12 out of 12</caption> */}
                <thead>
                    <tr>
                    <th scope="col">Action</th>
                    <th scope="col">ID</th>
                    <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {statusData?.length > 0  ? (statusData.map((item, index) => (
                    <tr key = {index}>
                    <td><MdDelete className='delete-icon'data-bs-toggle="modal" data-bs-target="#exampleModal"/></td>
                    <td scope="row">{index + 1}</td>
                    <td>{item?.status_name}</td>
                    </tr>
                    ))) : (<tr><td colSpan={14} className='text-center'>No data found</td></tr>)}
                </tbody>
                </table>

                {/* Modal */}
                <div className="modal fade" id="status-modal" tabIndex="-1" aria-labelledby="ModalLabel-2" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="ModalLabel-2">Add Status</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div class="row g-3 align-items-center">
                                <div class="col-auto">
                                    <label for="addStatus" class="col-form-label">Add Status</label>
                                </div>
                                <div class="col-auto">
                                    <input onChange={(e) => setStatus(e.target.value)} type="text" id="addStatus" className="form-control" aria-describedby="addStatushelpline" />
                                </div>
                                <div class="col-auto">
                                    <span id="addStatushelpline" class="form-text">
                                    Must be 4-50 characters long.
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleAdd}>Add</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}