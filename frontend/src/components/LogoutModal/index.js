import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

function LogoutModal() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [userData, setUserData] = useState("");

  useEffect(() => {
    try {
      setUserData(JSON.parse(localStorage.getItem("userData")));
    } catch (e) {
      setUserData("");
    }
  }, []);

  const modalFunc = (e) => {
    if (e.target.innerText === "Yes") {
      localStorage.removeItem("userData");
      navigate("/");
      setShow(false);
      setUserData("");
    } else {
      setShow(false);
    }
  };

  return (
    <>
      {userData && (
        <p variant="light" onClick={handleShow}>
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
