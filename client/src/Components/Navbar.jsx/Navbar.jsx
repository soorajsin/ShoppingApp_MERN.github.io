import React, { useContext, useEffect } from "react";
import { AppBar, Avatar, Toolbar } from "@mui/material";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { deepOrange } from "@mui/material/colors";
import { ContextNavigate } from "../ContextProvider/Context";

const Navbar = () => {
  // const history = useNavigate();

  const { userdata, setUserData } = useContext(ContextNavigate);
  // console.log(userdata);

  const navbarFetchData = async () => {
    const token = await localStorage.getItem("userDataToken");
    // console.log(token);

    const data = await fetch("http://localhost:4000/validUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const res = await data.json();
    // console.log(res);

    if (res.status === 205) {
      // console.log(res);
      setUserData(res);
    } else {
      console.log("user not found");
    }
  };

  useEffect(() => {
    navbarFetchData();
  });

  return (
    <>
      <div className="navbar">
        <AppBar>
          <Toolbar>
            <div className="tab-logo">
              <button className="btn btn-primary">
                <NavLink
                  style={{ color: "#fff", textDecoration: "none" }}
                  to={"/dash"}
                >
                  Home
                </NavLink>
              </button>
            </div>
            <div className="container">
              <div className="tab">
                <button className="btn btn-primary">
                  <NavLink
                    style={{ color: "#fff", textDecoration: "none" }}
                    to={"/login"}
                  >
                    Login
                  </NavLink>
                </button>
              </div>
              <div className="tab">
                <button className="btn btn-primary">
                  <NavLink
                    style={{ color: "#fff", textDecoration: "none" }}
                    to={"/cart"}
                  >
                    Cart
                  </NavLink>
                </button>
              </div>
              <div className="tab">
                <button className="btn btn-primary">
                  <NavLink
                    style={{ color: "#fff", textDecoration: "none" }}
                    to={"/cart"}
                  >
                    <Avatar sx={{ bgcolor: deepOrange[500], fontSize: "30px" }}>
                      {userdata
                        ? userdata.getData.email.charAt(0).toUpperCase()
                        : "S"}
                    </Avatar>
                  </NavLink>
                </button>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default Navbar;
