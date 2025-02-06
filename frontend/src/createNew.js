import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AlertCreate.css";
import './Student.css';


function CreateStudent() {
  const [student_id, setStudentId] = useState("");
  const [student_name, setName] = useState("");

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:3000/create", { student_id, student_name })
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
            <h2> Add student</h2>
            <div className="custom-margin-bottom">
              <label htmlFor="">Student ID</label>
              <input
                type="text"
                placeholder="Enter StudentID"
                className="custom-form-control"
                onChange={(e) => setStudentId(e.target.value)}
              />
            </div>
            <div className="custom-margin-bottom">
              <label htmlFor="">Student Name</label>
              <input
                type="text"
                placeholder="Enter Student Name"
                className="custom-form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <button className="custom-btn custom-btn-success">ADD</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateStudent;
