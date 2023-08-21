// import React, { useEffect, useState } from "react";
// import NoteCard from "../NoteCard";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Notes() {
//   const navigate = useNavigate();
//   const [notes, setNotes] = useState([]);

//   const fetchNotes = async () => {
//     const response = await axios.get("http://localhost:5000/api/notes");
//     setNotes(response.data);
//   };

//   useEffect(() => {
//     fetchNotes();
//   }, []);

//   return (
//     <div className="container">
//       {notes.map((item) => {
//         return (
//           <NoteCard
//             key={item.id}
//             editFunc={() => navigate(`/notes/${item.id}`)}
//             category={item.category}
//             content={item.content}
//           />
//         );
//       })}
//     </div>
//   );
// }

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { listNotes } from "../../features/noteSlice";

// function NotesList() {
//   const dispatch = useDispatch();
//   const notes = useSelector((state) => state.userNote.notes);
//   const status = useSelector((state) => state.userNote.status);

//   useEffect(() => {
//     dispatch(listNotes());
//   }, [dispatch]);

//   if (status === "loading") {
//     return <div>Loading...</div>;
//   }

//   if (status === "failed") {
//     return <div>Error: Unable to fetch notes.</div>;
//   }

//   return (
//     <ul>{notes && notes.map((note) => <li key={note.id}>{note.title}</li>)}</ul>
//   );
// }

// export default NotesList;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllNotes } from "../../features/noteSlice";

// function NotesList() {
//   const dispatch = useDispatch();
//   const notes = useSelector((state) => state.userNote.notes);
//   const status = useSelector((state) => state.userNote.status);
//   const userInfo = useSelector((state) => state.userLogin.userInfo); // Adjust this selector

//   console.log(userInfo);

//   useEffect(() => {
//     if (userInfo) {
//       dispatch(fetchAllNotes(userInfo.token));
//     }
//   }, [dispatch, userInfo]);

//   if (status === "loading") {
//     return <div>Loading...</div>;
//   }

//   if (status === "failed") {
//     return <div>Error: Unable to fetch notes.</div>;
//   }

//   return (
//     <ul>{notes && notes.map((note) => <li key={note.id}>{note.title}</li>)}</ul>
//   );
// }

// export default NotesList;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllNotes } from "../../features/noteSlice";

function NotesList() {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.userNote.notes);
  const status = useSelector((state) => state.userNote.status);
  const userInfo = useSelector((state) => state.userLogin.userInfo); // Adjust this selector

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

  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>{note.title}</li>
      ))}
    </ul>
  );
}

export default NotesList;
