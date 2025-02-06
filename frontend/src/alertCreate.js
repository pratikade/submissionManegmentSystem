import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./AlertCreate.css";
import './Student.css'
function AlertCreate() {
  const [marks, setMarks] = useState("");
  const [remark, setRemark] = useState("");
  const [status, setStatus] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .put("http://localhost:3000/update/"+id, { id, marks, remark, status })
      .then((res) => {
        console.log(res);
        navigate("/StudentList");
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      {/* creating the dashboard */}
      <div className="dashboard">
        <h1>Dashboard</h1>
        <Link to={"/StudentList"}>
        <button className="btn">
          <strong>Student List </strong>
        </button>{" "}
        </Link>
        
        <br />
        <button className="btn">
          <strong className="margin"> Student groups </strong>
        </button>{" "}
        <br />
        <button className="btn">
          <strong> Student Batches </strong>
        </button>
        {/* <Link to="/create" className="btn btn-success">Add +</Link> */}
      </div>

      <div className="custom-flex-container">
        <div className="custom-box">
          <form onSubmit={handleSubmit}>
            <h2> Update student</h2>
            <div className="custom-margin-bottom">
              <label htmlFor="">Marks</label>
              <input
                type="number"
                placeholder="Enter Marks"
                className="custom-form-control"
                onChange={(e) => setMarks(e.target.value)}
              />
            </div>

            <div className="custom-margin-bottom">
              <label htmlFor="">Status</label>
              <input
                type="text"
                placeholder="Enter Status"
                className="custom-form-control"
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>

            <div className="custom-margin-bottom">
              <label htmlFor="">remark</label>
              <input
                type="text"
                placeholder="Enter Remark"
                className="custom-form-control"
                onChange={(e) => setRemark(e.target.value)}
              />
            </div>
            <button className="custom-btn custom-btn-success">update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AlertCreate;
