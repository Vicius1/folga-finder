import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      {/* Container centraliza o conteúdo da navbar */}
      <div className="container justify-content-center">
        <Link className="navbar-brand fs-4" to="/">
          <img
            src={logo}
            alt="Folga Finder"
            height="50"
            className="d-inline-block align-middle"
          />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
