import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import './sidebar.css';
import { MdAddIcCall, MdOutlineUploadFile } from 'react-icons/md';
import { IoIosHome } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { IoDocument } from 'react-icons/io5';
import { FaDatabase } from "react-icons/fa6";
import { VscNewFile } from 'react-icons/vsc';
import { RxUpdate } from 'react-icons/rx';

export default function SidebarComponent({toggle}) {
    return (
        <Sidebar collapsed = {toggle} width = '270px' collapsedWidth = '80px' backgroundColor = '#d4d8ed' style={{zIndex:0}}>
            <div className = 'sidebar-container'>
            <Menu>
            <SubMenu label="Masters" icon = {<FaDatabase className='icon' />}>
            <MenuItem > Pie charts </MenuItem>
            <MenuItem> Line charts </MenuItem>
            </SubMenu>
                <Link to = "/complaint-portal">
                <MenuItem icon = {<IoIosHome className='icon' />}>
                    Home
                </MenuItem>
                </Link>
                <Link to = "/reports">
                    <MenuItem icon = {<IoDocument className='icon' />}>
                    Reports
                </MenuItem>
                </Link>
                <Link to = "/add">
                    <MenuItem icon = {<VscNewFile className='icon' />}>
                    Add Complaint
                </MenuItem>
                </Link>
                <Link to = "/update">
                    <MenuItem icon = {<RxUpdate className='icon' />}>
                    Update Status
                </MenuItem>
                </Link>
                <Link to = "/upload">
                    <MenuItem icon = {<MdOutlineUploadFile className='icon' />}>
                    Upload DC
                </MenuItem>
                </Link>
                <Link to = "/podUpload">
                <MenuItem icon = {<MdOutlineUploadFile className='icon' />}>
                    POD Upload
                </MenuItem>
                </Link>
            </Menu>
            </div>
        </Sidebar>
    )
}