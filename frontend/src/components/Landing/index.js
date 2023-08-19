import React from "react";
import CustomBtn from "../CustomBtn";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AddNote from "../AddNote";
import UpdateNote from "../EditNote";

export default function Landing() {
  const userData = useSelector((state) => state.userLogin.userInfo);
  const navigate = useNavigate();
  return (
    <div>
      <div className="container d-flex justify-content-center my-3">
        <h1 className="text-center">My Notes App</h1>
      </div>
      <div className="container d-flex justify-content-center">
        {!userData && (
          <CustomBtn func={() => navigate("/login")} text="Log In" />
        )}
        <CustomBtn func={() => navigate("/signup")} text="Sign Up" />
      </div>

      <div className="container">
        <AddNote />
        <UpdateNote />
      </div>
    </div>
  );
}
