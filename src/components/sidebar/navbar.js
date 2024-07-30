import React, { useState } from 'react'
import { FaBars } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import './navbar.css';

function Navbar({showSidebar}) {
  return (
    <nav>
        <div className = "navbar bg-body-territory" id = "navbar">
            <div className='container-fluid' id = "nav-container">
                <div className='logo-content'>
                    <FaBars className = "icon" onClick={showSidebar}/>
                    <div className='navbar-brand'><h2>LOGO</h2></div>
                </div>
                <div id = "user-detail">
                <div className='nav-text'>Hi User</div>
                    <div className ="dropdown">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <CgProfile className='icon' />
                        </a>
                        <ul className="dropdown-menu dropdown-menu-lg-end">
                            <li><a className ="dropdown-item d-flex justify-content-around" href="#"><IoLogOutOutline className = "icon" />Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
