import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const res = await API.post("/register", {
        name,
        email,
        password,
      });

      alert(res.data.message);

      // Go to Login page after successful registration
      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="container mt-5">

      <h2>Register</h2>

      <input
        className="form-control mb-3"
        type="text"
        placeholder="Name"
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

      <button
        className="btn btn-success w-100"
        onClick={handleRegister}
      >
        Register
      </button>

      <p className="mt-3 text-center">
        Already have an account? <Link to="/login">Login</Link>
      </p>

    </div>
  );
}

export default Register;