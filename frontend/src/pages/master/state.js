import { MdDelete } from "react-icons/md";
import { useData } from "../../components/fetchdata";
import './master.css';

export default function State() {
    const { stateData } = useData();
    console.log(stateData)
    return(
        <div className="container-fluid" id = "master-page">
            <div className="container master">
                <h3 className='text-center'>State table</h3>
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
                    <td scope="row">{item?.id}</td>
                    <td>{item?.state_name}</td>
                    </tr>
                    ))) : (<tr><td colSpan={14} className='text-center'>No data found</td></tr>)}
                </tbody>
                </table>
            </div>
        </div>
    )
}