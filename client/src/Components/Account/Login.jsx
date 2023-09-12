import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./mix.css";

const Login = () => {
  const history = useNavigate();

  const [inpVal, setInpVal] = useState({
    email: "",
    password: "",
  });

  const setVal = (e) => {
    const { name, value } = e.target;

    setInpVal({
      ...inpVal,
      [name]: value,
    });
  };
  console.log(inpVal);

  const userRegister = async (e) => {
    e.preventDefault();

    const { email, password } = inpVal;

    if (email === "") {
      alert("please Enter Email");
    } else if (!email.includes("@")) {
      alert("Invalid EMail");
    } else if (password === "") {
      alert("Enter Password");
    } else if (password.length < 6) {
      alert(`Password must be at least 6 characters`);
    } else {
      console.log("login");

      const data = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const res = await data.json();
      // console.log(res);

      if (res.status === 202) {
        console.log(res);
        localStorage.setItem("userDataToken", res.result.token);
        alert("User login Successfully done");
        history("/dash");
        setInpVal({
          ...inpVal,
          email: "",
          password: "",
        });
      }
    }
  };

  return (
    <>
      <div className="register">
        <h1 className="text-danger">Welcome to Login</h1>
        <br />
        <div className="form">
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={inpVal.email}
            onChange={setVal}
            placeholder="Enter here...."
          />
        </div>
        <br />
        <div className="form">
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            name="password"
            value={inpVal.password}
            onChange={setVal}
            placeholder="Enter here...."
          />
        </div>
        <br />
        <div className="form">
          <button onClick={userRegister} className="btn btn-primary">
            Login
          </button>
        </div>
        <br />
        <div className="form">
          <p>
            Have not Account? <NavLink to={"/"}>Register</NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
