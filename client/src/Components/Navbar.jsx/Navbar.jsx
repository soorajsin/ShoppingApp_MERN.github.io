import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
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
                  logo
                </NavLink>
              </button>
            </div>
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
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default Navbar;
