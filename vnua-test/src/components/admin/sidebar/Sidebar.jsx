import React, { } from "react";
import Close from "@mui/icons-material/Close";
import Menu from "@mui/icons-material/Menu";
import '../../../assets/styles/admins/Sidebar.css';
import logoSideBar from '../../../assets/images/logos/logo.png';
import { SidebarData } from "./SidebarData";
import {Link, useNavigate} from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

function Sidebar({isOpen, onToggle}) {
    const theme = useTheme();
    const navigate = useNavigate();
    const mode = theme.palette.mode;
    
    return (
        <div style={{backgroundColor: theme.palette.background.default}}>
            {/* Menu button: Show when used in mobile device */}
            <button 
                onClick={onToggle}
                style={{backgroundColor: theme.palette.background.default}}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
            >
                {isOpen ? <Close className="h-6 w-6" /> : <Menu className="h-6 w-6"/>}
            </button>

            {/* Side bar: Responsive */}
            <div style={{backgroundColor: theme.palette.background.default}}
                className={`
                fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-sm transform
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0 transition-transform duration-300 ease-in-out overflow-y-auto`}
            >
                <div className="p-4">
                    <div className="mb-8 pt-14 lg:pt-0">
                        <Link style={{textDecoration: 'none'}} to={'/admin/'} onClick={() => {navigate.pathname = /admin/}}>
                            <div className="flex items-center mb-7 mt-3">
                                <img alt="VNUA" src={logoSideBar} sx={{width: '50px', height: '50px'}} style={{width: '50px'}}/>
                                <h2 className="text-2xl font-bold ml-4 sidebar-title">VNUA TEST</h2>
                            </div>
                        </Link>
                        <nav>
                            <ul className="space-y-4">
                                {SidebarData.map((val, index) => {
                                    return <Link key={index} style={{textDecoration: 'none'}} to={val.link} onClick={() => {navigate.pathname = val.link}}>
                                        <li id={window.location.pathname === val.link ? "active" : ""} 
                                        className={`flex items-center ${mode === 'dark' ? ' hover:bg-gray-500' : ' hover:bg-gray-100'} p-2 rounded sidebar-item`}>
                                            <div className="mr-4">
                                                {val.icon}
                                            </div>
                                            {val.label}
                                        </li>
                                    </Link>
                                })}
                            </ul>

                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;