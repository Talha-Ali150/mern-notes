import React from "react";

export default function CustomBtn(props) {
  return (
    <button onClick={props.func} className="btn btn-outline-primary mx-3">
      {props.text}
    </button>
  );
}
