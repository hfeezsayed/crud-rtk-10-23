import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, showUser } from "../features/userDetailSlice";
import CustomModal from "./CustomModal";
import { Link } from "react-router-dom";

const Read = () => {
  const dispatch = useDispatch();

  const [id, setId] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [radioFilterData, setRadioFilterData] = useState("");

  const { users, loading, searchData } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(showUser());
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      {showPopup && (
        <CustomModal
          id={id}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
        />
      )}
      <h2 className="text-center my-3">All User Data</h2>
      <div className="d-flex justify-content-center">
        <div className="form-check">
          <label className="form-check-label">
            <input
              className="form-check-input"
              name="gender"
              type="radio"
              value=""
              checked={radioFilterData === ""}
              onChange={(e) => setRadioFilterData(e.target.value)}
            />
            All
          </label>
        </div>
        <div className="form-check mx-3">
          <label className="form-check-label">
            <input
              className="form-check-input"
              name="gender"
              type="radio"
              value="Male"
              checked={radioFilterData === "Male"}
              onChange={(e) => setRadioFilterData(e.target.value)}
            />
            Male
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label">
            <input
              className="form-check-input"
              name="gender"
              type="radio"
              value="Female"
              checked={radioFilterData === "Female"}
              onChange={(e) => setRadioFilterData(e.target.value)}
            />
            Female
          </label>
        </div>
      </div>
      <table className="table table-success table-striped mt-4 w-75 mx-auto text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users
              .filter((user) => {
                if (user.length === 0) {
                  return user;
                } else {
                  return user.name
                    .toLowerCase()
                    .includes(searchData.toLowerCase());
                }
              })
              .filter((user) => {
                if (radioFilterData === "Male") {
                  return user.gender === radioFilterData;
                } else if (radioFilterData === "Female") {
                  return user.gender === radioFilterData;
                } else {
                  return user;
                }
              })
              .map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.gender}</td>
                    <td>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => [setId(user.id), setShowPopup(true)]}
                      >
                        View
                      </button>
                      <Link
                        to={`/edit/${user.id}`}
                        className="btn btn-primary btn-sm mx-3"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => dispatch(deleteUser(user.id))}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
};

export default Read;
