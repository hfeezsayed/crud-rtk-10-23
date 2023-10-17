import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../features/userDetailSlice";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [users, setUsers] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeHandle = (e) => {
    setUsers({
      ...users,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(users));
    navigate("/read");
  };

  return (
    <div className="container">
      <h2 className="text-center my-2">Please fill the information</h2>
      <div className="card text-bg-danger w-25 mt-4 mx-auto">
        <div className="p-3">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="enter name..."
                onChange={onChangeHandle}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="text"
                name="email"
                className="form-control"
                placeholder="enter email..."
                onChange={onChangeHandle}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Age</label>
              <input
                type="text"
                name="age"
                className="form-control"
                placeholder="enter age..."
                onChange={onChangeHandle}
              />
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                name="gender"
                type="radio"
                value="Male"
                onChange={onChangeHandle}
              />
              <label className="form-check-label">Male</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                name="gender"
                type="radio"
                value="Female"
                onChange={onChangeHandle}
              />
              <label className="form-check-label">Female</label>
            </div>
            <button className="btn btn-warning mt-2">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
