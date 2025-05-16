import { MdDelete } from "react-icons/md";
import { useData } from "../../components/fetchdata";
import './master.css';

export default function Branch() {
    const { branchData } = useData();
    console.log(branchData)
    return(
        <div className="container-fluid" id = "master-page">
            <div className="container master">
                <h3 className='text-center'>Branch table</h3>
                <table className="table table-hover table-bordered">
                    {/* <caption>Total 12 out of 12</caption> */}
                <thead>
                    <tr>
                    <th scope="col">Action</th>
                    <th scope="col">ID</th>
                    <th scope="col">Branch</th>
                    </tr>
                </thead>
                <tbody>
                    {branchData?.length > 0  ? (branchData.map((item, index) => (
                    <tr key = {index}>
                    <td><MdDelete className='delete-icon'data-bs-toggle="modal" data-bs-target="#exampleModal"/></td>
                    <td scope="row">{item?.id}</td>
                    <td>{item?.branch_name}</td>
                    </tr>
                    ))) : (<tr><td colSpan={14} className='text-center'>No data found</td></tr>)}
                </tbody>
                </table>
            </div>
        </div>
    )
}