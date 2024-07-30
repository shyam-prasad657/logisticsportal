import React from 'react';
import { IoIosHome } from "react-icons/io";
import { IoDocument } from "react-icons/io5";
import { VscNewFile } from "react-icons/vsc";
import './sidebar.css';
import { Link } from 'react-router-dom';
import { RxUpdate } from "react-icons/rx";
import { MdOutlineUploadFile } from "react-icons/md";

function Sidebar({sidepanel}) {

  return (
    <div className = {sidepanel ? 'side-menu active' : 'side-menu close'} id = "sidebar">
      <div className='sidebar-container'>
      <Link to = "/complaint-portal">
        <div className='sidebar-item'>
          <IoIosHome className='icon' /><h5 className='option-name'>Home</h5>
        </div>
        </Link>
      <Link to = "/reports">
        <div className='sidebar-item'>
          <IoDocument className='icon' /><h5 className='option-name'>Reports</h5>
        </div>
        </Link>
      <Link to = "/add">
        <div className='sidebar-item'>
          <VscNewFile className='icon' /><h5 className='option-name'>Add Complaint</h5>
        </div>
      </Link>
      <Link to = "/update">
        <div className='sidebar-item'>
          <RxUpdate className='icon' /><h5 className='option-name'>Update Status</h5>
        </div>
      </Link>
      <Link to = "/upload">
        <div className='sidebar-item'>
          <MdOutlineUploadFile className='icon' /><h5 className='option-name'>Upload DC</h5>
        </div>
      </Link>
      <Link to = "/podUpload">
        <div className='sidebar-item'>
          <MdOutlineUploadFile className='icon' /><h5 className='option-name'>POD Upload</h5>
        </div>
      </Link>
      </div>
    </div>
  )
}

export default Sidebar;
