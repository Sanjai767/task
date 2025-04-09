// src/components/profile/Profile.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import LeftSidebar from '../leftSidebar/LeftSidebar'; // Import the LeftSidebar component
import Nav from '../nav/Nav'; // Import the Nav component
import { Route, Routes } from 'react-router-dom'; // Import React Router's routing system
import MISC from '../leftSidebar/misc/MISC'; // Import MISC component (you can add more components here)

function Profile() {
    return (
        <div className="container-fluid">
            <div className="row vh-100">
                {/* Left Sidebar */}
                <LeftSidebar />

                {/* Right Sidebar */}
                <div className="col-md-10">
                    {/* Nav Component */}
                    <Nav />

                    {/* Main Content Area */}
                    <div className="p-4">
                        <Routes>
                            {/* Add routes corresponding to sidebar items */}
                            <Route path="/misc" element={<MISC />} />
                            {/* Add other routes here as needed */}
                            {/* Default route */}
                            
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
