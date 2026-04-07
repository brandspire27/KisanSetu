import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // OTP step
  const [useOTP, setUseOTP] = useState(false); // toggle
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const API = "https://kisansetu-backend-v50h.onrender.com/api/auth";

  // ================= NORMAL LOGIN =================
  const handleLogin = async () => {
    if ((!email && !mobile) || !password) {
      return alert("Enter credentials");
    }

    const payload = email ? { email, password } : { mobile, password };

    try {
      setLoading(true);
      const res = await axios.post(`${API}/login`, payload);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= SEND OTP =================
  const sendOTP = async () => {
    const payload = email ? { email } : { mobile };

    try {
      const res = await fetch(`${API}/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        alert("OTP sent");
        setStep(2);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ================= VERIFY OTP =================
  const verifyOTP = async () => {
    const payload = email ? { email, otp } : { mobile, otp };

    try {
      const res = await fetch(`${API}/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ================= REDIRECT IF LOGGED IN =================
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow" style={{ width: "400px" }}>

        <h3 className="text-center mb-3">Kisan Setu Login</h3>

        {/* 🔥 TOGGLE BUTTON */}
        <div className="d-flex mb-3">
          <button
            className={`btn w-50 ${!useOTP ? "btn-success" : "btn-outline-success"}`}
            onClick={() => setUseOTP(false)}
          >
            Password
          </button>
          <button
            className={`btn w-50 ${useOTP ? "btn-success" : "btn-outline-success"}`}
            onClick={() => {
              setUseOTP(true);
              setStep(1);
            }}
          >
            OTP
          </button>
        </div>

        {/* 🔥 EMAIL / MOBILE INPUT */}
        <input
          type="text"
          placeholder="Enter Email or Mobile"
          className="form-control mb-3"
          onChange={(e) => {
            const value = e.target.value;
            if (value.includes("@")) {
              setEmail(value);
              setMobile("");
            } else {
              setMobile(value);
              setEmail("");
            }
          }}
        />

        {/* ================= PASSWORD LOGIN ================= */}
        {!useOTP && (
          <>
            <input
              type="password"
              placeholder="Password"
              className="form-control mb-3"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="btn btn-success w-100"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </>
        )}

        {/* ================= OTP LOGIN ================= */}
        {useOTP && (
          <>
            {step === 1 && (
              <button className="btn btn-primary w-100" onClick={sendOTP}>
                Send OTP
              </button>
            )}

            {step === 2 && (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="form-control my-3"
                  onChange={(e) => setOtp(e.target.value)}
                />

                <button
                  className="btn btn-success w-100"
                  onClick={verifyOTP}
                >
                  Verify & Login
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
