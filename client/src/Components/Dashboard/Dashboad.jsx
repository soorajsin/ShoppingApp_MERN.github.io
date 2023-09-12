import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ContextNavigate } from "../ContextProvider/Context";

const Dashboad = () => {
  const {  setUserData } = useContext(ContextNavigate);
    // console.log(userdata);

  const history = useNavigate();

  const dashfetchData = async () => {
    const token = await localStorage.getItem("userDataToken");
    //     console.log(token);

    const data = await fetch("http://localhost:4000/validUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const res = await data.json();
    //     console.log(res);

    if (res.status === 205) {
      // console.log(res);
      setUserData(res);
      // history("/home");
    } else {
      console.log("userData not found");
      history("*");
    }
  };

  useEffect(() => {
    dashfetchData();
  });

  return (
    <>
      <div className="dash">
      
      </div>
    </>
  );
};

export default Dashboad;
