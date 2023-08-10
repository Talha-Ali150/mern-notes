import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import CustomBtn from "../CustomBtn/index";

function Registration(props) {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/notes");
  };
  return (
    <div className="container" style={{ width: "50%" }}>
      <h1 className="text-center my-3">{props.heading}</h1>
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
            placeholder="Enter Email"
            value={values.email}
            onChange={(event) =>
              setValues({ ...values, email: event.target.value })
            }
          />
        </Form.Group>
        <CustomBtn func={() => handleSubmit} text={props.btnText} />
      </Form>
    </div>
  );
}

export default Registration;
