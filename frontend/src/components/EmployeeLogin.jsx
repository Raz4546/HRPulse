import React, { useState,useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RecoveryContext } from "../App";


import "../stylesheets/employeeLogin.css";
function EmployeeLogin() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  axios.defaults.withCredentials = true;
  const { setEmail,email, setOTP } = useContext(RecoveryContext);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8081/employeelogin", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          const id = res.data.id;
          navigate("/employeedetail/" + id);
        } else {
          setError(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };
  const navigateToStart = () => {
    navigate("/start");
  };
  const handleResetPassword = (e) => {
    e.preventDefault();
    if (email) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      console.log(OTP);
      setOTP(OTP);
      console.log(email);
      axios
        .post("http://localhost:8081/send_recovery_email", {
          OTP,
          recipient_email: email,
        })
        .then(() => navigate("/OTP"))
        .catch(console.log);
      return;
    }

    return alert("Please enter your email");
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <div className="text-danger">{error && error}</div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={(e) => {
                setValues({ ...values, email: e.target.value });
                setEmail(e.target.value);
              }}
              className="form-control rounded-0"
              autoComplete="off"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              className="form-control rounded-0"
            />
          </div>
          <a
            href="#"
            onClick={(e) => handleResetPassword(e)}
            className="btn btn-link btn-sm pl-10 mb-2"
          >
            Forgot password?
          </a>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            {" "}
            Log in
          </button>
          <p className="h6">You are agree to our terms and policies</p>
          <button
            type="button"
            className="btn btn-outline-secondary btn-lg"
            onClick={navigateToStart}
          >
            <i className="bi bi-arrow-left"></i>
          </button>
        </form>
      </div>
    </div>
  );
}

export default EmployeeLogin;
