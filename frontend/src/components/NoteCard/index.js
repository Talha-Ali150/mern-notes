// import React from "react";
// import Card from "react-bootstrap/Card";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

// function NoteCard(props) {
//   return (
//     <Card bg="dark" text="white" className="mb-2">
//       <Card.Body className="d-flex justify-content-between align-items-center">
//         <div>
//           <Card.Title>{props.category}</Card.Title>
//           <Card.Text>{props.content}</Card.Text>
//         </div>
//         <div>
//           <AiOutlineEdit onClick={props.editFunc} className="me-2" />
//           <AiOutlineDelete onClick={props.deleteFunc} />
//         </div>
//       </Card.Body>
//     </Card>
//   );
// }

// export default NoteCard;

import React from "react";

export default function NoteCard(props) {
  return (
    <div className="card my-3">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.content}</p>
        </div>
        <div>
          <AiOutlineEdit onClick={props.editFunc} className="mx-2" />
          <AiOutlineDelete onClick={props.deleteFunc} />
        </div>
      </div>
    </div>
  );
}
