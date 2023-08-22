import React, { useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

import "../stylesheets/dashboard.css";
function Dashboard() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:8081/dashboard");
        if (res.data.Status === "Success") {
          if (res.data.role === "admin") {
            navigate("/");
          } else {
            const id = res.data.id;
            navigate("/employeedetail/" + id);
          }
        } else {
          navigate("/start");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8081/logout");
      navigate("/start");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a
              href="/"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 fw-bolder d-none d-sm-inline"></span>
            </a>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li>
                <Link
                  to="/"
                  data-bs-toggle="collapse"
                  className="nav-link text-white px-0 align-middle w-100 my-nav-link"
                >
                  <i className="bi bi-house fs-3"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">Home</span>{" "}
                </Link>
              </li>
              <li>
                <Link
                  to="/employee"
                  className="nav-link px-0 align-middle text-white my-nav-link"
                >
                  <i className="fs-4 bi-people"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">
                    Manage Employee
                  </span>{" "}
                </Link>
              </li>
              <li>
                <Link
                  to="profile"
                  className="nav-link px-0 align-middle text-white my-nav-link"
                >
                  <i className="bi bi-buildings fs-4"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">
                    Company Profile
                  </span>
                </Link>
              </li>
              <li onClick={handleLogout}>
                <a
                  href="#"
                  className="nav-link px-0 align-middle text-white my-nav-link"
                >
                  <i className="fs-4 bi-power"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
            <div className="display-4">Employee Management System</div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
