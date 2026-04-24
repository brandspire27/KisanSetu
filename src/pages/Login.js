import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api";

function Login() {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginType, setLoginType] = useState("email");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const API = API_BASE_URL;

  // LOGIN
  const handleLogin = () => {
    if (loginType === "email" && (!email || !password)) {
      alert("Please enter email and password");
      return;
    }

    if (loginType === "mobile" && (!mobile || !password)) {
      alert("Please enter mobile and password");
      return;
    }

    const loginData =
      loginType === "email"
        ? { email, password }
        : { mobile, password };

    setIsLoading(true);

    axios
      .post(`${API}/auth/login`, loginData)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        alert("Login Successful!");
        setIsLoading(false);
        navigate("/dashboard");
      })
      .catch((err) => {
        setIsLoading(false);
        alert(err.response?.data?.message || "Login Failed");
      });
  };

  // AUTO LOGIN
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // REGISTER WITHOUT OTP
  const handleRegister = () => {
    if (!name || !email || !password || !role) {
      alert("Please fill all fields");
      return;
    }

    setIsLoading(true);

    axios.post(`${API}/auth/register`, {
      name,
      email,
      password,
      role
    })
    .then(() => {
      alert("Registration successful!");
      setIsLoading(false);
      setIsRegistering(false);
      setName("");
      setEmail("");
      setPassword("");
      setRole("");
    })
    .catch((err) => {
      setIsLoading(false);
      alert(err.response?.data?.message || "Registration Failed");
    });
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center">
      <div className="row w-100">

        {/* LEFT SIDE */}
        <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center bg-success text-white p-5">
          <h1 className="fw-bold display-4">🌾 Kisan Setu</h1>
          <p className="mt-3 text-center">
            Buy fresh directly from farmers. No middlemen. Better prices.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div
            className="card shadow-lg p-5"
            style={{ maxWidth: "400px", width: "100%", borderRadius: "16px" }}
          >
            <h3 className="text-center fw-bold mb-4">
              {isRegistering ? "Create Account" : "Login"}
            </h3>

            {/* LOGIN MODE */}
            {!isRegistering && (
              <>
                <select
                  className="form-control mb-3"
                  value={loginType}
                  onChange={(e) => setLoginType(e.target.value)}
                >
                  <option value="email">Email</option>
                  <option value="mobile">Mobile</option>
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
                    placeholder="Enter Mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                )}
              </>
            )}

            {/* REGISTER MODE */}
            {isRegistering && (
              <>
                <input
                  className="form-control mb-3"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  className="form-control mb-3"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  className="form-control mb-3"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

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

            {/* PASSWORD (LOGIN ONLY) */}
            {!isRegistering && (
              <div className="position-relative mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
            )}

            {/* BUTTON WITH LOADING ANIMATION */}
            <button
              type="button" 
              className="btn btn-success w-100 fw-bold py-2 d-flex justify-content-center align-items-center"
              onClick={isRegistering ? handleRegister : handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  {isRegistering ? "Registering..." : "Logging in..."}
                </>
              ) : (
                isRegistering ? "Register" : "Login"
              )}
            </button>

            <p className="text-center mt-4">
              {isRegistering
                ? "Already have an account?"
                : "New user?"}
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
}

export default Login;
