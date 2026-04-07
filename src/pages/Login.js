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
    <div style={styles.container}>
      <div className="card shadow p-4" style={styles.card}>
        
        <h3 className="text-center mb-3">
          {isRegistering ? "Signup" : "Login"}
        </h3>

        {/* NAME (ONLY FOR SIGNUP) */}
        {isRegistering && (
          <input
            type="text"
            placeholder="Full Name"
            className="form-control mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        {/* EMAIL OR MOBILE */}
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

        {/* STEP 1: SEND OTP */}
        {step === 1 && (
          <button className="btn btn-success w-100" onClick={sendOTP}>
            Send OTP
          </button>
        )}

        {/* STEP 2: VERIFY OTP */}
        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              className="form-control my-3"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              className="btn btn-primary w-100"
              onClick={verifyOTP}
            >
              Verify & Continue
            </button>
          </>
        )}

        {/* TOGGLE LOGIN / SIGNUP */}
        <p className="text-center mt-3">
          {isRegistering
            ? "Already have an account?"
            : "New user?"}
          <span
            style={styles.link}
            onClick={() => {
              setIsRegistering(!isRegistering);
              setStep(1);
            }}
          >
            {isRegistering ? " Login" : " Signup"}
          </span>
        </p>
      </div>
    </div>
  );
}

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
