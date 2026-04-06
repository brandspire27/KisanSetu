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
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const API = "https://kisansetu-backend-v50h.onrender.com";

  const handleLogin = () => {
    if ((loginType === "email" && (!email || !password)) || (loginType === "mobile" && (!mobile || !password))) {
      alert("Please enter all credentials");
      return;
    }
    const loginData = loginType === "email" ? { email, password } : { mobile, password };
    setLoading(true);
    axios.post(`${API}/auth/login`, loginData)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        navigate("/dashboard");
      })
      .catch((err) => alert(err.response?.data?.message || "Login Failed"))
      .finally(() => setLoading(false));
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
      {/* Animated background blobs */}
      <div style={styles.blob1}></div>
      <div style={styles.blob2}></div>

      <div className="card border-0 shadow-lg p-4" style={styles.glassCard}>
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ color: "#1b5e20", letterSpacing: "1px" }}>KisanSetu</h2>
          <p className="text-muted small">{isRegistering ? "Join our farming community" : "Welcome back to the field"}</p>
        </div>

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

        <div className="form-group">
          {isRegistering && (
            <input className="form-control mb-3 py-2 border-0 shadow-sm" type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
          )}

          <input
            className="form-control mb-3 py-2 border-0 shadow-sm"
            type={(!isRegistering ? loginType : registerType) === "email" ? "email" : "text"}
            placeholder={(!isRegistering ? loginType : registerType) === "email" ? "Email Address" : "Mobile Number"}
            value={(!isRegistering ? loginType : registerType) === "email" ? email : mobile}
            onChange={(e) => (!isRegistering ? loginType : registerType) === "email" ? setEmail(e.target.value) : setMobile(e.target.value)}
          />

          {isRegistering && (
            <select className="form-select mb-3 py-2 border-0 shadow-sm" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">Select Role</option>
              <option value="farmer">Farmer</option>
              <option value="consumer">Consumer</option>
            </select>
          )}

          <input className="form-control mb-4 py-2 border-0 shadow-sm" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button
            className="btn btn-success w-100 py-2 fw-bold shadow d-flex align-items-center justify-content-center"
            style={{ borderRadius: "10px", background: "linear-gradient(45deg, #2e7d32, #43a047)" }}
            onClick={isRegistering ? handleRegister : handleLogin}
            disabled={loading}
          >
            {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : (isRegistering ? "Register" : "Login")}
          </button>
        </div>

        <div className="text-center mt-4">
          <p className="small text-muted mb-0">
            {isRegistering ? "Already have an account?" : "Don't have an account?"}
            <span className="text-success fw-bold ms-2" style={{ cursor: "pointer" }} onClick={() => setIsRegistering(!isRegistering)}>
              {isRegistering ? "Sign In" : "Sign Up"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

// Inline styles for the enhanced background
const styles = {
  backgroundWrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    background: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)",
  },
  blob1: {
    position: "absolute",
    width: "400px",
    height: "400px",
    background: "rgba(76, 175, 80, 0.2)",
    filter: "blur(80px)",
    borderRadius: "50%",
    top: "-100px",
    left: "-100px",
    zIndex: 0,
  },
  blob2: {
    position: "absolute",
    width: "300px",
    height: "300px",
    background: "rgba(129, 199, 132, 0.3)",
    filter: "blur(60px)",
    borderRadius: "50%",
    bottom: "-50px",
    right: "-50px",
    zIndex: 0,
  },
  glassCard: {
    maxWidth: "420px",
    width: "90%",
    borderRadius: "20px",
    zIndex: 1,
    background: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  }
};

export default Login;
