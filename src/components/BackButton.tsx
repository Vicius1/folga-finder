import React from "react";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  return (
    // Botão de voltar que chama a função de navegação para voltar uma página na história
    <button
      onClick={() => navigate(-1)}
      className="btn btn-outline-secondary btn-sm mb-3"
    >
      ← Voltar
    </button>
  );
}

export default BackButton;
