import React from "react";
import { useNavigate } from "react-router-dom";

function Start() {
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="d-flex justify-content-between mt-5">
        <button
          className="btn btn-outline-danger btn-lg m-3 admin"
          onClick={(e) => navigate("/login")}
        >
          Admin
        </button>
        <button
          className="btn btn-outline-light btn-lg m-3"
          onClick={(e) => navigate("/employeeLogin")}
        >
          Employee
        </button>
      </div>
    </div>
  );
}

export default Start;
