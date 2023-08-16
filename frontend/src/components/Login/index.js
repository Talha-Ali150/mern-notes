import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import CustomBtn from "../CustomBtn/index";
import axios from "axios";
import CustomSpinner from "../Spinner";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("userData", JSON.stringify(data));
      console.log("success");
      navigate("/notes");
      setLoading(false);
      setError(false);
    } catch (e) {
      setLoading(false);
      setError("invalid username or password");
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
