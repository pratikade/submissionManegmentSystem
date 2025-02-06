import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import "./studentList.css";
import "./Student.css";
import { Link } from "react-router-dom";
function StudentList() {
  const [student_list, setStudent] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/")
      .then((res) => setStudent(res.data))
      .catch((err) => console.log(err));
  }, []);

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
        <Link to={`/groups`}>
          <button className="btn">
            <strong className="margin"> Student groups </strong>
          </button>
        </Link>{" "}
        <br />
        <button className="btn">
          <strong> Student Batches </strong>
        </button>
        <Link to={`/create`}>
          <button className="btn_add"> Add Student</button>
        </Link>
        {/* <Link to="/create" className="btn btn-success">Add +</Link> */}
      </div>
      <div className="contener">
        <div className="conBox">
          <div className="conBox2">Student List</div>
          {/* <Link to="/create" className="btn btn-success">Add +</Link> */}
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Marks</th>
                <th>Status</th>
                <th>Remark</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {student_list.map((data, i) => {
                return (
                  <tr key={i}>
                    <td>{data.student_id}</td>
                    <td>{data.student_name}</td>
                    <td>{data.marks}</td>
                    <td>{data.status}</td>
                    <td>{data.remark}</td>
                    <td>
                      <Link
                        to={`/update/${data.student_id}`}
                        className="button"
                      >
                        Update
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StudentList;
