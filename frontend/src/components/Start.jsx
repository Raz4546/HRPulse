import React from "react";
import { useNavigate } from "react-router-dom";

function Start() {
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      {/* <div className="p-3 rounded w-25 border loginForm text-center"> */}
      {/* <h2>Login As</h2> */}
      <div className="d-flex justify-content-between mt-5">
        <button
          className="btn btn btn-outline-danger btn-lg m-3"
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
      {/* </div> */}
    </div>
  );
}

export default Start;
