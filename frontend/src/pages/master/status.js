import { MdDelete } from "react-icons/md";
import { useData } from "../../components/fetchdata";
import './master.css';

export default function Status() {
    const { statusData } = useData();
    console.log(statusData)
    return(
        <div className="container-fluid" id = "master-page">
            <div className="container master">
                <h3 className='text-center'>Status table</h3>
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
                    <td scope="row">{item?.id}</td>
                    <td>{item?.status_name}</td>
                    </tr>
                    ))) : (<tr><td colSpan={14} className='text-center'>No data found</td></tr>)}
                </tbody>
                </table>
            </div>
        </div>
    )
}