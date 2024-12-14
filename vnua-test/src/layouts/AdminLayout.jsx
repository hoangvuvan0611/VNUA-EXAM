import { useEffect, useState } from 'react';
import Sidebar from '../components/admin/sidebar/Sidebar';
import '../assets/styles/admins/AdminLayout.css';
import { Box } from '@mui/material';
import MyAppBar from '../components/admin/appbar/MyAppBar';

function AdminLayout({ children }) {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [ user, setUser ] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        setUser(JSON.parse(storedUser));
    }, []);

    return (
        <div className="admin-layout">
            <div className="admin-container flex bg-grey-50 relative">
                <div className={`${!sidebarOpen ? 'lg:w-64' : ''}`}>
                    <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />  
                </div>
                <main className="admin-main">
                    <Box className="shadow-sm" style={{ position: 'sticky', top: 0, left: 0, right: 0, zIndex: 39 }}>
                        <MyAppBar label={user} user={user}/>
                    </Box>
                    {children}
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;