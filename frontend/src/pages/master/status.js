import { MdDelete } from "react-icons/md";
import { useData } from "../../components/fetchdata";
import './master.css';
import axios from "axios";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";

export default function Status() {
    const { statusData } = useData();
    const [status, setStatus] = useState('');
    const [edit, setEdit] = useState({
        id : '',
        name : '',
        index : ''
    })
    const handleAdd = async () => {
        try {
            const response = await axios.post(`http://localhost:8081/master/status/add?value=${status}`);
            alert(response.data.message);
        } catch (err) {
            console.error(err);
            const x = err?.response?.data?.message || 'Network Error';
            alert(x);
        } finally {
            setStatus('');
        }
    }
    //Edit
    const handleEdit = async (e) => {
        try {
            const response = await axios.put('http://localhost:8081/master/status/edit', {id : edit.id, name : edit.name});
            alert(response.data.message);
        } catch (err) {
            console.error(err);
            const x = err?.response?.data?.message || 'Network Error';
            alert(x);
        }
    }
    console.log('edit',edit)

    //Delete
    const handleDelete = async (e) => {
        try {
            const response = await axios.delete('http://localhost:8081/master/status/delete', {
                data : { status : e }
            });
            alert(response.data.message);
        } catch(err) {
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
                    <td id = 'icons-area'>
                        <MdDelete className='icon text-danger' onClick={() => handleDelete(item)}/>
                        <FaEdit className='icon text-primary ms-2' onClick={() => setEdit({id : item.id, name : item.status_name, index : index + 1})}
                        data-bs-toggle="modal" data-bs-target="#status-edit-modal"/>
                    </td>
                    <td>{index + 1}</td>
                    <td>{item?.status_name}</td>
                    </tr>
                    ))) : (<tr><td colSpan={14} className='text-center'>No data found</td></tr>)}
                </tbody>
                </table>

                {/* Add Modal */}
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
                                    <input onChange={(e) => setStatus(e.target.value)} value = {status} type="text" id="addStatus" className="form-control" aria-describedby="addStatushelpline" />
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

                {/* Edit Modal */}
                <div className="modal fade" id="status-edit-modal" tabIndex="-1" aria-labelledby="ModalLabel-2" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="ModalLabel-2">Edit Status</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row g-3 align-items-center">
                            <div className="col-2">
                                <label htmlFor="Status-ID" className="col-form-label">ID</label>
                            </div>
                            <div className="col-10">
                                <input value = {edit.index} disabled type="text" id="Status-ID" className="form-control"/>
                            </div>
                            <div className="col-2">
                                <label htmlFor="Status-Name" className="col-form-label">Name</label>
                            </div>
                            <div className="col-10">
                                <input onChange={(e) => setEdit(prev => ({...prev, name : e.target.value}))} value = {edit.name} type="text" id="Status-Name" className="form-control" aria-describedby="editStatushelpline" />
                            </div>
                            <div className="col-auto">
                                <span id="editStatushelpline" className="form-text">
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