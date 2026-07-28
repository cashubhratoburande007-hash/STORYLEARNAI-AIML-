import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Register.css";

function Register() {
     const navigate = useNavigate();

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const handleRegister = async ()=>{

    try{

      const res = await API.post("/register",{
        name,
        email,
        password
      });

      alert(res.data.message);
      localStorage.setItem("user", 
    JSON.stringify(response.data.user));
        navigate("/login");

    }catch(err){

      alert(err.response?.data?.message || "Registration Failed");

    }

  };

  return(
    <div className="container mt-5">

      <h2>Register</h2>

      <input
      className="form-control mb-3"
      placeholder="Name"
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />

      <input
      className="form-control mb-3"
      placeholder="Email"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      />

      <input
      type="password"
      className="form-control mb-3"
      placeholder="Password"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      />

      <button
      className="btn btn-success"
      onClick={handleRegister}
      >
      Register
      </button>

    </div>
  );
}

export default Register;