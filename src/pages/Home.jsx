import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="bg-white border-bottom py-3 shadow-sm">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <img
              src="/logo.png"
              alt="Hospital Logo"
              style={{ width: "40px", height: "40px", objectFit: "contain" }}
            />
            <h5 className="mb-0 text-primary">Insurance portal</h5>
          </div>

          <div>
            <button
              className="btn btn-outline-primary me-2"
              onClick={() => navigate("/login?role=individual")}
            >
              Individual Login
            </button>
            <button
              className="btn btn-outline-success"
              onClick={() => navigate("/login?role=partner")}
            >
              Partner Login
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow-1 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center px-3">
          <h2 className="mb-3 text-primary">Welcome to Insurance portal</h2>
        </div>
      </main>
    </div>
  );
}

export default Home;
