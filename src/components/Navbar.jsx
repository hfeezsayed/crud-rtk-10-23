import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { searchUser } from "../features/userDetailSlice";

const Navbar = () => {
  const allUsersCount = useSelector((state) => state.app.users);

  const dispatch = useDispatch();

  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    dispatch(searchUser(searchData));
  }, [searchData]);

  return (
    <nav className="navbar navbar-expand-lg text-bg-danger">
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/">
          <h4>RTK</h4>
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active text-white"
                aria-current="page"
                to="/"
              >
                Create User
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/read">
                All User Data({allUsersCount.length})
              </Link>
            </li>
          </ul>
          <form className="d-flex w-25" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => setSearchData(e.target.value)}
            />
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
