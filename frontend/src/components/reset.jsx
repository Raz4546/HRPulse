import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RecoveryContext } from "../App";

import axios from "axios";

const Reset = () => {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [alertVisible, setAlertVisible] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  const { email } = useContext(RecoveryContext);

  const handleClick = (e) => {
    e.preventDefault();
    if (first.trim() === "" || second.trim() === "") {
      setAlertMessage("Both password fields must be filled in.");
      setAlertVisible("1");
      return;
    }
    if (first === second) {
      axios
        .put("http://localhost:8081/reset", { email, newPassword: first })
        .then((res) => {
          if (res.data.Status === "Success") {
            setAlertMessage("Password reset successful.");
            setAlertVisible("2");
            navigate("/login");
          } else {
            setAlertMessage("Password reset failed.");
            setAlertVisible("3");
          }
        })
        .catch((err) => {
          console.log("Error:", err);
          setAlertMessage("An error occurred.");
          setAlertVisible("4");
        });
    } else {
      setAlertMessage("Passwords do not match.");
      setAlertVisible("5");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="card py-5 px-3 otp">
        <form>
          <div>
            <label htmlFor="inputPassword1" className="form-label h3">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword1"
              required
              onChange={(e) => setFirst(e.target.value)}
            />
            <div id="passwordHelpBlock" className="form-text h6">
              Your password must be 8-20 characters long
            </div>
            <label htmlFor="inputPassword2" className="form-label h3">
              Re-Password
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword2"
              aria-describedby="passwordHelpBlock"
              onChange={(e) => setSecond(e.target.value)}
              required
            />
            <div className="text-center mt-3">
              <button
                className="btn btn-success mt-3"
                onClick={(e) => handleClick(e)}
              >
                Save changes
              </button>
              {alertVisible === "1" ? (
                <div className="alert alert-danger mt-3" role="alert">
                  {alertMessage}
                </div>
              ) : alertVisible === "2" ? (
                <div className="alert alert-success mt-3" role="alert">
                  {alertMessage}
                </div>
              ) : alertVisible === "3" ? (
                <div className="alert alert-danger mt-3" role="alert">
                  {alertMessage}
                </div>
              ) : alertVisible === "4" ? (
                <div className="alert alert-danger mt-3" role="alert">
                  {alertMessage}
                </div>
              ) : alertVisible === "5" ? (
                <div className="alert alert-danger mt-3" role="alert">
                  {alertMessage}
                </div>
              ) : null}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reset;
