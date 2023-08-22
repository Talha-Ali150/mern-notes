// import React, { useState } from "react";
// import CustomBtn from "../CustomBtn";
// import { useDispatch, useSelector } from "react-redux";
// import { addNote } from "../../features/noteSlice";

// function AddNote() {
//   const [values, setValues] = useState({ title: "", content: "" });
//   const dispatch = useDispatch();
//   const userInfo = useSelector((state) => state.userLogin.userInfo);
//   console.log(userInfo);
//   const status = useSelector((state) => state.userNote.status);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (userInfo.token) {
//       dispatch(addNote({ token: userInfo.token, newNote: values }));
//       resetFields();
//     }
//   };

//   const resetFields = () => {
//     setValues({ title: "", content: "" });
//     console.log(values);
//   };

//   if (status === "loading") {
//     return <div>Loading...</div>;
//   }

//   if (status === "failed") {
//     return <div>Error: Unable to add Note.</div>;
//   }

//   if (status === "succeeded") {
//     alert("Successfully added note.");
//   }

//   return (
//     <div className="container">
//       <div className="mb-3">
//         <label htmlFor="exampleFormControlInput1" className="form-label">
//           TITLE
//         </label>
//         <input
//           type="text"
//           className="form-control"
//           id="exampleFormControlInput1"
//           placeholder="enter note title"
//           value={values.title}
//           onChange={(event) =>
//             setValues({ ...values, title: event.target.value })
//           }
//         />
//       </div>
//       <div className="mb-3">
//         <label htmlFor="exampleFormControlTextarea1" className="form-label">
//           CONTENT
//         </label>
//         <textarea
//           className="form-control"
//           id="exampleFormControlTextarea1"
//           rows="3"
//           value={values.content}
//           onChange={(event) =>
//             setValues({ ...values, content: event.target.value })
//           }
//         ></textarea>
//       </div>
//       <CustomBtn func={handleSubmit} text="Add Note" />
//     </div>
//   );
// }

// export default AddNote;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllNotes } from "../../features/noteSlice";
// import NoteCard from "../NoteCard/index";
// import { useNavigate } from "react-router-dom";

// function NotesList() {
//   const dispatch = useDispatch();
//   const notes = useSelector((state) => state.userNote.notes);
//   const status = useSelector((state) => state.userNote.status);
//   const userInfo = useSelector((state) => state.userLogin.userInfo); // Adjust this selector
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (userInfo.token) {
//       dispatch(fetchAllNotes(userInfo.token));
//     }
//   }, [dispatch, userInfo.token]);

//   if (status === "loading") {
//     return <div>Loading...</div>;
//   }

//   if (status === "failed") {
//     return <div>Error: Unable to fetch notes.</div>;
//   }

//   if (status === "succeeded") {
//     return notes.map((item) => {
//       return (
//         <div className="container">
//           <NoteCard
//             key={item._id}
//             editFunc={() => navigate(`/notes/${item.id}`)}
//             category={item.category}
//             content={item.content}
//           />
//         </div>
//       );
//     });
//   }
// }

// export default NotesList;

import React, { useState } from "react";
import CustomBtn from "../CustomBtn";
import { useDispatch, useSelector } from "react-redux";
import { addNote } from "../../features/addNoteSlice";

function AddNote() {
  const [values, setValues] = useState({ title: "", content: "" });
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const status = useSelector((state) => state.getNote.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInfo.token) {
      dispatch(addNote({ token: userInfo.token, newNote: values }));
      resetFields();
    }
  };

  const resetFields = () => {
    setValues({ title: "", content: "" });
  };

  return (
    <div className="container">
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
      <CustomBtn func={handleSubmit} text="Add Note" />
      {status === "loading" && <div>Loading...</div>}
      {status === "failed" && <div>Error: Unable to add Note.</div>}
      {status === "succeeded" && <div>Successfully added note.</div>}
    </div>
  );
}

export default AddNote;
