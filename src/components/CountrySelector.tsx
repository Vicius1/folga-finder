import React, { useEffect, useState } from "react";
import { getAvailableCountries } from "../services/holidayApi";
import { Country } from "../types";

// Definindo as propriedades do componente CountrySelector
interface CountrySelectorProps {
  selected: string;
  onChange: (countryCode: string) => void;
  onCountriesLoaded?: (countries: Country[]) => void;
}

function CountrySelector({ selected, onChange, onCountriesLoaded }: CountrySelectorProps) {
  // Estado para armazenar a lista de países
  const [countries, setCountries] = useState<Country[]>([]);

  // Estados para carregamento e erro
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getAvailableCountries();
        setCountries(data);
        if (onCountriesLoaded) {
          onCountriesLoaded(data);
        }
      } catch (error) {
        console.error("Erro ao buscar países:", error);
        setError("Não foi possível carregar a lista de países. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [onCountriesLoaded]);

  // Exibe mensagem de carregamento enquanto os dados estão sendo buscados
  if (loading) return <p>Carregando países...</p>;

  // Exibe mensagem de erro caso haja falha na requisição
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="mb-3">
      <label htmlFor="country-select" className="form-label">
        Selecione um país:
      </label>
      <select
        id="country-select"
        className="form-select"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Escolha um país</option>
        {countries.map((country) => (
          // Mapeia a lista de países e gera uma opção para cada um
          <option key={country.countryCode} value={country.countryCode}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CountrySelector;
