import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1 = send OTP, 2 = verify OTP
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const API = "https://kisansetu-backend-v50h.onrender.com/auth";

  // ================= SEND OTP =================
  const sendOTP = async () => {
    if (!email && !mobile) {
      return alert("Enter Email or Mobile");
    }

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
        alert("OTP sent successfully");
        setStep(2);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  // ================= VERIFY OTP =================
  const verifyOTP = async () => {
    const payload = email
      ? { email, otp, name }
      : { mobile, otp, name };

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

        alert("Login Successful 🚀");
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Verification failed");
    }
  };

  // ================= AUTO REDIRECT =================
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  return (
  <div className="container-fluid min-vh-100 d-flex align-items-center">

    <div className="row w-100">

      {/* LEFT SIDE (Branding) */}
      <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center bg-success text-white p-5">
        
        <h1 className="fw-bold display-4">🌾 Kisan Setu</h1>
        
        <p className="mt-3 text-center">
          Connecting farmers directly with consumers for fresh and fair products.
        </p>

        <img 
          src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae"
          alt="farm"
          className="img-fluid mt-4 rounded shadow"
          style={{ maxHeight: "300px", objectFit: "cover" }}
        />
      </div>

      {/* RIGHT SIDE (FORM) */}
      <div className="col-md-6 d-flex justify-content-center align-items-center">

        <div className="card shadow-lg p-5" style={{ maxWidth: "400px", width: "100%", borderRadius: "16px" }}>

          <h2 className="text-center fw-bold mb-4">
            {isRegistering ? "Create Account" : "Login"}
          </h2>

          {/* NAME (REGISTER) */}
          {isRegistering && (
            <input
              className="form-control mb-3"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          {/* LOGIN TYPE */}
          {!isRegistering && (
            <>
              <select
                className="form-control mb-3"
                value={loginType}
                onChange={(e) => setLoginType(e.target.value)}
              >
                <option value="email">Login with Email</option>
                <option value="mobile">Login with Mobile</option>
              </select>

              {loginType === "email" ? (
                <input
                  className="form-control mb-3"
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              ) : (
                <input
                  className="form-control mb-3"
                  type="text"
                  placeholder="Enter Mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              )}
            </>
          )}

          {/* REGISTER TYPE */}
          {isRegistering && (
            <>
              <select
                className="form-control mb-3"
                value={registerType}
                onChange={(e) => setRegisterType(e.target.value)}
              >
                <option value="email">Register with Email</option>
                <option value="mobile">Register with Mobile</option>
              </select>

              {registerType === "email" ? (
                <input
                  className="form-control mb-3"
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              ) : (
                <input
                  className="form-control mb-3"
                  type="text"
                  placeholder="Enter Mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              )}

              <select
                className="form-control mb-3"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="farmer">Farmer</option>
                <option value="consumer">Consumer</option>
              </select>
            </>
          )}

          {/* PASSWORD */}
          <input
            className="form-control mb-4"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* BUTTON */}
          <button
            className="btn btn-success w-100 fw-bold py-2"
            onClick={isRegistering ? handleRegister : handleLogin}
          >
            {isRegistering ? "Create Account" : "Login"}
          </button>

          {/* SWITCH */}
          <p className="text-center mt-4">
            {isRegistering ? "Already have an account?" : "New user?"}
            <span
              className="text-success fw-bold ms-2"
              style={{ cursor: "pointer" }}
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering ? "Login" : "Signup"}
            </span>
          </p>

        </div>

      </div>

    </div>

  </div>
);

export default Login;

// ================= STYLES =================
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5",
  },
  card: {
    width: "350px",
    borderRadius: "10px",
  },
  link: {
    color: "green",
    cursor: "pointer",
    marginLeft: "5px",
    fontWeight: "bold",
  },
};
