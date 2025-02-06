import { Link } from "react-router-dom";
import "../Student.css";
import "./groupList.css";
import "../studentList.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AddStudentToGroup from "./AddStudentToGroup"; // Assuming you have this file

//code for creating new groups

function GroupList() {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/groupss")
      .then((response) => setGroups(response.data))
      .catch((error) => console.error("Error fetching groups:", error));
  }, []);

  const handleGroupClick = (group_id) => {
    setSelectedGroup(group_id);
    axios
      .get(`http://localhost:3000/groups/${group_id}/students`)
      .then((response) => setStudents(response.data))
      .catch((error) => console.error("Error fetching students:", error));
  };

  return (
    <div>
      <div className="contenir">
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
          <Link to={`/students`}>
            <button className="btn_add">View All Members</button>
          </Link>
          <br></br>
          <Link to={`/AddGroups`}>
            <button className="btn_add-1"> Add Groups</button>
          </Link>
        </div>

        {/* <div className="groupContener"> */}
        <div className="group">
          <h1>Groups</h1>
          <table className="table">
            <thead>
              <tr>
                <td className="groups">
                  <h2>Groups</h2>
                </td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {groups.map((data, i) => {
                return (
                  <tr key={i}>
                    <td>{data.group_name}</td>
                    <td>
                      <Link
                        className="button"
                        onClick={() => handleGroupClick(data.group_id)}
                      >
                        View Member
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* </div> */}
          <div className="viewMember">
            {selectedGroup && (
              <div className="viewMember_min">
                <h2>Members in Group {selectedGroup}</h2>
                <table className="table">
                  <thead>
                    <tr>
                      <td>ID</td>
                      <td>Name</td>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((data, i) => (
                      <tr key={i}>
                        <td>{data.student_id}</td>
                        <td>{data.student_name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <AddStudentToGroup groupId={selectedGroup} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupList;
