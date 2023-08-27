import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import CustomBtn from "../CustomBtn/index";
import axios from "axios";
import CustomSpinner from "../Spinner";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    pic: "https://cdn-icons-png.flaticon.com/512/847/847969.png?w=360&t=st=1691752333~exp=1691752933~hmac=49e517354d0f015b7632af5b95093ff9765104dc66369e4eb6c8b235c911225e",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [registered, setRegistered] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, pic } = values;

    if (!name || !email || !password) {
      setError("Please fill all the fields");
    } else if (password !== confirmPassword) {
      setError("Passwords are different");
    } else {
      setLoading(true);
      try {
        await axios.post("https://mern-notes-ten.vercel.app/api/users", {
          name,
          email,
          password,
          pic,
        });
        setError(false);
        setRegistered(true); // Add this line to set a state for registration success
      } catch (e) {
        setError(e.response.data);
      } finally {
        setLoading(false);
      }
    }
  };

  const uploadImage = async (pic) => {
    if (!pic) {
      setError("Please select an image");
      return;
    }

    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "mern-notes");
      data.append("cloud_name", "mern-notes");
      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/mern-notes/image/upload",
          {
            method: "POST",
            body: data,
          }
        );
        const myData = await response.json();
        const { url } = myData;
        console.log(url);
        setValues({ ...values, pic: url });
      } catch (e) {
        console.log("Cloudinary error:", e);
      }
    } else {
      setError("Please select a valid image (JPEG or PNG)");
    }
  };

  useEffect(() => {
    if (registered) {
      navigate("../login");
    }
  }, [registered, navigate]);

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
            onChange={(event) => uploadImage(event.target.files[0])}
          />
        </Form.Group>
        <CustomBtn func={handleSubmit} text="Sign Up" />
      </Form>
    </div>
  );
}

export default Signup;
