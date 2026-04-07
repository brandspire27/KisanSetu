import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1 = email, 2 = OTP
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false); // New State for Admin
  const [loginType, setLoginType] = useState("email");
  const [registerType, setRegisterType] = useState("email");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const API = "https://kisansetu-backend-v50h.onrender.com";

  const handleLogin = () => {
    // Basic Validation
    if (isAdminLogin) {
      if (!email || !password) return alert("Admin credentials required");
    } else {
      if ((loginType === "email" && (!email || !password)) || (loginType === "mobile" && (!mobile || !password))) {
        alert("Please enter all credentials");
        return;
      }
    }

    const loginData = isAdminLogin 
      ? { email, password, role: "admin" } // Pass admin role explicitly if your backend requires it
      : (loginType === "email" ? { email, password } : { mobile, password });

    setLoading(true);
    axios.post(`${API}/auth/login`, loginData)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        // Direct admins to a specific dashboard if needed
        res.data.role === "admin" ? navigate("/admin-dashboard") : navigate("/dashboard");
      })
      .catch((err) => alert(err.response?.data?.message || "Login Failed"))
      .finally(() => setLoading(false));
  };
 const sendOTP = async () => {
  const payload = email ? { email } : { mobile };

  const res = await fetch("http://localhost:5000/api/auth/send-otp", {
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
      alert(data.message || "Error sending OTP");
    }
  catch (error) {
    console.log(error);
  }
};
  const verifyOTP = async () => {
  const payload = email
    ? { email, otp }
    : { mobile, otp };

  const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
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
    window.location.href = "/";
  } else {
      alert(data.message || "Invalid OTP");
    }
 catch (error) {
    console.log(error);
  }
};

  const handleRegister = () => {
    if (!role) return alert("Please select a role");
    let registerData = { name, password, role };
    if (registerType === "email") registerData.email = email;
    else registerData.mobile = mobile;

    setLoading(true);
    axios.post(`${API}/auth/register`, registerData)
      .then(() => {
        alert("Registration Successful! Please Login.");
        setIsRegistering(false);
      })
      .catch((err) => alert(err.response?.data?.message || "Registration Failed"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  return (
    <div style={styles.backgroundWrapper}>
      <div style={styles.blob1}></div>
      <div style={styles.blob2}></div>

      <div className="card border-0 shadow-lg p-4" style={styles.glassCard}>
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ color: isAdminLogin ? "#c62828" : "#1b5e20", letterSpacing: "1px" }}>
            {isAdminLogin ? "KisanSetu Admin" : "KisanSetu"}
          </h2>
          <p className="text-muted small">
            {isAdminLogin ? "Restricted Access Only" : (isRegistering ? "Join our farming community" : "Welcome back to the field")}
          </p>
        </div>

        {/* Hide Type Selectors if Admin Login is active */}
        {!isAdminLogin && (
          <div className="btn-group w-100 mb-4" role="group">
            <button 
              className={`btn btn-sm ${(!isRegistering ? loginType : registerType) === 'email' ? 'btn-success' : 'btn-outline-success'}`}
              onClick={() => isRegistering ? setRegisterType("email") : setLoginType("email")}
              style={{ borderRadius: "8px 0 0 8px" }}
            >Email</button>
            <button 
              className={`btn btn-sm ${(!isRegistering ? loginType : registerType) === 'mobile' ? 'btn-success' : 'btn-outline-success'}`}
              onClick={() => isRegistering ? setRegisterType("mobile") : setLoginType("mobile")}
              style={{ borderRadius: "0 8px 8px 0" }}
            >Mobile</button>
          </div>
        )}

        <div className="form-group">
          {isRegistering && (
            <input className="form-control mb-3 py-2 border-0 shadow-sm" type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
          )}

          {/* Admin Login uses Email by default in this example */}
          <input
            className="form-control mb-3 py-2 border-0 shadow-sm"
            type={(isAdminLogin || (!isRegistering ? loginType : registerType) === "email") ? "email" : "text"}
            placeholder={isAdminLogin ? "Admin Email" : ((!isRegistering ? loginType : registerType) === "email" ? "Email Address" : "Mobile Number")}
            value={(isAdminLogin || (!isRegistering ? loginType : registerType) === "email") ? email : mobile}
            onChange={(e) => (isAdminLogin || (!isRegistering ? loginType : registerType) === "email") ? setEmail(e.target.value) : setMobile(e.target.value)}
          />

          {isRegistering && !isAdminLogin && (
            <select className="form-select mb-3 py-2 border-0 shadow-sm" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">Select Role</option>
              <option value="farmer">Farmer</option>
              <option value="consumer">Consumer</option>
            </select>
          )}

          <input className="form-control mb-4 py-2 border-0 shadow-sm" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button
            className="btn w-100 py-2 fw-bold shadow d-flex align-items-center justify-content-center"
            style={{ 
                borderRadius: "10px", 
                background: isAdminLogin ? "linear-gradient(45deg, #b71c1c, #e53935)" : "linear-gradient(45deg, #2e7d32, #43a047)",
                color: "white" 
            }}
            onClick={isRegistering ? handleRegister : handleLogin}
            disabled={loading}
          >
            {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : (isAdminLogin ? "Admin Login" : (isRegistering ? "Register" : "Login"))}
          </button>
        </div>

        <div className="text-center mt-4">
          {!isAdminLogin && (
            <p className="small text-muted mb-2">
              {isRegistering ? "Already have an account?" : "Don't have an account?"}
              <span className="text-success fw-bold ms-2" style={{ cursor: "pointer" }} onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? "Sign In" : "Sign Up"}
              </span>
            </p>
          )}
          
          {/* Admin Toggle */}
          <p className="small text-muted">
            {isAdminLogin ? "Are you a User?" : "Are you an Admin?"}
            <span 
              className="fw-bold ms-2" 
              style={{ cursor: "pointer", color: isAdminLogin ? "#2e7d32" : "#b71c1c" }} 
              onClick={() => {
                setIsAdminLogin(!isAdminLogin);
                setIsRegistering(false); // Can't register as admin from here
              }}
            >
              {isAdminLogin ? "User Login" : "Admin Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

// ... styles remain the same ...
