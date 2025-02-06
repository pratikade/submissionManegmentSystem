import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../Student.css';
import '../AlertCreate.css'
import '../studentList.css'
function AddGroups() {

    const [group_name, setGroupName] = useState('');
    const navigate = useNavigate();

    function handleSubmitGroupsName(event) {
        event.preventDefault();
        axios.post("http://localhost:3000/groups", { group_name })
            .then(res => {
                console.log(res);
                navigate('/groups');

            }).catch(err => console.log(err));

    }
    return (
        <div>
            <div>
                <div className="dashboard">
                    <h1>Dashboard</h1>
                    <Link to={`/StudentList`}><button className='btn'><strong>Student List</strong></button></Link> <br />
                    <Link to={`/groups`}><button className='btn'><strong className='margin'> Student groups  </strong></button></Link> <br />
                    <button className='btn'><strong> Student Batches  </strong></button>
                    <Link to={`/groups`}><button className='btn_add'> View Groups</button></Link>
                    {/* <Link to="/create" className="btn btn-success">Add +</Link> */}
                </div>
            </div>
            <div className='custom-flex-container'>
                <form onSubmit={handleSubmitGroupsName}>
                    <h2> Add Groups</h2>
                    <div className="custom-margin-bottom">
                        <label htmlFor="">Group Name</label>
                        <input
                            type="text"
                            placeholder="Enter Group Name"
                            className="custom-form-control" onChange={e => setGroupName(e.target.value)}
                        />

                    </div>

                    <button className="custom-btn custom-btn-success">Submit</button>
                </form>
            </div>


        </div>
    )
}

export default AddGroups
