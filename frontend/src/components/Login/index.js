import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import CustomBtn from "../CustomBtn/index";
import axios from "axios";
import CustomSpinner from "../Spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  userLoginFailure,
  userLoginRequest,
  userLoginResponse,
} from "../../features/userLoginSlice";

function Login() {
  const loading = useSelector((state) => state.userLogin.loading);
  const error = useSelector((state) => state.userLogin.error);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(userLoginRequest());
    const { email, password } = values;
    try {
      const { data } = await axios.post(
        "https://mern-notes-ten.vercel.app/api/users/login",
        {
          email,
          password,
        }
      );
      console.log("success");
      navigate("/notes");
      dispatch(
        userLoginResponse({
          email: email,
          name: data.name,
          token: data.token,
        })
      );
    } catch (e) {
      dispatch(userLoginFailure("Invalid username or password"));
      console.log(e);
    }
  };
  return (
    <div className="container" style={{ width: "50%" }}>
      <h1 className="text-center my-3">LOGIN</h1>
      {loading && <CustomSpinner />}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>User Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={values.email}
            onChange={(event) =>
              setValues({ ...values, email: event.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>User Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={values.password}
            onChange={(event) =>
              setValues({ ...values, password: event.target.value })
            }
          />
        </Form.Group>
        <CustomBtn func={handleSubmit} text="Log In" />
      </Form>
    </div>
  );
}

export default Login;
