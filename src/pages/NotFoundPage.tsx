// src/pages/NotFoundPage.tsx
import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="container py-5 text-center">
      <h1 className="display-4">404</h1>
      <p className="lead">Ops! Página não encontrada.</p>
      <Link to="/" className="btn btn-primary mt-3">
        Voltar para a Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
