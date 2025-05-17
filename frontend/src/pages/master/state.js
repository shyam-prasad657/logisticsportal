import { MdDelete } from "react-icons/md";
import { useData } from "../../components/fetchdata";
import './master.css';
import { useState } from "react";
import axios from "axios";

export default function State() {
    const { stateData } = useData();
    const [state, setState] = useState('');
    const handleAdd = async () => {
        try {
            const response = await axios.post(`http://localhost:8081/master/state?value=${state}`);
            alert(response.data.message);
        } catch (err) {
            console.error(err);
            const x = err?.response?.data?.message || 'Network Error';
            alert(x);
        }
    }
    console.log(stateData)
    return(
        <div className="container-fluid" id = "master-page">
            <div className="container master">
                <h3 className='text-center'>State table</h3>
                <button className = 'btn btn-primary mb-3' data-bs-toggle="modal" data-bs-target="#state-modal">Add</button>
                <table className="table table-hover table-bordered">
                    {/* <caption>Total 12 out of 12</caption> */}
                <thead>
                    <tr>
                    <th scope="col">Action</th>
                    <th scope="col">ID</th>
                    <th scope="col">State</th>
                    </tr>
                </thead>
                <tbody>
                    {stateData?.length > 0  ? (stateData.map((item, index) => (
                    <tr key = {index}>
                    <td><MdDelete className='delete-icon'data-bs-toggle="modal" data-bs-target="#exampleModal"/></td>
                    <td scope="row">{index + 1}</td>
                    <td>{item?.state_name}</td>
                    </tr>
                    ))) : (<tr><td colSpan={14} className='text-center'>No data found</td></tr>)}
                </tbody>
                </table>

                {/* Modal */}
                <div className="modal fade" id="state-modal" tabIndex="-1" aria-labelledby="ModalLabel-2" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="ModalLabel-2">Add State</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div class="row g-3 align-items-center">
                                <div class="col-auto">
                                    <label for="addState" class="col-form-label">Add State</label>
                                </div>
                                <div class="col-auto">
                                    <input onChange={(e) => setState(e.target.value)} type="text" id="addState" className="form-control" aria-describedby="addStatehelpline" />
                                </div>
                                <div class="col-auto">
                                    <span id="addStatehelpline" class="form-text">
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