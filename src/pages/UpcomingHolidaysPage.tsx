import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getNextPublicHolidays } from "../services/holidayApi";
import BackButton from "../components/BackButton";
import { Holiday } from "../types";

function UpcomingHolidaysPage() {
  // Obtém o código do país a partir dos parâmetros da URL
  const { countryCode } = useParams<{ countryCode: string }>();
  
  // Obtém o nome do país a partir do estado passado pela navegação ou usa o código do país
  const location = useLocation();
  const countryName = location.state?.countryName || countryCode;

  // Estado que armazenará os feriados próximos
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  // Estados para controle de carregamento e erro
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UseEffect que será executado ao carregar a página
  useEffect(() => {
    const fetchHolidays = async () => {
      if (!countryCode) return;
      try {
        const data = await getNextPublicHolidays(countryCode);
        setHolidays(data.slice(0, 5));
      } catch (error) {
        console.error("Erro ao buscar próximos feriados:", error);
        setError("Não foi possível carregar os feriados. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchHolidays();
  }, [countryCode]);

  // Exibe mensagem de carregamento enquanto os dados estão sendo buscados
  if (loading) return <p>Carregando próximos feriados...</p>;

  // Exibe mensagem de erro caso haja falha na requisição
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container py-4">
      <BackButton />
      <h2 className="mb-4">Próximos feriados em {countryName}</h2>

      {/* Exibe mensagem caso não haja feriados próximos */}
      {holidays.length === 0 ? (
        <p>Nenhum feriado encontrado.</p>
      ) : (
        // Lista dos próximos feriados
        <ul className="list-group">
          {holidays.map((holiday) => (
            <li key={holiday.date} className="list-group-item">
              {/* Exibe a data formatada, nome local e nome do feriado */}
              <strong>{new Date(holiday.date + "T00:00:00").toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" })}</strong> — {holiday.localName} ({holiday.name})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UpcomingHolidaysPage;
