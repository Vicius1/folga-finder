import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLongWeekends } from "../services/holidayApi";
import { LongWeekend } from "../types";

function LongWeekendsPage() {
  const { countryCode, year } = useParams<{ countryCode: string; year: string }>();
  const [weekends, setWeekends] = useState<LongWeekend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLongWeekends = async () => {
      if (!countryCode || !year) return;
      try {
        const data = await getLongWeekends(countryCode, year);
        setWeekends(data);
      } catch (error) {
        console.error("Erro ao buscar feriados prolongados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLongWeekends();
  }, [countryCode, year]);

  if (loading) return <p>Carregando feriados prolongados...</p>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">Feriados prolongados em {countryCode} - {year}</h2>
      {weekends.length === 0 ? (
        <p>Nenhum feriado prolongado encontrado.</p>
      ) : (
        <ul className="list-group">
          {weekends.map((w, idx) => (
            <li key={idx} className="list-group-item">
              <strong>{w.startDate}</strong> até <strong>{w.endDate}</strong> — {w.dayCount} dias
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LongWeekendsPage;
