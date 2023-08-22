import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Employee from "./components/Employee";
import Profile from "./components/Profile";
import Home from "./components/Home";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";
import Start from "./components/Start";
import EmployeeLogin from "./components/EmployeeLogin";
import EmployeeDetail from "./components/EmployeeDetail";

function App() {
  const [page, setPage] = useState("login");
  const [email, setEmail] = useState();
  const [otp, setOtp] = useState();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/" element={<Home />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create" element={<AddEmployee />} />
          <Route path="/employeeEdit/:id" element={<EditEmployee />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/start" element={<Start />} />
        <Route path="/employeeLogin" element={<EmployeeLogin />} />
        <Route path="/employeedetail/:id" element={<EmployeeDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
