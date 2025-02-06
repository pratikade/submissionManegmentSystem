import React, { useState } from 'react';
import axios from 'axios';

function AddStudentToGroup({ groupId }) {
  const [studentId, setStudentId] = useState('');

  const addStudent = () => {
    axios.post(`http://localhost:3000/groups/${groupId}/students`, { student_id: studentId })
      .then(response => {
        console.log('Student added:', response.data);
        setStudentId('');
      })
      .catch(error => console.error('Error adding student to group:', error));
  };

  return (
    <div>
      <h3>Add more members in group {groupId}</h3>
      <input
        type="text"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        placeholder="Student ID"
        className="custom-form-control"
      />
      <button onClick={addStudent} className="custom-btn custom-btn-success">Add Student</button>
    </div>
  );
}

export default AddStudentToGroup;
