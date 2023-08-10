import React, { useEffect, useState } from "react";
import NoteCard from "../NoteCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Notes() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const response = await axios.get("http://localhost:5000/api/notes");
    setNotes(response.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="container">
      {notes.map((item) => {
        return (
          <NoteCard
            key={item.id}
            editFunc={() => navigate(`/notes/${item.id}`)}
            category={item.category}
            content={item.content}
          />
        );
      })}
    </div>
  );
}
