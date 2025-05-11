import React from "react";

function Footer() {
  return (
    <footer className="bg-light text-center text-muted py-3 mt-auto border-top">
      {/* Container principal do rodapé */}
      <div className="container">
        <small>
          &copy; {new Date().getFullYear()} Folga Finder — Projeto usando{" "}
          <a href="https://date.nager.at" target="_blank" rel="noopener noreferrer">
            Nager.Date API
          </a>
        </small>
      </div>
    </footer>
  );
}

export default Footer;
