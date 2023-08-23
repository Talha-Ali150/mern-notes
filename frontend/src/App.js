import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Landing from "./components/Landing";
import Notes from "./components/Notes";
import CustomNavbar from "./components/CustomNavbar";
import AddNote from "./components/AddNote";
import EditNote from "./components/EditNote";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  console.log(search);
  return (
    <div className="App">
      <CustomNavbar setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notes" element={<Notes search={search} />} />
        <Route path="/createNote" element={<AddNote />} />
        <Route path="/notes/:id" element={<EditNote />} />
      </Routes>
    </div>
  );
}

export default App;
