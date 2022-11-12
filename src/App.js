import "./App.css";
import Login from "./login/login";
import AddStudent from "./addStudent/addStudent";
import Attendence from './attendence/attendence';
import StudentData from './studentData/studentData';
import CreateClass from './createClass/createClass';
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import DrawerMe from "./DrawerMe";

function App() {
  return (
    
<>
    <Router>
   <DrawerMe />
    <Routes>
      <Route  index element={<Login />}/>
    
      <Route exact path="/addstudent" element={<AddStudent />}/>
      <Route exact path="/studentdata" element={<StudentData />}/>
      <Route exact path="/createclass" element={<CreateClass />}/>
      <Route exact path="/attendence" element={<Attendence />}/>

    </Routes>
  </Router>
  <ToastContainer
       position="bottom-center"
       autoClose={5000}
       hideProgressBar={false}
       newestOnTop={false}
       closeOnClick
       rtl={false}
       pauseOnFocusLoss
       draggable
       pauseOnHover
       theme="dark"
     />
  </>
  );
}

export default App;
