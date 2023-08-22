import React, { useState } from "react";
import CustomBtn from "../CustomBtn";
import { useDispatch, useSelector } from "react-redux";
import { addNote } from "../../features/NotesSlice";
import Alert from "react-bootstrap/Alert";

function AddNote() {
  const [values, setValues] = useState({ title: "", content: "" });
  const dispatch = useDispatch();
  const status = useSelector((state) => state.notes.addStatus);
  const userInfo = useSelector((state) => state.userLogin.userInfo);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInfo.token) {
      dispatch(addNote({ userInfo: userInfo, newNote: values }));
      resetFields();
    }
  };

  const resetFields = () => {
    setValues({ title: "", content: "" });
  };

  return (
    <div className="container">
      {!userInfo && <Alert variant="danger">Please Log In to add note</Alert>}
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

      {status === "loading" && <div>Loading...</div>}
      {status === "failed" && <div>Error: Unable to add Note.</div>}
      {status === "succeeded" && <div>Successfully added note.</div>}
    </div>
  );
}

export default AddNote;
