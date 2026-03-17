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

  const navigate = useNavigate();
  const API = "https://kisansetu-backend-v50h.onrender.com/";

  const handleLogin = () => {
    const loginData =
      loginType === "email"
        ? { email, password }
        : { mobile, password };

    axios.post(`${API}/auth/login`, loginData)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        alert("Login Successful!");
        navigate("/dashboard");
      })
      .catch(err => {
        alert(err.response?.data?.message || "Login Failed");
      });
  };
  useEffect(() => {
  const token = localStorage.getItem("token");
  if(token){
    navigate("/dashboard");
  }
}, [navigate]);

  const handleRegister = () => {
    let registerData = {
      name,
      password,
      role
    };

    if (registerType === "email") {
      registerData.email = email;
    } else {
      registerData.mobile = mobile;
    }

    axios.post(`${API}/auth/register`, registerData)
      .then(() => {
        alert("Registration Successful! Please Login.");
        setIsRegistering(false);
      })
      .catch(err => {
        alert(err.response?.data?.message || "Registration Failed");
      });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "400px" }}>
        <h4 className="text-center mb-3">
          {isRegistering ? "Register" : "Login"}
        </h4>

        {isRegistering && (
          <input
            className="form-control mb-2"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        {!isRegistering && (
          <>
            <select
              className="form-control mb-2"
              value={loginType}
              onChange={(e) => setLoginType(e.target.value)}
            >
              <option value="email">Login with Email</option>
              <option value="mobile">Login with Mobile</option>
            </select>

            {loginType === "email" ? (
              <input
                className="form-control mb-2"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              <input
                className="form-control mb-2"
                type="text"
                placeholder="Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            )}
          </>
        )}

        {isRegistering && (
          <>
            <select
              className="form-control mb-2"
              value={registerType}
              onChange={(e) => setRegisterType(e.target.value)}
            >
              <option value="email">Register with Email</option>
              <option value="mobile">Register with Mobile</option>
            </select>

            {registerType === "email" ? (
              <input
                className="form-control mb-2"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              <input
                className="form-control mb-2"
                type="text"
                placeholder="Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            )}

            <select
              className="form-control mb-2"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select Role</option>
              <option value="farmer">Farmer</option>
              <option value="consumer">Consumer</option>
            </select>
          </>
        )}

        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn btn-success w-100"
          onClick={isRegistering ? handleRegister : handleLogin}
        >
          {isRegistering ? "Register" : "Login"}
        </button>

        <p className="text-center mt-3">
          {isRegistering ? "Already have an account?" : "Don't have an account?"}
          <span
            className="text-primary ms-2"
            style={{ cursor: "pointer" }}
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? "Login" : "Register"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
