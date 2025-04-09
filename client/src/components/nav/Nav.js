import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
      <div className="container-fluid">
        {/* Left side with the name */}
        <h3 className="navbar-brand">Hi, <span style={{ color: 'red' }}>Santhosh</span></h3>

        {/* Right side with search, profile, and bell icon */}
        <div className="d-flex gap-3" >
          <input type="search" className="form-control me-2" placeholder="Search..." aria-label="Search" />

          {/* Profile Icon */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '60px',
              height: '40px',
              borderRadius: '10%',
              backgroundColor: '#f8f9fa', // light gray
              border: '1px solid #ccc',
            }}
          >
            <i className="bi bi-person-circle" style={{ fontSize: '1.5rem' }}></i>
          </div>

          {/* Bell Icon with Red Dot */}
          <div className="position-relative me-3"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '60px',
            height: '40px',
            borderRadius: '10%',
            backgroundColor: '#f8f9fa', // light gray
            border: '1px solid #ccc',
          }}>
            <i className="bi bi-bell" style={{ fontSize: '1.5rem' }}></i>
            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle" style={{ width: '10px', height: '10px' }}></span>
          </div>


        </div>
      </div>
    </nav>
  );
}

export default Nav;
