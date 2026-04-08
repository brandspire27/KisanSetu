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
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const API = "https://kisansetu-backend-v50h.onrender.com";

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

    axios.post(`${API}/auth/login`, loginData)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        alert("Login Successful!");
        navigate("/dashboard");
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Login Failed");
      });
  };

  // AUTO LOGIN CHECK
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // REGISTER
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
        alert("Registration Successful!");
        setIsRegistering(false);
      })
      .catch((err) => {
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

          <div className="card shadow-lg p-5" style={{ maxWidth: "400px", width: "100%", borderRadius: "16px" }}>

            <h3 className="text-center fw-bold mb-4">
              {isRegistering ? "Create Account" : "Login"}
            </h3>

            {isRegistering && (
              <input
                className="form-control mb-3"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}

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

            {isRegistering && (
              <>
                <input
                  className="form-control mb-3"
                  placeholder="Email or Mobile"
                  value={email || mobile}
                  onChange={(e) => setEmail(e.target.value)}
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

            {/* PASSWORD */}
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
                  cursor: "pointer"
                }}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <button
              className="btn btn-success w-100 fw-bold py-2"
              onClick={isRegistering ? handleRegister : handleLogin}
            >
              {isRegistering ? "Create Account" : "Login"}
            </button>

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
}

export default Login;
