import React, { useState } from "react";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="d-flex">
      <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
      <div className="flex-grow-1">
        <nav className="navbar bg-light d-md-none shadow-sm">
          <button className="btn btn-primary ms-3" onClick={toggleSidebar}>
            ☰ Menu
          </button>
        </nav>

        <div className="p-3">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
