import { MdDelete } from 'react-icons/md';
import { useData } from '../../components/fetchdata';
import './mfi.css';

export default function Mfi() {
    const { mfiData } = useData();
    console.log(mfiData)
    return(
        <div className="container-fluid" id = "mfi-page">
            <div className="container mfi">
                <h3 className='text-center'>MFI table</h3>
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
                    <td scope="row">{item?.id}</td>
                    <td>{item?.mfi_name}</td>
                    </tr>
                    ))) : (<tr><td colSpan={14} className='text-center'>No data found</td></tr>)}
                </tbody>
                </table>
            </div>
        </div>
    )
}