import React, { useState, useContext } from "react";
import { RecoveryContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../stylesheets/otp.css";
const OTP = () => {
  const { email, otp } = useContext(RecoveryContext);
  const [timerCount, setTimer] = React.useState(60);
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate();

  const resendOTP = () => {
    if (disable) return;
    axios
      .post("http://localhost:8081/send_recovery_email", {
        OTP: otp,
        recipient_email: email,
      })
      .then(() => setDisable(true))
      .then(() => alert("A new OTP has succesfully been sent to your email."))
      .then(() => setTimer(60))
      .catch(console.log);
  };

  const verfiyOTP = () => {
    if (parseInt(OTPinput.join("")) === otp) {
      navigate("/reset");
      return;
    }
    alert(
      "The code you have entered is not correct, try again or re-send the link"
    );
    return;
  };

  React.useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, [disable]);
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="card py-5 px-3 otp">
        <div className="h2">
          <p>Email Verification</p>
        </div>
        <div className="h6 text-secondary-emphasis">
          <p>We have sent a code to your email {email}</p>
        </div>
        <span className="h6 text-secondary-emphasis">
          Plese enter the 4-digit numbers you've recieved in you email
        </span>
        <div className="d-flex flex-row mt-5">
          <input
            type="text"
            maxLength="1"
            className="form-control text-center p-2 m-2"
            name=""
            id=""
            onChange={(e) =>
              setOTPinput([
                e.target.value,
                OTPinput[1],
                OTPinput[2],
                OTPinput[3],
              ])
            }
          />
          <input
            type="text"
            maxLength="1"
            className="form-control text-center p-2 m-2"
            name=""
            id=""
            onChange={(e) =>
              setOTPinput([
                OTPinput[0],
                e.target.value,
                OTPinput[2],
                OTPinput[3],
              ])
            }
          />
          <input
            type="text"
            maxLength="1"
            className="form-control text-center p-2 m-2"
            name=""
            id=""
            onChange={(e) =>
              setOTPinput([
                OTPinput[0],
                OTPinput[1],
                e.target.value,
                OTPinput[3],
              ])
            }
          />
          <input
            type="text"
            maxLength="1"
            className="form-control text-center p-2 m-2"
            name=""
            id=""
            onChange={(e) =>
              setOTPinput([
                OTPinput[0],
                OTPinput[1],
                OTPinput[2],
                e.target.value,
              ])
            }
          />
        </div>
        <div>
          <div className="text-center">
            <a className="btn btn-primary mb-2" onClick={() => verfiyOTP()}>
              Verify Account
            </a>
          </div>
        </div>
        <div className="text-center">
          <p>Didn't recieve code?</p>
          <a className="btn btn-link" onClick={() => resendOTP()}>
            {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default OTP;
