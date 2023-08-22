import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllNotes } from "../../features/NotesSlice";
import NoteCard from "../NoteCard/index";
import { useNavigate } from "react-router-dom";
import CustomBtn from "../CustomBtn";
import Alert from "react-bootstrap/Alert";

function NotesList() {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const status = useSelector((state) => state.notes.fetchStatus);
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const navigate = useNavigate();

  try {
    useEffect(() => {
      if (userInfo && userInfo.token) {
        dispatch(fetchAllNotes(userInfo.token));
      }
    }, [dispatch, userInfo]);
  } catch (e) {
    return (
      <div className="container">
        <Alert variant="danger">Please Log In to fetch notes</Alert>
      </div>
    );
  }

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <Alert variant="danger">Unable to fetch notes.</Alert>;
  }

  return (
    <div>
      {!userInfo ? (
        <div className="container">
          <Alert variant="danger">Please Log In to fetch Notes</Alert>
        </div>
      ) : (
        status === "succeeded" && (
          <div className="container">
            {notes &&
              notes.map((item) => (
                <NoteCard
                  key={item._id}
                  editFunc={() => navigate(`/notes/${item._id}`)}
                  category={item.category}
                  content={item.content}
                />
              ))}
            <CustomBtn
              text="create new note"
              func={() => navigate("/createNote")}
            />
          </div>
        )
      )}
    </div>
  );
}
export default NotesList;
