// https://api.cloudinary.com/v1_1/drszh0fpd

import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import CustomBtn from "../CustomBtn/index";
import axios from "axios";
import CustomSpinner from "../Spinner";

function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    pic: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, pic } = values;
    setLoading(true);
    if (password !== confirmPassword) {
      setError("passwords are different");
    } else {
      setError(null);
    }
    try {
      const { data } = await axios.post("http://localhost:5000/api/users", {
        name,
        email,
        password,
        pic,
      });
      localStorage.setItem("userData", JSON.stringify(data));
      console.log("success");
      setLoading(false);
      setError(false);
    } catch (e) {
      setLoading(false);
      setError(error.response.data.message);
      console.log(e);
    }
  };
  return (
    <div className="container" style={{ width: "50%" }}>
      <h1 className="text-center my-3">SIGNUP</h1>
      {loading && <CustomSpinner />}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={values.name}
            onChange={(event) =>
              setValues({ ...values, name: event.target.value })
            }
          />
        </Form.Group>

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
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={values.password}
            onChange={(event) =>
              setValues({ ...values, password: event.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={values.confirmPassword}
            onChange={(event) =>
              setValues({ ...values, confirmPassword: event.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control
            type="file"
            placeholder="Upload Profile Picture"
            value={values.pic}
            onChange={(event) =>
              setValues({ ...values, pic: event.target.files[0] })
            }
          />
        </Form.Group>
        <CustomBtn func={handleSubmit} text="Sign Up" />
      </Form>
    </div>
  );
}

export default Signup;
