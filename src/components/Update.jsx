import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../features/userDetailSlice";

const Update = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updateData, setUpdateData] = useState();

  const { users, loading } = useSelector((state) => state.app);

  useEffect(() => {
    if (id) {
      const singleUser = users.filter((user) => user.id === id);
      setUpdateData(singleUser[0]);
    }
  }, []);

  const onChangeHandle = (e) => {
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser(updateData));
    navigate("/read");
  };

  return (
    <div className="container">
      <h2 className="text-center my-2">Edit the information</h2>
      <div className="card text-bg-danger w-25 mt-4 mx-auto">
        <div className="p-3">
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="enter name..."
                value={updateData && updateData.name}
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
                value={updateData && updateData.email}
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
                value={updateData && updateData.age}
                onChange={onChangeHandle}
              />
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                name="gender"
                type="radio"
                value="Male"
                checked={updateData && updateData.gender === "Male"}
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
                checked={updateData && updateData.gender === "Female"}
                onChange={onChangeHandle}
              />
              <label className="form-check-label">Female</label>
            </div>
            <button className="btn btn-warning mt-2">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update;
