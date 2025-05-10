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

  const handleUpcoming = () => {
    if (!selectedCountry) return;
    navigate(`/proximos/${selectedCountry}`);
  };

  const handleLongWeekends = () => {
    if (!selectedCountry || !selectedYear) return;
    navigate(`/feriadoes/${selectedCountry}/${selectedYear}`);
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

        <div className="d-flex gap-2">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!selectedCountry}
          >
            Ver todos os feriados
          </button>

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleUpcoming}
            disabled={!selectedCountry}
          >
            Ver próximos feriados
          </button>

          <button
            type="button"
            className="btn btn-outline-info"
            onClick={handleLongWeekends}
            disabled={!selectedCountry}
          >
            Ver feriados prolongados
          </button>
        </div>
      </form>
    </div>
  );
}

export default Home;
