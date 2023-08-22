import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../stylesheets/profile.css";
import { PropagateLoader } from "react-spinners";

function CompanyInfo() {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [companyName, setCompanyName] = useState("HRPulse");
  const [location, setLocation] = useState("Tel Aviv");
  const [origin, setOrigin] = useState([
    { companyName: companyName, location: location },
  ]);

  useEffect(() => {
    setIsLoading(false);
  }, []);
  const handleEditClick = () => {
    setIsEditing(!isEditing);
    setOrigin({ companyName, location });
  };

  const handleSaveClick = (event) => {
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setCompanyName(origin.companyName);
    setLocation(origin.location);
    setIsEditing(false);
  };
  return (
    <div className="container mt-5">
      {isLoading ? (
        <PropagateLoader color="rgba(33,37,41 0.35)" />
      ) : (
        <div className="row">
          <div className="col-md-6">
            <img
              src="Images/logo.jpg"
              alt="HRPulse Logo"
              className="img-fluid"
            />
          </div>
          <div className="col-md-6">
            <br />
            <br />
            <br />
            <br />
            <br />
            {isEditing ? (
              <div>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="form-control"
                />
                <br />
                <div className="gap-3">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="form-control p-2 g"
                  />
                  <br />
                  <div className="hstack gap-4 ">
                    <button
                      type="button"
                      className="btn btn-success btn-lg mt-2"
                      onClick={handleSaveClick}
                    >
                      Save changes
                    </button>
                    <div className="vr"></div>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-lg mt-2"
                      onClick={handleCancelClick}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h1 className="display-1  text-danger-emphasis companyName">
                  {companyName}
                </h1>
                <h2 className="text-body-secondary">{location}</h2>
                <p className="lead">
                  Your Partner in Human Resources Management.
                </p>
                <button
                  className="btn btn-danger btn-lg"
                  onClick={handleEditClick}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CompanyInfo;
