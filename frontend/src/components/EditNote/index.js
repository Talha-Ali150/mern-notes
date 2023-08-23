import React, { useEffect, useState } from "react";
import CustomBtn from "../CustomBtn";
import Alert from "react-bootstrap/Alert";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { editNote } from "../../features/NotesSlice";

export default function UpdateNote() {
  const id = useParams().id;
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const status = useSelector((state) => state.notes.editStatus);
  const [values, setValues] = useState({ title: "", content: "" });
  const [noToken, setNoToken] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetching = async () => {
      if (!userInfo || !userInfo.token || !id) {
        setNoToken(true);
      } else {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.get(
          `https://mern-notes-ten.vercel.app/api/notes/${id}`,
          config
        );
        setValues((prevValues) => ({
          ...prevValues,
          title: data.title,
          content: data.content,
        }));
      }
    };

    fetching();
  }, [id, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await axios.put(
        `https://mern-notes-ten.vercel.app/api/notes/${id}`,
        { title: values.title, content: values.content },
        config
      );
      const { data } = response;
      const { title, content } = data;
      dispatch(
        editNote({ userInfo: userInfo, id: id, newNote: { title, content } })
      );
      resetFields();
    } catch (error) {
      console.error("Error updating note:", error.message);
    }
  };

  const resetFields = () => {
    setValues({ title: "", content: "" });
  };

  return (
    <div className="container">
      {noToken ? (
        <Alert variant="danger">Please Log In to edit note</Alert>
      ) : (
        <div className="container">
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
                  setValues((prevValues) => ({
                    ...prevValues,
                    title: event.target.value,
                  }))
                }
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                CONTENT
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                value={values.content}
                onChange={(event) =>
                  setValues((prevValues) => ({
                    ...prevValues,
                    content: event.target.value,
                  }))
                }
              ></textarea>
            </div>
            <CustomBtn type="submit" text="Update Note" />
          </form>
          {status === "loading" && <Alert variant="primary">Loading...</Alert>}
          {status === "failed" && (
            <Alert variant="warning">Error: Unable to edit Note.</Alert>
          )}
          {status === "succeeded" && (
            <Alert variant="success">Successfully edited note.</Alert>
          )}
        </div>
      )}
    </div>
  );
}
