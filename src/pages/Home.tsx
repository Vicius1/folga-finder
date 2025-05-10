import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CountrySelector from "../components/CountrySelector";
import "../styles/main.scss";
import { Country } from "../types";

function Home() {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [countries, setCountries] = useState<Country[]>([]);

  const navigate = useNavigate();

  // Função que irá ser chamada quando os países forem carregados
  const handleCountriesLoaded = (loadedCountries: Country[]) => {
    setCountries(loadedCountries);  // Armazena os países na variável de estado
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCountry || !selectedYear) return;

    const selectedCountryName = countries.find(
      (country) => country.countryCode === selectedCountry
    )?.name;

    navigate(`/feriados/${selectedCountry}/${selectedYear}`, {
      state: { countryName: selectedCountryName },
    });
  };

  const handleUpcoming = () => {
    if (!selectedCountry) return;

    const selectedCountryName = countries.find(
      (country) => country.countryCode === selectedCountry
    )?.name;

    navigate(`/proximos/${selectedCountry}`, {
      state: { countryName: selectedCountryName },
    });
  };

  const handleLongWeekends = () => {
    if (!selectedCountry || !selectedYear) return;

    const selectedCountryName = countries.find(
      (country) => country.countryCode === selectedCountry
    )?.name;

    navigate(`/feriadoes/${selectedCountry}/${selectedYear}`, {
      state: { countryName: selectedCountryName },
    });
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Folga Finder</h1>
      <p className="lead">Veja os feriados do seu país em um clique!</p>

      <form onSubmit={handleSubmit} className="mt-4">
        <CountrySelector
          selected={selectedCountry}
          onChange={setSelectedCountry}
          onCountriesLoaded={handleCountriesLoaded}
        />

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
