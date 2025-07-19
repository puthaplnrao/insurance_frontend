import React, { useState } from "react";
import { useSelector } from "react-redux";

function PartnerDashboard() {
  const reduxUser = useSelector((state) => state.auth.user);
  const storedUser = localStorage.getItem("user");
  const user = reduxUser || (storedUser && JSON.parse(storedUser));
  const API_URL = process.env.REACT_APP_API_BASE_URL;

  const [formData, setFormData] = useState({
    InsureAmount: 0,
    Name: "",
    dob: "",
    isSmoking: 0,
    isDrinking: 0,
    ped: "",
    Addon: "",
  });

  const [response, setResponse] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Form Data", formData);
      const res = await fetch(`${API_URL}/lead`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setResponse(data);
        setMessage("Lead submitted successfully.");
      } else {
        setMessage("Failed to submit lead");
      }
    } catch (error) {
      console.error("Error submitting lead:", error);
      setMessage("Error submitting lead.");
    }
  };

  const handleConvert = async () => {
    if (!response?.insertId) return;
    try {
      const res = await fetch(`${API_URL}/convert/${response.insertId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Lead converted to customer successfully.");
      } else {
        setMessage(data.message || "Conversion failed.");
      }
    } catch (error) {
      console.error("Convert Error:", error);
      setMessage("Error converting lead.");
    }
  };

  return (
    <>
      <h2 className="mb-4">Welcome {user.email}</h2>
      <div className="container mt-4">
        {message && <div className="alert alert-info">{message}</div>}

        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label">InsureAmount</label>
            <input
              name="InsureAmount"
              value={formData.InsureAmount}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Name:</label>
            <input
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Smoking:</label>
            <select
              name="isSmoking"
              value={formData.isSmoking}
              className="form-control"
              onChange={handleChange}
            >
              <option value={0}>No</option>
              <option value={1}>Yes</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Drinking:</label>
            <select
              name="isDrinking"
              value={formData.isDrinking}
              className="form-control"
              onChange={handleChange}
            >
              <option value={0}>No</option>
              <option value={1}>Yes</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Pre-Existing Disease (PED):</label>
            <input
              name="ped"
              value={formData.ped}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Addon:</label>
            <input
              name="Addon"
              value={formData.Addon}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>

        {response && (
          <div className="mt-5">
            <h4>Submitted Lead Details</h4>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th>Insert ID</th>
                  <td>{response.insertId}</td>
                </tr>
                <tr>
                  <th>Premium</th>
                  <td>{response.premium}</td>
                </tr>
              </tbody>
            </table>
            <button className="btn btn-success" onClick={handleConvert}>
              Convert to Customer
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default PartnerDashboard;
