import { MdDelete } from "react-icons/md";
import { useData } from "../../components/fetchdata";
import './master.css';
import { useState } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";

export default function State() {
    const { stateData } = useData();
    const [state, setState] = useState('');
    const [edit, setEdit] = useState({
        id : '',
        name : '',
        index : ''
    })
    const handleAdd = async () => {
        try {
            const response = await axios.post(`http://localhost:8081/master/state/add?value=${state}`);
            alert(response.data.message);
        } catch (err) {
            console.error(err);
            const x = err?.response?.data?.message || 'Network Error';
            alert(x);
        } finally {
            setState('');
        }
    }
    //Edit
    const handleEdit = async (e) => {
        try {
            const response = await axios.put('http://localhost:8081/master/state/edit', {id : edit.id, name : edit.name});
            alert(response.data.message);
        } catch (err) {
            console.error(err);
            const x = err?.response?.data?.message || 'Network Error';
            alert(x);
        }
    }
    //Delete
    const handleDelete = async (e) => {
        try {
            const response = await axios.delete('http://localhost:8081/master/state/delete', {
                data : { state : e }
            });
            alert(response.data.message);
        } catch(err) {
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
                    <td id = 'icons-area'>
                        <MdDelete className='icon text-danger' onClick={() => handleDelete(item)}/>
                        <FaEdit className='icon text-primary ms-2' onClick={() => setEdit({id : item.id, name : item.state_name, index : index + 1})}
                        data-bs-toggle="modal" data-bs-target="#state-edit-modal"/>
                    </td>
                    <td>{index + 1}</td>
                    <td>{item?.state_name}</td>
                    </tr>
                    ))) : (<tr><td colSpan={14} className='text-center'>No data found</td></tr>)}
                </tbody>
                </table>

                {/* Add Modal */}
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
                                    <input onChange={(e) => setState(e.target.value)} value={state} type="text" id="addState" className="form-control" aria-describedby="addStatehelpline" />
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
                {/* Edit Modal */}
                <div className="modal fade" id="state-edit-modal" tabIndex="-1" aria-labelledby="ModalLabel-2" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="ModalLabel-2">Edit State</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row g-3 align-items-center">
                            <div className="col-2">
                                <label htmlFor="State-ID" className="col-form-label">ID</label>
                            </div>
                            <div className="col-10">
                                <input value = {edit.index} disabled type="text" id="State-ID" className="form-control"/>
                            </div>
                            <div className="col-2">
                                <label htmlFor="State-Name" className="col-form-label">Name</label>
                            </div>
                            <div className="col-10">
                                <input onChange={(e) => setEdit(prev => ({...prev, name : e.target.value}))} value = {edit.name} type="text" id="State-Name" className="form-control" aria-describedby="editStatehelpline" />
                            </div>
                            <div className="col-auto">
                                <span id="editStatehelpline" className="form-text">
                                Note : Changes made will affect the old cases also.
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleEdit}>Edit</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}