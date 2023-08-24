import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../features/userLoginSlice";
import { useNavigate } from "react-router-dom";
import { resetNotes } from "../../features/NotesSlice";

function LogoutModal() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const userData = useSelector((state) => state.userLogin.userInfo);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const modalFunc = (e) => {
    if (e.target.innerText === "Yes") {
      dispatch(userLogout());
      dispatch(resetNotes());
      setShow(false);
      navigate("/");
    } else {
      setShow(false);
    }
  };

  return (
    <>
      {userData && (
        <p className="my-0  text-dark" variant="light" onClick={handleShow}>
          Logout
        </p>
      )}

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Out Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modalFunc}>
            No
          </Button>
          <Button variant="primary" onClick={modalFunc}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LogoutModal;
