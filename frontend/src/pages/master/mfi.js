import { MdDelete } from 'react-icons/md';
import { FaEdit } from "react-icons/fa";
import { useData } from '../../components/fetchdata';
import './master.css';
import { useState } from 'react';
import axios from 'axios';

export default function Mfi() {
    const { mfiData } = useData();
    const [mfi, setMfi] = useState('');
    const [edit, setEdit] = useState({
        id : '',
        name : '',
        index : ''
    })
    //Add
    const handleAdd = async () => {
        try {
            const response = await axios.post(`http://localhost:8081/master/mfi/add?value=${mfi}`);
            alert(response.data.message);
        } catch (err) {
            console.error(err);
            const x = err?.response?.data?.message || 'Network Error';
            alert(x);
        } finally {
            setMfi('');
        }
    }
    console.log(mfi);
    //Edit
    const handleEdit = async (e) => {
        try {
            const response = await axios.put('http://localhost:8081/master/mfi/edit', {id : edit.id, name : edit.name});
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
            const response = await axios.delete('http://localhost:8081/master/mfi/delete', {
                data : { mfi : e }
            });
            alert(response.data.message);
        } catch(err) {
            console.error(err);
            const x = err?.response?.data?.message || 'Network Error';
            alert(x);
        }
    }
    return(
        <div className="container-fluid" id = "master-page">
            <div className="container master">
                <h3 className='text-center'>MFI table</h3>
                <button className = 'btn btn-primary mb-3' data-bs-toggle="modal" data-bs-target="#mfi-modal">Add</button>
                <table className="table table-hover table-bordered">
                    {/* <caption>Total 12 out of 12</caption> */}
                <thead>
                    <tr>
                    <th scope="col">Action</th>
                    <th scope="col">ID</th>
                    <th scope="col">MFI</th>
                    </tr>
                </thead>
                <tbody>
                    {mfiData?.length > 0  ? (mfiData.map((item, index) => (
                    <tr key = {index}>
                    <td id = 'icons-area'>
                        <MdDelete className='icon text-danger' onClick={() => handleDelete(item)}/>
                        <FaEdit className='icon text-primary ms-2' onClick={() => setEdit({id : item.id, name : item.mfi_name, index : index + 1})}
                        data-bs-toggle="modal" data-bs-target="#mfi-edit-modal"/>
                    </td>
                    <td>{index + 1}</td>
                    <td>{item?.mfi_name}</td>
                    </tr>
                    ))) : (<tr><td colSpan={14} className='text-center'>No data found</td></tr>)}
                </tbody>
                </table>
                {/* Add Modal */}
                <div className="modal fade" id="mfi-modal" tabIndex="-1" aria-labelledby="ModalLabel-2" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="ModalLabel-2">Add MFI</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row g-3 align-items-center">
                            <div className="col-auto">
                                <label htmlFor="addMFI" className="col-form-label">Add MFI</label>
                            </div>
                            <div className="col-auto">
                                <input onChange={(e) => setMfi(e.target.value)} value = {mfi} type="text" id="addMFI" className="form-control" aria-describedby="addMfihelpline" />
                            </div>
                            <div className="col-auto">
                                <span id="addMfihelpline" className="form-text">
                                Must be 4-20 characters long.
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
                <div className="modal fade" id="mfi-edit-modal" tabIndex="-1" aria-labelledby="ModalLabel-2" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="ModalLabel-2">Edit MFI</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row g-3 align-items-center">
                            <div className="col-2">
                                <label htmlFor="MFI-ID" className="col-form-label">ID</label>
                            </div>
                            <div className="col-10">
                                <input value = {edit.index} disabled type="text" id="MFI-ID" className="form-control"/>
                            </div>
                            <div className="col-2">
                                <label htmlFor="MFI-Name" className="col-form-label">Name</label>
                            </div>
                            <div className="col-10">
                                <input onChange={(e) => setEdit(prev => ({...prev, name : e.target.value}))} value = {edit.name} type="text" id="MFI-Name" className="form-control" aria-describedby="editMfihelpline" />
                            </div>
                            <div className="col-auto">
                                <span id="editMfihelpline" className="form-text">
                                Note : changes made will affect the old cases also.
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