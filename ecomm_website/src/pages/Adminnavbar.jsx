import React, { useContext } from 'react'
import logo from "../assets/img/kaiadmin/logo_light.png"
import { Link, useLocation } from 'react-router-dom'
import profile from "../assets/img/profile.jpg"
import { Authcontext } from '../context/AuthContext'
const Adminnavbar = () => {
  const {user} = useContext(Authcontext)
  const location=useLocation()
  console.log("user",user);
  

  return (
   <>
  <div className="sidebar" data-background-color="dark">
  <div className="sidebar-logo">
    <div className="logo-header" data-background-color="dark">
      <a href="index.html" className="logo">
        <img src={logo} alt="navbar brand" className="navbar-brand" height={20} />
      </a>
      <div className="nav-toggle">
        <button className="btn btn-toggle toggle-sidebar">
          <i className="gg-menu-right" />
        </button>
        <button className="btn btn-toggle sidenav-toggler">
          <i className="gg-menu-left" />
        </button>
      </div>
      <button className="topbar-toggler more">
        <i className="gg-more-vertical-alt" />
      </button>
    </div>
  </div>
 <div className="sidebar-wrapper scrollbar scrollbar-inner" style={{marginTop:"100px",fontSize:"40px"}}>
  <div className="sidebar-content">
    <ul className="nav nav-secondary" style={{fontSize:"40px"}}>
    <li className={`nav-item  ${location.pathname==="/admin/dashboard" ? "active":" "}`} >

    <Link to={"/admin/dashboard"}>
          <i className="fas fa-home" />
          <p >Dashboard</p>
        </Link>
      </li>
      <li className={`nav-item  ${location.pathname==="/admin/product" ? "active":" "}`}>

        <Link to={"/admin/product"}>
          <i className="far fa-chart-bar" />
          <p >Product</p>
          </Link>
        
      </li>
      <li className={`nav-item  ${location.pathname==="/admin/category" ? "active":" "}`}>
        <Link to={"/admin/category"}>
         
          <i className="fas fa-desktop" />
          <p>category</p>
          </Link>
      </li>
      <li className={`nav-item  ${location.pathname==="/admin/brand" ? "active":" "}`}>
        <Link to={"/admin/brand"}>
         
          <i className="fas fa-desktop" />
          <p>brand</p>
          </Link>
      </li>
     </ul>
  </div>
</div>
</div>


<div className="main-header">
    <div className="main-header-logo">
    <div className="logo-header" data-background-color="dark">
      <a href="index.html" className="logo">
        <img src="assets/img/kaiadmin/logo_light.svg" alt="navbar brand" className="navbar-brand" height={20} />
      </a>
      <div className="nav-toggle">
        <button className="btn btn-toggle toggle-sidebar">
          <i className="gg-menu-right" />
        </button>
        <button className="btn btn-toggle sidenav-toggler">
          <i className="gg-menu-left" />
        </button>
      </div>
      <button className="topbar-toggler more">
        <i className="gg-more-vertical-alt" />
      </button>
    </div>
    {/* End Logo Header */}
  </div>  
  {/* Navbar Header */}
  <nav className="navbar navbar-header navbar-header-transparent navbar-expand-lg border-bottom">
    <div className="container-fluid">
      <nav className="navbar navbar-header-left navbar-expand-lg navbar-form nav-search p-0 d-none d-lg-flex">
        <div className="input-group">
          <div className="input-group-prepend">
            <button type="submit" className="btn btn-search pe-1">
              <i className="fa fa-search search-icon" />
            </button>
          </div>
          <input type="text" placeholder="Search ..." className="form-control" />
        </div>
      </nav>
      <ul className="navbar-nav topbar-nav ms-md-auto align-items-center">
      
      
        <li className="nav-item topbar-icon dropdown hidden-caret">
          <a className="nav-link" data-bs-toggle="dropdown" href="#" aria-expanded="false">
            <i className="fas fa-layer-group" />
          </a>
          <div className="dropdown-menu quick-actions animated fadeIn">
            <div className="quick-actions-header">
              <span className="title mb-1">Quick Actions</span>
              <span className="subtitle op-7">Shortcuts</span>
            </div>
            <div className="quick-actions-scroll scrollbar-outer">
              <div className="quick-actions-items">
                <div className="row m-0">
                  <a className="col-6 col-md-4 p-0" href="#">
                    <div className="quick-actions-item">
                      <div className="avatar-item bg-danger rounded-circle">
                        <i className="far fa-calendar-alt" />
                      </div>
                      <span className="text">Calendar</span>
                    </div>
                  </a>
                  <a className="col-6 col-md-4 p-0" href="#">
                    <div className="quick-actions-item">
                      <div className="avatar-item bg-warning rounded-circle">
                        <i className="fas fa-map" />
                      </div>
                      <span className="text">Maps</span>
                    </div>
                  </a>
                  <a className="col-6 col-md-4 p-0" href="#">
                    <div className="quick-actions-item">
                      <div className="avatar-item bg-info rounded-circle">
                        <i className="fas fa-file-excel" />
                      </div>
                      <span className="text">Reports</span>
                    </div>
                  </a>
                  <a className="col-6 col-md-4 p-0" href="#">
                    <div className="quick-actions-item">
                      <div className="avatar-item bg-success rounded-circle">
                        <i className="fas fa-envelope" />
                      </div>
                      <span className="text">Emails</span>
                    </div>
                  </a>
                  <a className="col-6 col-md-4 p-0" href="#">
                    <div className="quick-actions-item">
                      <div className="avatar-item bg-primary rounded-circle">
                        <i className="fas fa-file-invoice-dollar" />
                      </div>
                      <span className="text">Invoice</span>
                    </div>
                  </a>
                  <a className="col-6 col-md-4 p-0" href="#">
                    <div className="quick-actions-item">
                      <div className="avatar-item bg-secondary rounded-circle">
                        <i className="fas fa-credit-card" />
                      </div>
                      <span className="text">Payments</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li className="nav-item topbar-user dropdown hidden-caret">
          <a className="dropdown-toggle profile-pic" data-bs-toggle="dropdown" href="#" aria-expanded="false">
            <div className="avatar-sm">
              <img src={profile} alt="..." className="avatar-img rounded-circle" />
            </div>
            <span className="profile-username">
              <span className="op-7">Hi,</span>
              <span className="fw-bold">{user.name}</span>
            </span>
          </a>
          <ul className="dropdown-menu dropdown-user animated fadeIn">
            <div className="dropdown-user-scroll scrollbar-outer">
              <li>
                <div className="user-box">
                  <div className="avatar-lg">
                    <img src="assets/img/profile.jpg" alt="image profile" className="avatar-img rounded" />
                  </div>
                  <div className="u-text">
                    <h4>{user.name}</h4>
                    <p className="text-muted">{user.email}</p>
                    <a href="profile.html" className="btn btn-xs btn-secondary btn-sm">View Profile</a>
                  </div>
                </div>
              </li>
              <li>
                <div className="dropdown-divider" />
                <a className="dropdown-item" href="#">My Profile</a>
                <a className="dropdown-item" href="#">My Balance</a>
                <a className="dropdown-item" href="#">Inbox</a>
                <div className="dropdown-divider" />
                <a className="dropdown-item" href="#">Account Setting</a>
                <div className="dropdown-divider" />
                <a className="dropdown-item" href="#">Logout</a>
              </li>
            </div>
          </ul>
        </li>
      </ul>
    </div>
  </nav>

  {/* End Navbar */}
</div>


     

</>


   
  )
}

export default Adminnavbar
