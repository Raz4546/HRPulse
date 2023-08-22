import React, { useContext, useState } from "react";
import { RecoveryContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "../stylesheets/login.css";
import "font-awesome/css/font-awesome.min.css";
function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const { setEmail, setPage, email, setOTP } = useContext(RecoveryContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8081/login", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/");
        } else {
          setError(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  const navigateToStart = (str) => {
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
        .then(navigate("/OTP"))
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
          <div className="mb-2">
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
          <div className="mb-2">
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
            className="btn btn-link btn-sm pl-10 mb-2"
            onClick={(e) => handleResetPassword(e)}
          >
            Forgot password?
          </a>
          <button
            type="submit"
            className="btn btn-success w-100 rounded-2 mb-2"
          >
            {" "}
            Log in
          </button>
          <small className="text-body-secondary mt-2">
            You are agree to our terms and policies
          </small>
          <br />
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

export default Login;
