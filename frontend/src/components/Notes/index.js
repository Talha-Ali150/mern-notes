import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllNotes } from "../../features/NotesSlice";
import { deleteNote } from "../../features/NotesSlice";
import NoteCard from "../NoteCard/index";
import { useNavigate } from "react-router-dom";
import CustomBtn from "../CustomBtn";
import Alert from "react-bootstrap/Alert";

function NotesList({ search }) {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const status = useSelector((state) => state.notes.fetchStatus);
  const deleteStatus = useSelector((state) => state.notes.deleteStatus);

  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const navigate = useNavigate();

  try {
    useEffect(() => {
      if (userInfo && userInfo.token) {
        dispatch(fetchAllNotes(userInfo.token));
      }
    }, [dispatch, userInfo, deleteStatus]);
  } catch (e) {
    console.log(e.message);
  }

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <Alert variant="danger">Unable to fetch notes.</Alert>;
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this note")) {
      dispatch(deleteNote({ userInfo: userInfo, id: id }));
    }
  };

  return (
    <div>
      {!userInfo ? (
        <div className="container">
          <Alert variant="danger">Please Log In to fetch Notes</Alert>
        </div>
      ) : (
        status === "succeeded" && (
          <div className="container">
            <CustomBtn
              text="create new note"
              func={() => navigate("/createNote")}
            />
            {notes.length === 0 ? (
              <div className="container">
                <Alert variant="primary">No notes to show, Create new !</Alert>
              </div>
            ) : (
              <div>
                {notes
                  .filter((filteredNote) =>
                    filteredNote.title
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  )
                  .map((item) => (
                    <NoteCard
                      key={item._id}
                      editFunc={() => navigate(`/notes/${item._id}`)}
                      deleteFunc={() => {
                        handleDelete(`${item._id}`);
                      }}
                      title={item.title}
                      content={item.content}
                    />
                  ))}
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
}
export default NotesList;
