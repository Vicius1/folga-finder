import React from 'react';
import { Routes, Route } from "react-router-dom";

// Páginas principais da aplicação
import Home from "./pages/Home";
import HolidaysPage from "./pages/HolidaysPage";
import UpcomingHolidaysPage from "./pages/UpcomingHolidaysPage";
import LongWeekendsPage from "./pages/LongWeekendsPage";
import NotFoundPage from "./pages/NotFoundPage";

// Componentes reutilizáveis
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Estilos globais SCSS
import "./styles/main.scss";

/**
 * Define a estrutura da aplicação, incluindo a navegação, rodapé e as rotas principais.
 */
function App() {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        {/* Barra de navegação no topo */}
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            {/* Página inicial com seleção de país e ano */}
            <Route path="/" element={<Home />} />

            {/* Página que exibe todos os feriados de um país em um ano específico */}
            <Route path="/feriados/:countryCode/:year" element={<HolidaysPage />} />

            {/* Página que mostra os próximos feriados do país selecionado */}
            <Route path="/proximos/:countryCode" element={<UpcomingHolidaysPage />} />

            {/* Página que lista os feriados prolongados ("feriadões") */}
            <Route path="/feriadoes/:countryCode/:year" element={<LongWeekendsPage />} />
            
            {/* Rota coringa para exibir uma página 404 quando a URL não é reconhecida */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        {/* Rodapé fixado ao fim da tela */}
        <Footer />
      </div>
    </>
  );
}

export default App;
