import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPublicHolidays } from "../services/holidayApi";
import { Holiday } from "../types";

function HolidaysPage() {
  const { countryCode, year } = useParams<{ countryCode: string; year: string }>();
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHolidays = async () => {
      if (!countryCode || !year) return;
      try {
        const data = await getPublicHolidays(parseInt(year), countryCode);
        setHolidays(data);
      } catch (error) {
        console.error("Erro ao buscar feriados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHolidays();
  }, [countryCode, year]);

  if (loading) return <p>Carregando feriados...</p>;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Feriados em {countryCode} - {year}</h2>
        <Link
          to={`/feriadoes/${countryCode}/${year}`}
          className="btn btn-outline-primary btn-sm"
        >
          Ver Feriados prolongados
        </Link>
      </div>

      {holidays.length === 0 ? (
        <p>Nenhum feriado encontrado.</p>
      ) : (
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Data</th>
              <th>Nome</th>
              <th>Local</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {holidays.map((holiday) => (
              <tr key={holiday.date}>
                <td>{holiday.date}</td>
                <td>{holiday.localName}</td>
                <td>{holiday.counties?.join(", ") || "Nacional"}</td>
                <td>{holiday.types?.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default HolidaysPage;
