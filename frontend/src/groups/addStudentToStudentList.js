
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import '../Student.css';
import '../AlertCreate.css'
function AddStudentToStudentList() {
    const [student_id, setStudentId] = useState([]);
    const [student_name, setStudentName] = useState('');
    // const [subject, setSubject] = useState('')
    const navigate = useNavigate();

    function handleSubmitGroups(event) {
        event.preventDefault();
        axios.post("http://localhost:3000/students", { student_id, student_name })
            .then(res => {
                console.log(res);
                navigate('/students');

            }).catch(err => console.log(err));

    }
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
                    <Link to={`/groups`}>
                        <button className="btn">
                            <strong className="margin"> Student groups </strong>
                        </button>
                    </Link>{" "}
                    <br />
                    <button className="btn">
                        <strong> Student Batches </strong>
                    </button>
                    <Link to={`/students`}><button className='btn_add'>View All Members</button></Link>

                </div>

            </div>
            <div className="custom-flex-container">
                <form onSubmit={handleSubmitGroups}>
                    <h2> Add members</h2>
                    <div className="custom-margin-bottom">
                        <label htmlFor="">ID</label>
                        <input
                            type="number"
                            placeholder="Enter ID"
                            className="custom-form-control" onChange={e => setStudentId(e.target.value)}
                        />
                    </div>
                    <div className="custom-margin-bottom">
                        <label htmlFor="">Name</label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            className="custom-form-control" onChange={e => setStudentName(e.target.value)}
                        />
                    </div>

                    <button className="custom-btn custom-btn-success">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AddStudentToStudentList;
