import { useState } from 'react';
import Sidebar from '../components/admin/sidebar/Sidebar';
import '../assets/styles/admins/AdminLayout.css';

function AdminLayout({ children }) {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="admin-layout">
            <div className="admin-container flex bg-grey-50 relative">
                <div className={`${!sidebarOpen ? 'lg:w-64' : ''}`}>
                    <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />  
                </div>
                <main className="admin-main">{children}</main>
            </div>
        </div>
    );
}

export default AdminLayout;