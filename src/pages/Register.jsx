import React, { useState, useEffect } from "react";
import { register } from "../services/authService";
import { useNavigate, useLocation } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [responseType, setResponseType] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const role = searchParams.get("role");
  console.log(role);
  useEffect(() => {
    if (!["partner", "individual"].includes(role)) {
      navigate("/");
    }
  }, [role, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setResponseMsg("");
    setResponseType("");

    try {
      const res = await register({ email, password, role });

      setResponseType("success");
      setResponseMsg(res?.data?.message || "Registration successful!");

      setTimeout(() => navigate(`/login?role=${role}`), 1500);
    } catch (err) {
      const error =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Registration failed. Please try again.";
      setResponseType("error");
      setResponseMsg(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "400px" }}>
        <div className="text-center mb-3">
          <img
            src="/logo.png"
            alt="Logo"
            style={{ width: "80px", height: "80px", objectFit: "contain" }}
          />
        </div>
        <h4 className="text-center mb-3">
          {role === "partner"
            ? "Partner Registration"
            : "Individual Registration"}
        </h4>
        {responseMsg && (
          <div
            className={`alert alert-${
              responseType === "success" ? "success" : "danger"
            } py-2 text-center`}
          >
            {responseMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              required
              disabled={loading}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={loading}
          >
            {loading ? (
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
              ></span>
            ) : null}
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="text-center mt-3">
          <small className="text-muted">
            Already have an account? <a href={`/login?role=${role}`}>Login</a>
          </small>
        </div>

        <div className="text-center mt-2">
          <button
            onClick={() => navigate("/")}
            className="btn btn-link text-decoration-none"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
