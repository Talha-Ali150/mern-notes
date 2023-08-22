import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllNotes } from "../../features/getNoteSlice";
import NoteCard from "../NoteCard/index";
import { useNavigate } from "react-router-dom";
import CustomBtn from "../CustomBtn";

function NotesList() {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.getNote.notes);
  const status = useSelector((state) => state.getNote.status);
  const userInfo = useSelector((state) => state.userLogin.userInfo); // Adjust this selector
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo.token) {
      dispatch(fetchAllNotes(userInfo.token));
    }
  }, [dispatch, userInfo.token]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: Unable to fetch notes.</div>;
  }

  // if (status === "succeeded") {
  //   return (notes.map((item) => {
  //     return (
  //       <div className="container">
  //         <NoteCard
  //           key={item._id}
  //           editFunc={() => navigate(`/notes/${item.id}`)}
  //           category={item.category}
  //           content={item.content}
  //         />
  //       </div>
  //     )
  //   })

  //   {status === "succeeded" && <CustomBtn text="Create Note" func={() => navigate("/createNote")} />})
  // }

  return (
    <div>
      {status === "succeeded" && (
        <div className="container">
          {notes &&
            notes.map((item) => {
              return (
                <NoteCard
                  key={item._id}
                  editFunc={() => navigate(`/notes/${item.id}`)}
                  category={item.category}
                  content={item.content}
                />
              );
            })}
          <CustomBtn
            text="create new note"
            func={() => navigate("/createNote")}
          />
        </div>
      )}
    </div>
  );
}
export default NotesList;
