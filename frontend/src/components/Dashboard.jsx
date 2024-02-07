import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

import "../stylesheets/dashboard.css";
import "bootstrap-icons/font/bootstrap-icons.css";


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
    <main className="container-fluid">
      <div className="row flex-nowrap">
        <aside className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li>
                <Link
                  to="/"
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
              <li>
                <button
                  type="button"
                  className="nav-link btn px-0 align-middle text-white my-nav-link"
                  onClick={handleLogout}
                >
                  <i className="fs-4 bi-power"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </aside>
        <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
            <div className="display-4">Employee Management System</div>
          </div>
          <Outlet />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
