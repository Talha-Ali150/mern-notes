// import React, { useEffect, useState } from "react";
// import Form from "react-bootstrap/Form";
// import Alert from "react-bootstrap/Alert";
// import axios from "axios";
// import CustomSpinner from "../Spinner";
// import "./profile.css";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import CustomBtn from "../CustomBtn";
// import { updateProfile } from "../../features/userLoginSlice";

// function Profile() {
//   const userInfo = useSelector((state) => state.userLogin.userInfo);
//   const [values, setValues] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     pic: "https://cdn-icons-png.flaticon.com/512/847/847969.png?w=360&t=st=1691752333~exp=1691752933~hmac=49e517354d0f015b7632af5b95093ff9765104dc66369e4eb6c8b235c911225e",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (!userInfo) {
//       navigate("../login");
//     } else {
//       setValues({
//         ...values,
//         name: userInfo.name,
//         email: userInfo.email,
//         pic: userInfo.pic,
//       });
//     }
//   }, [userInfo, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { name, email, password, confirmPassword, pic } = values;

//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//     } else {
//       setError("");
//       setLoading(true);

//       try {
//         dispatch(updateProfile({ userInfo: userInfo }));
//         console.log("Profile update success");
//         setError(false);
//       } catch (error) {
//         setError("An error occurred while updating profile");

//         console.error("Profile update error:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const uploadImage = async (pic) => {
//     if (!pic) {
//       setError("Please select an image");
//       return;
//     }

//     if (pic.type === "image/jpeg" || pic.type === "image/png") {
//       const data = new FormData();
//       data.append("file", pic);
//       data.append("upload_preset", "mern-notes");
//       data.append("cloud_name", "mern-notes");

//       try {
//         setLoading(true);
//         const response = await axios.post(
//           "https://api.cloudinary.com/v1_1/mern-notes/image/upload",
//           data
//         );

//         const { secure_url } = response.data;
//         setValues({ ...values, pic: secure_url });
//         setError("");
//       } catch (error) {
//         setError("An error occurred while uploading the image");
//         console.error("Image upload error:", error);
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       setError("Please select a valid image (JPEG or PNG)");
//     }
//   };

//   return (
//     <div className="container">
//       {loading && <CustomSpinner />}
//       {error && <Alert variant="danger">{error}</Alert>}
//       {!userInfo ? (
//         <Alert variant="danger">Please log in to view profile settings</Alert>
//       ) : (
//         <div className="mainContainer">
//           <Form className="customForm">
//             <Form.Group className="mb-3">
//               <Form.Label>User Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter Name"
//                 value={values.name}
//                 onChange={(event) =>
//                   setValues({ ...values, name: event.target.value })
//                 }
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>User Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter Email"
//                 value={values.email}
//                 onChange={(event) =>
//                   setValues({ ...values, email: event.target.value })
//                 }
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 placeholder="Enter Password"
//                 value={values.password}
//                 onChange={(event) =>
//                   setValues({ ...values, password: event.target.value })
//                 }
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Confirm Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 placeholder="Enter Password"
//                 value={values.confirmPassword}
//                 onChange={(event) =>
//                   setValues({ ...values, confirmPassword: event.target.value })
//                 }
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Profile Picture</Form.Label>
//               <Form.Control
//                 type="file"
//                 placeholder="Upload Profile Picture"
//                 onChange={(event) => uploadImage(event.target.files[0])}
//               />
//             </Form.Group>
//             <CustomBtn text="Update Profile" func={handleSubmit} />
//           </Form>
//           <div className="imgContainer">
//             <img
//               className="customImgStyle"
//               alt="img of user"
//               src={values.pic}
//             ></img>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Profile;
