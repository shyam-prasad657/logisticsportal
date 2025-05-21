import { MdDelete } from "react-icons/md";
import { useData } from "../../components/fetchdata";
import './master.css';
import axios from "axios";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";

export default function Branch() {
    const { branchData, stateData } = useData();
    const [branch, setBranch] = useState('');
    const [state, setState] = useState(0);
    const [edit, setEdit] = useState({
        branchID : '',
        name : '',
        index : '',
        state : ''
    })
    //Add
    const handleAdd = async () => {
        try {
            const response = await axios.post('http://localhost:8081/master/branch/add', {branch : branch, state : state});
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
    //Edit
    const handleEdit = async (e) => {
        console.log(edit);
        try {
            const response = await axios.put('http://localhost:8081/master/branch/edit', {id : edit.branchID, name : edit.name, state : edit.state});
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
            const response = await axios.delete('http://localhost:8081/master/branch/delete', {
                data : { branch : e }
            });
            alert(response.data.message);
        } catch(err) {
            console.error(err);
            const x = err?.response?.data?.message || 'Network Error';
            alert(x);
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
                    <td id="icons-area">
                        <MdDelete className='icon text-danger' onClick={() => handleDelete(item)}/>
                        <FaEdit className='icon text-primary ms-2'
                        onClick={() => setEdit({branchID : item.id, name : item.branch_name, index : index + 1, state : item.state_id})}
                        data-bs-toggle="modal" data-bs-target="#branch-edit-modal"/>
                    </td>
                    <td>{index + 1}</td>
                    <td>{item?.branch_name}</td>
                    <td>{item?.state}</td>
                    </tr>
                    ))) : (<tr><td colSpan={14} className='text-center'>No data found</td></tr>)}
                </tbody>
                </table>

                {/* Add Modal */}
                <div className="modal fade" id="branch-modal" tabIndex="-1" aria-labelledby="ModalLabel-2" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="ModalLabel-2">Add Branch</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row g-3 align-items-center">
                            <div className="col-12">
                            <div className="col-auto">
                                <label htmlFor="addMFI" className="col-form-label">Add Branch</label>
                            </div>
                            <div className="col-auto">
                                <input onChange={(e) => setBranch(e.target.value)} value={branch} type="text" id="addMFI" className="form-control" />
                            </div>
                            </div>
                            <div className="col-12">
                                <div className="col-auto">
                                <label htmlFor="inputState" className="form-label">State</label>
                                </div>
                                <div className="col-auto">
                                <select id="inputState" className="form-select" value = {state} onChange={(e) => setState(e.target.value)}>
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

                {/* Edit Modal */}
                <div className="modal fade" id="branch-edit-modal" tabIndex="-1" aria-labelledby="ModalLabel-2" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="ModalLabel-2">Edit Branch</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row g-3 align-items-center">
                            <div className="col-2">
                                <label htmlFor="Branch-ID" className="col-form-label">ID</label>
                            </div>
                            <div className="col-10">
                                <input value = {edit.index} disabled type="text" id="Branch-ID" className="form-control"/>
                            </div>
                            <div className="col-2">
                                <label htmlFor="Branch-Name" className="col-form-label">Name</label>
                            </div>
                            <div className="col-10">
                                <input onChange={(e) => setEdit(prev => ({...prev, name : e.target.value}))} value = {edit.name} type="text" id="Branch-Name" className="form-control" aria-describedby="editBranchhelpline" />
                            </div>
                            <div className="col-2">
                                <label htmlFor="State-Name" className="col-form-label">State</label>
                            </div>
                            <div className="col-10">
                                <select id="State-Name" className="form-select" value = {edit.state} onChange={(e) => setEdit(prev => ({...prev, state : e.target.value}))}>
                                {stateData?.map((item, index) => 
                                    <option key={index} value={item.id}>{item.state_name}</option>
                                )}
                                </select>
                            </div>
                            <div className="col-auto">
                                <span id="editBranchhelpline" className="form-text">
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