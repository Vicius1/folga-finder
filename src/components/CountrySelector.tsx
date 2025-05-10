import React, { useEffect, useState } from "react";
import { getAvailableCountries } from "../services/holidayApi";
import { Country } from "../types";

interface CountrySelectorProps {
  selected: string;
  onChange: (countryCode: string) => void;
  onCountriesLoaded?: (countries: Country[]) => void;
}

function CountrySelector({ selected, onChange, onCountriesLoaded }: CountrySelectorProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [onCountriesLoaded]);

  if (loading) return <p>Carregando países...</p>;

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
          <option key={country.countryCode} value={country.countryCode}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CountrySelector;
