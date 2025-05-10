import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container justify-content-center">
        <Link className="navbar-brand fs-4" to="/">
          Folga Finder
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
