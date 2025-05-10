import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNextPublicHolidays } from "../services/holidayApi";
import { Holiday } from "../types";

function UpcomingHolidaysPage() {
  const { countryCode } = useParams<{ countryCode: string }>();
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHolidays = async () => {
      if (!countryCode) return;
      try {
        const data = await getNextPublicHolidays(countryCode);
        setHolidays(data.slice(0, 5)); // Mostra só os próximos 5
      } catch (error) {
        console.error("Erro ao buscar próximos feriados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHolidays();
  }, [countryCode]);

  if (loading) return <p>Carregando próximos feriados...</p>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">Próximos feriados em {countryCode}</h2>
      {holidays.length === 0 ? (
        <p>Nenhum feriado encontrado.</p>
      ) : (
        <ul className="list-group">
          {holidays.map((holiday) => (
            <li key={holiday.date} className="list-group-item">
              <strong>{holiday.date}</strong> — {holiday.localName} ({holiday.name})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UpcomingHolidaysPage;
