import React, { useState, createContext } from "react";
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
import OTP from "./components/OTP";
import Reset from "./components/reset";
import Recovered from "./components/Recovered";
export const RecoveryContext = createContext();

function App() {
  const [email, setEmail] = useState();
  const [otp, setOTP] = useState();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create" element={<AddEmployee />} />
          <Route path="/employeeEdit/:id" element={<EditEmployee />} />
        </Route>
        <Route path="/start" element={<Start />} />
        <Route path="/employeedetail/:id" element={<EmployeeDetail />} />
        <Route
          path="/employeeLogin"
          element={
            <RecoveryContext.Provider value={{ email, setEmail, otp, setOTP }}>
              <EmployeeLogin />
            </RecoveryContext.Provider>
          }
        />
        <Route
          path="/login"
          element={
            <RecoveryContext.Provider value={{ email, setEmail, otp, setOTP }}>
              <Login />
            </RecoveryContext.Provider>
          }
        />
        <Route
          path="/otp"
          element={
            <RecoveryContext.Provider value={{ email, setEmail, otp, setOTP }}>
              <OTP />
            </RecoveryContext.Provider>
          }
        />
        <Route
          path="/reset"
          element={
            <RecoveryContext.Provider value={{ email, setEmail, otp, setOTP }}>
              <Reset />
            </RecoveryContext.Provider>
          }
        />
        <Route
          path="/recovered"
          element={
            <RecoveryContext.Provider value={{ email, setEmail, otp, setOTP }}>
              <Recovered />
            </RecoveryContext.Provider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
