import { MdDelete } from 'react-icons/md';
import { useData } from '../../components/fetchdata';
import './master.css';
import { useState } from 'react';
import axios from 'axios';

export default function Mfi() {
    const { mfiData } = useData();
    const [mfi, setMfi] = useState('');
    const handleAdd = async () => {
        try {
            const response = await axios.post(`http://localhost:8081/master/mfi?value=${mfi}`);
            alert(response.data.message);
        } catch (err) {
            console.error(err);
            const x = err?.response?.data?.message || 'Network Error';
            alert(x);
        }
    }
    console.log(mfi)
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
                    <td><MdDelete className='delete-icon'data-bs-toggle="modal" data-bs-target="#exampleModal"/></td>
                    <td scope="row">{index + 1}</td>
                    <td>{item?.mfi_name}</td>
                    </tr>
                    ))) : (<tr><td colSpan={14} className='text-center'>No data found</td></tr>)}
                </tbody>
                </table>
                {/* Modal */}
                <div className="modal fade" id="mfi-modal" tabIndex="-1" aria-labelledby="ModalLabel-2" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="ModalLabel-2">Add MFI</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div class="row g-3 align-items-center">
                            <div class="col-auto">
                                <label for="addMFI" class="col-form-label">Add MFI</label>
                            </div>
                            <div class="col-auto">
                                <input onChange={(e) => setMfi(e.target.value)} type="text" id="addMFI" className="form-control" aria-describedby="addMfihelpline" />
                            </div>
                            <div class="col-auto">
                                <span id="addMfihelpline" class="form-text">
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
            </div>
        </div>
    )
}