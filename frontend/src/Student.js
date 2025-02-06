import React from 'react'
import './Student.css';
import './studentList.css'
import { Link } from 'react-router-dom';

function Student() {

  

  return (
    <div className='contenir'>
        {/* creating the dashboard */}
      <div className="dashboard">
        <h1>Dashboard</h1>
        <Link to={`/StudentList`}><button className='btn'><strong>Student List</strong></button></Link> <br/>
        <Link to={`/groups`}><button className='btn'><strong className='margin'> Student groups  </strong></button></Link> <br/>
        <button className='btn'><strong> Student Batches  </strong></button><br/>
    

        {/* <Link to="/create" className="btn btn-success">Add +</Link> */}
      </div>

        {/* space for user for creating thir database  */}
      
        <div className='userSpacee'>
        <h1> <span>hello User,</span> <br/>
        welcome to the digital subbmission management system.
        </h1>
        </div>

        

    </div>
  )
}

export default Student
