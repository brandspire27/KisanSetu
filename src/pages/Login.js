import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginType, setLoginType] = useState("email");
  const [registerType, setRegisterType] = useState("email");
  
  // Loading State
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const API = "https://kisansetu-backend-v50h.onrender.com";

  const handleLogin = () => {
    if (loginType === "email" && (!email || !password)) {
      alert("Please enter email and password");
      return;
    }
    if (loginType === "mobile" && (!mobile || !password)) {
      alert("Please enter mobile and password");
      return;
    }

    const loginData = loginType === "email" ? { email, password } : { mobile, password };

    setLoading(true); // Start animation
    axios.post(`${API}/auth/login`, loginData)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        navigate("/dashboard");
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Login Failed");
      })
      .finally(() => setLoading(false)); // Stop animation
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
      .catch((err) => {
        alert(err.response?.data?.message || "Registration Failed");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh", background: "#f4f7f6" }}>
      <div className="card border-0 shadow-lg p-4" style={{ maxWidth: "420px", width: "90%", borderRadius: "15px" }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold text-success">KisanSetu</h2>
          <p className="text-muted">{isRegistering ? "Create your account" : "Welcome back!"}</p>
        </div>

        {/* Tab Switcher for Login/Register Type */}
        <div className="btn-group w-100 mb-4" role="group">
          <button 
            className={`btn btn-sm ${(!isRegistering ? loginType : registerType) === 'email' ? 'btn-success' : 'btn-outline-success'}`}
            onClick={() => isRegistering ? setRegisterType("email") : setLoginType("email")}
          >Email</button>
          <button 
            className={`btn btn-sm ${(!isRegistering ? loginType : registerType) === 'mobile' ? 'btn-success' : 'btn-outline-success'}`}
            onClick={() => isRegistering ? setRegisterType("mobile") : setLoginType("mobile")}
          >Mobile</button>
        </div>

        <div className="form-group">
          {isRegistering && (
            <input
              className="form-control mb-3 py-2"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            className="form-control mb-3 py-2"
            type={(!isRegistering ? loginType : registerType) === "email" ? "email" : "text"}
            placeholder={(!isRegistering ? loginType : registerType) === "email" ? "Email Address" : "Mobile Number"}
            value={(!isRegistering ? loginType : registerType) === "email" ? email : mobile}
            onChange={(e) => (!isRegistering ? loginType : registerType) === "email" ? setEmail(e.target.value) : setMobile(e.target.value)}
          />

          {isRegistering && (
            <select className="form-select mb-3 py-2" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">I am a...</option>
              <option value="farmer">Farmer</option>
              <option value="consumer">Consumer</option>
            </select>
          )}

          <input
            className="form-control mb-4 py-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="btn btn-success w-100 py-2 fw-bold shadow-sm d-flex align-items-center justify-content-center"
            onClick={isRegistering ? handleRegister : handleLogin}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Processing...
              </>
            ) : (
              isRegistering ? "Register" : "Login"
            )}
          </button>
        </div>

        <div className="text-center mt-4">
          <p className="small text-muted">
            {isRegistering ? "Already have an account?" : "Don't have an account?"}
            <span
              className="text-success fw-bold ms-2"
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering ? "Sign In" : "Sign Up"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
