import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Landing from "./components/Landing";
import Notes from "./components/Notes";
import CustomNavbar from "./components/CustomNavbar";

function App() {
  return (
    <div className="App">
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </div>
  );
}

export default App;
