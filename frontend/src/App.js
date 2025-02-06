import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Student from "./Student";
import StudentList from "./studentList";
import AlertCreate from "./alertCreate";
import GroupList from "./groups/groupList";
import AddStudentToGroup from "./groups/AddStudentToGroup";
import CreateStudent from "./createNew";
import ViewAllStudents from "./groups/viewAllStudents";
import AddStudentToStudentList from "./groups/addStudentToStudentList";
import AddGroups from "./groups/AddGroups";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Student />}></Route>
          <Route path="/StudentList" element={<StudentList />}></Route>
          <Route path="/update/:id" element={<AlertCreate />}></Route>
          <Route path="/groups/:group_id/students" element={<AddStudentToGroup />}> </Route>
          <Route path="/groups" element={<GroupList />}></Route>
          <Route path="/create" element={<CreateStudent />}></Route>
          <Route path="/students" element={<ViewAllStudents />}></Route>
          <Route path="/student" element={<AddStudentToStudentList />}></Route>
          <Route path="/AddGroups" element={<AddGroups />}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}


    
    
   
export default App;
