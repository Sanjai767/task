// src/components/leftSidebar/LeftSidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing

function LeftSidebar() {
    const [activeItem, setActiveItem] = useState('');

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: 'bi-house-door' },
        { id: 'members', label: 'Members', icon: 'bi-person' },
        { id: 'misc', label: 'MISC', icon: 'bi-app' },
        { id: 'mer', label: 'MER', icon: 'bi-bar-chart' },
        { id: 'audit', label: '120 Days Audit', icon: 'bi-clipboard-check' },
        { id: 'lt', label: 'LT', icon: 'bi-layers' },
        { id: 'mc', label: 'MC', icon: 'bi-cogs' },
        { id: 'goals', label: 'Goals', icon: 'bi-bullseye' }
    ];

    const handleItemClick = (id) => {
        setActiveItem(id);
    };

    return (
        <div className="col-md-2 bg-danger text-white p-4">
            <ul className="list-unstyled m-0">
                {menuItems.map((item) => (
                    <li
                        key={item.id}
                        className={`mb-2 ${activeItem === item.id ? 'bg-success text-dark' : ''}`}
                    >
                        <Link
                            to={`/${item.id}`} // Use Link component for navigation
                            className="text-white d-flex align-items-center p-2 text-decoration-none"
                            onClick={() => handleItemClick(item.id)}
                        >
                            <i className={`bi ${item.icon} fs-4 me-2`}></i>
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default LeftSidebar;
