import { Link } from "react-router-dom";
import "../Student.css";
import "./groupList.css";

import React, { useState, useEffect } from "react";
import axios from "axios";



const ViewAllStudents = ({ groupId }) => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
            axios.get(`http://localhost:3000/students`)
                .then(response => setStudents(response.data))
                .catch(error => console.error("Error fetching students:", error));
    }, [groupId]);

// connecting backend to add the delete button to delete the perticuler member from group
    const handelDelete = async (id) => {
        try {
          await axios.delete('http://localhost:3000/students/'+id)
          window.location.reload()
        }catch(err){
          console.log(err);
        }
      
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
                    <Link to={`/student`}><button className='btn_add'>Add More Members</button></Link><br></br>
                    <Link to={`/students`}><button className='btn_add-1'>View All Members</button></Link><br></br>
                </div>
            </div>

            <div className="group">
                <h1>view all students</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <td className="groups">
                                <h2>ID</h2>
                            </td>
                            <td>Students</td>
                            <td> Action </td>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((data, i) => {
                            return (
                                <tr key={i}>
                                    <td>{data.student_id}</td>
                                    <td>{data.student_name}</td>

                                    <td>
                                        <button className="custom-btn custom-btn-success" onClick={e => handelDelete(data.student_id)}>Delete</button>
                                    </td>
                                </tr>
                                
                            );
                        })}
                    </tbody>
                </table>

            </div>

        </div>
    )
};

export default ViewAllStudents





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ViewAllStudents = ({ groupId }) => {
//     const [students, setStudents] = useState([]);

//     useEffect(() => {
        
//             axios.get(`http://localhost:3000/students`)
//                 .then(response => setStudents(response.data))
//                 .catch(error => console.error("Error fetching students:", error));
//     }, [groupId]);

//     return (
//         <div>
//             <h2>Students in Group {groupId}</h2>
//             <table className="table">
//                 <thead>
//                     <tr>
//                         <td>Sr.</td>
//                         <td>Name</td>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {students.map((student, i) => (
//                         <tr key={i}>
//                             <td>{student.student_id}</td>
//                             <td>{student.student_name}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default ViewAllStudents;
