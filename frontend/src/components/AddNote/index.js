import React, { useState } from "react";
import CustomBtn from "../CustomBtn";
import { useDispatch, useSelector } from "react-redux";
import { addNote, resetAddStatus } from "../../features/NotesSlice";
import Alert from "react-bootstrap/Alert";

function AddNote() {
  const [values, setValues] = useState({ title: "", content: "" });
  const dispatch = useDispatch();
  const status = useSelector((state) => state.notes.addStatus);
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (userInfo.token) {
        if (values.content === "" || values.title === "") {
          setError(true);
        } else {
          dispatch(addNote({ userInfo: userInfo, newNote: values }));
          setTimeout(() => {
            dispatch(resetAddStatus());
          }, 3000);
          resetFields();
          setError(false);
        }
      }
    } catch (e) {
      console.log("e", e.message);
    }
  };

  const resetFields = () => {
    setValues({ title: "", content: "" });
  };

  return (
    <div className="container">
      {!userInfo && <Alert variant="danger">Please Log In to add note</Alert>}
      {error && (
        <div className="container">
          <Alert variant="warning">please fill both the fields</Alert>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            TITLE
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="enter note title"
            value={values.title}
            onChange={(event) =>
              setValues({ ...values, title: event.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            CONTENT
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            value={values.content}
            onChange={(event) =>
              setValues({ ...values, content: event.target.value })
            }
          ></textarea>
        </div>
        {userInfo && <CustomBtn type="submit" text="Add Note" />}
      </form>

      {status === "loading" && (
        <div className="container">
          <Alert variant="primary"> Loading... </Alert>
        </div>
      )}
      {status === "failed" && (
        <div className="container">
          <Alert variant="danger"> Error: Unable to add Note. </Alert>
        </div>
      )}
      {status === "succeeded" && (
        <div className="container">
          <Alert variant="success">Successfully added note. </Alert>
        </div>
      )}
    </div>
  );
}

export default AddNote;
