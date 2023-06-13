import React from "react";
import styles from "./Nav.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";

const Nav = (props) => {
  const { onSearch } = props;
  return (
    <div>
      <Link to="/home">
        <button>Home</button>
      </Link>
      <Link to="/about">
        <button>About</button>
      </Link>
      <Link to="/Favorites">
        <button>Favorites</button>
      </Link>

      <SearchBar onSearch={onSearch} />
    </div>
  );
};

export default Nav;
