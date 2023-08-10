import React from "react";
import CustomBtn from "../CustomBtn";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="container d-flex justify-content-center my-3">
        <h1 className="text-center">My Notes App</h1>
      </div>
      <div className="container d-flex justify-content-center">
        <CustomBtn func={() => navigate("/login")} text="Login In" />
        <CustomBtn func={() => navigate("/signup")} text="Sign Up" />
      </div>
    </div>
  );
}
