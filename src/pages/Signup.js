import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, [navigate]);

  return null;
}

export default Signup;