import React from "react";
import "./customModal.css";
import { useSelector } from "react-redux";

const CustomModal = ({ id, showPopup, setShowPopup }) => {
  const allUsersCount = useSelector((state) => state.app.users);

  const singleUser = allUsersCount.filter((user) => user.id === id);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button
          className="btn btn-xs btn-danger"
          onClick={() => setShowPopup(!showPopup)}
        >
          X
        </button>
        <div className="modal-body p-4">
          <h6>
            Name: <span className="text-danger">{singleUser[0].name}</span>
          </h6>
          <h6>
            Email: <span className="text-danger">{singleUser[0].email}</span>
          </h6>
          <h6>
            Age: <span className="text-danger">{singleUser[0].age}</span>
          </h6>
          <h6>
            Gender: <span className="text-danger">{singleUser[0].gender}</span>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
