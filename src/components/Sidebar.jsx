import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css"; // custom styles

function Sidebar({ isOpen, toggle }) {
  const reduxUser = useSelector((state) => state.auth.user);
  const storedUser = localStorage.getItem("user");
  const user = reduxUser || (storedUser && JSON.parse(storedUser));

  console.log(user);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className={`sidebar shadow-sm bg-light ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header d-flex justify-content-between align-items-center px-3 py-3 border-bottom">
        <h5 className="mb-0 text-primary">
          <img
            src="/logo.png"
            alt="Logo"
            style={{ height: 32, marginRight: 8, verticalAlign: "middle" }}
          />
          Insurance portal
        </h5>
        <button className="btn btn-sm d-md-none" onClick={toggle}>
          ✕
        </button>
      </div>
      <ul className="nav flex-column px-2 pt-3">
        <li className="nav-item mb-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `nav-link px-3 py-2 rounded ${
                isActive ? "active bg-primary text-white" : "text-dark"
              }`
            }
            onClick={toggle}
          >
            Home
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink
            to="/mypolicy"
            className={({ isActive }) =>
              `nav-link px-3 py-2 rounded ${
                isActive ? "active bg-primary text-white" : "text-dark"
              }`
            }
            onClick={toggle}
          >
            My Plolicies
          </NavLink>
        </li>

        <li className="nav-item mt-4 px-3">
          <button
            className="btn btn-outline-danger w-100"
            onClick={handleLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
