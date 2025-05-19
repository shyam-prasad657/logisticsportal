import { MdDelete } from "react-icons/md";
import { useData } from "../../components/fetchdata";
import './master.css';
import axios from "axios";
import { useState } from "react";

export default function Branch() {
    const { branchData, stateData } = useData();
    const [branch, setBranch] = useState('');
    const [state, setState] = useState(0);

    const handleAdd = async () => {
        try {
            const response = await axios.post('http://localhost:8081/master/branch', {branch : branch, state : state});
            alert(response.data.message);
        } catch (err) {
            console.error(err);
            const x = err?.response?.data?.message || 'Network Error';
            alert(x);
        } finally {
            setBranch('');
            setState(0);
        }
    }
    console.log(branch,state)
    return(
        <div className="container-fluid" id = "master-page">
            <div className="container master">
                <h3 className='text-center'>Branch table</h3>
                <button className = 'btn btn-primary mb-3' data-bs-toggle="modal" data-bs-target="#branch-modal">Add</button>
                <table className="table table-hover table-bordered">
                    {/* <caption>Total 12 out of 12</caption> */}
                <thead>
                    <tr>
                    <th scope="col">Action</th>
                    <th scope="col">ID</th>
                    <th scope="col">Branch</th>
                    <th scope="col">State</th>
                    </tr>
                </thead>
                <tbody>
                    {branchData?.length > 0  ? (branchData.map((item, index) => (
                    <tr key = {index}>
                    <td><MdDelete className='delete-icon'data-bs-toggle="modal" data-bs-target="#exampleModal"/></td>
                    <td scope="row">{index + 1}</td>
                    <td>{item?.branch_name}</td>
                    <td>{item?.state}</td>
                    </tr>
                    ))) : (<tr><td colSpan={14} className='text-center'>No data found</td></tr>)}
                </tbody>
                </table>

                {/* Modal */}
                <div className="modal fade" id="branch-modal" tabIndex="-1" aria-labelledby="ModalLabel-2" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="ModalLabel-2">Add Branch</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div class="row g-3 align-items-center">
                            <div className="col-12">
                            <div class="col-auto">
                                <label for="addMFI" class="col-form-label">Add Branch</label>
                            </div>
                            <div class="col-auto">
                                <input onChange={(e) => setBranch(e.target.value)} value={branch} type="text" id="addMFI" className="form-control" />
                            </div>
                            </div>
                            <div class="col-12">
                                <div className="col-auto">
                                <label for="inputState" class="form-label">State</label>
                                </div>
                                <div className="col-auto">
                                <select id="inputState" class="form-select" value = {state} onChange={(e) => setState(e.target.value)}>
                                <option defaultValue value = {0}>Choose...</option>
                                {stateData?.map((item, index) => 
                                    <option key={index} value={item.id}>{item.state_name}</option>
                                )}
                                </select>
                                </div>
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