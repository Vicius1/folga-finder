import React, { useState } from "react";
import CountrySelector from "../components/CountrySelector";
import { useNavigate } from "react-router-dom";
import "../styles/main.scss";

function Home() {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCountry || !selectedYear) return;

    navigate(`/feriados/${selectedCountry}/${selectedYear}`);
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Folga Finder</h1>
      <p className="lead">Veja os feriados do seu país em um clique!</p>

      <form onSubmit={handleSubmit} className="mt-4">
        <CountrySelector selected={selectedCountry} onChange={setSelectedCountry} />

        <div className="mb-3">
          <label htmlFor="year-input" className="form-label">Ano:</label>
          <input
            type="number"
            id="year-input"
            className="form-control"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            min={1900}
            max={2100}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Ver feriados
        </button>
      </form>
    </div>
  );
}

export default Home;
