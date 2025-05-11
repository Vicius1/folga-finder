import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CountrySelector from "../components/CountrySelector";
import CountryCalendar from "../components/CountryCalendar";
import { LuCalendarDays, LuCalendarCheck2, LuCalendarRange } from "react-icons/lu";
import "../styles/main.scss";
import { Country } from "../types";

function Home() {
  // Estado para armazenar o país selecionado pelo usuário
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  // Estado para o ano selecionado, iniciado com o ano atual
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  
  // Lista de países disponíveis, carregada a partir da API
  const [countries, setCountries] = useState<Country[]>([]);

  const navigate = useNavigate();

  // Função que irá ser chamada quando os países forem carregados no componente CountrySelector
  const handleCountriesLoaded = (loadedCountries: Country[]) => {
    setCountries(loadedCountries);
  };

  // Envia o usuário para a rota de feriados normais (por país e ano)
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

  // Envia o usuário para a rota de próximos feriados
  const handleUpcoming = () => {
    if (!selectedCountry) return;

    const selectedCountryName = countries.find(
      (country) => country.countryCode === selectedCountry
    )?.name;

    navigate(`/proximos/${selectedCountry}`, {
      state: { countryName: selectedCountryName },
    });
  };

  // Envia o usuário para a rota de feriados prolongados
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
      <span className="fs-4 fw-semibold">Veja os feriados do seu país em um clique!</span>

      {/* Formulário para selecionar país e ano */}
      <form onSubmit={handleSubmit} className="mt-4">
        {/* Componente reutilizável para seleção de país */}
        <CountrySelector
          selected={selectedCountry}
          onChange={setSelectedCountry}
          onCountriesLoaded={handleCountriesLoaded}
        />

        {/* Campo para entrada de ano */}
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

        {/* Botões de ação para consultar os tipos de feriados */}
        <div className="d-flex gap-2">
          <button
            type="submit"
            className="btn btn-primary fw-bold"
            disabled={!selectedCountry}
          >
          
            Ver todos os feriados
            <span className="ms-2 icon-align">
              <LuCalendarDays />
            </span>
          </button>

          <button
            type="button"
            className="btn btn-upcoming fw-bold"
            onClick={handleUpcoming}
            disabled={!selectedCountry}
          >
            
            Ver próximos feriados
            <span className="ms-2 icon-align">
              <LuCalendarCheck2 />
            </span>
          </button>

          <button
            type="button"
            className="btn btn-longweekends fw-bold"
            onClick={handleLongWeekends}
            disabled={!selectedCountry}
          >
            
            Ver feriados prolongados
            <span className="ms-2 icon-align">
              <LuCalendarRange />
            </span>
          </button>
        </div>
      </form>
      
      {/* Seção com os feriados do mês atual no Brasil, Estados Unidos e Japão */}
      <div className="mt-5">
      <h5 className="fw-semibold mb-3">Feriados do mês atual ao redor do mundo!</h5>
      <div className="d-flex flex-wrap gap-3 justify-content-center">
        <div className="calendar-container">
            <h6 className="text-center">Brasil</h6>
            <CountryCalendar countryCode="BR" />
          </div>

          <div className="calendar-container">
            <h6 className="text-center">Estados Unidos</h6>
            <CountryCalendar countryCode="US" />
          </div>

          <div className="calendar-container">
            <h6 className="text-center">Japão</h6>
            <CountryCalendar countryCode="JP" />
          </div>
      </div>
</div>
    </div>
  );
}

export default Home;
