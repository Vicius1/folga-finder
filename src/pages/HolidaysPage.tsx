import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { getPublicHolidays } from "../services/holidayApi";
import BackButton from "../components/BackButton";
import { LuCalendarCheck2, LuCalendarRange } from "react-icons/lu";
import "../styles/main.scss";
import { Holiday } from "../types";

function HolidaysPage() {
  // Recupera os parâmetros da rota (código do país e ano)
  const { countryCode, year } = useParams<{ countryCode: string; year: string }>();
  
  // Recupera o estado passado via navegação
  const location = useLocation();
  const countryName = location.state?.countryName || countryCode;
  
  // Estado local para armazenar os feriados, status de carregamento e erro
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect para buscar os feriados ao montar o componente ou mudar os parâmetros
  useEffect(() => {
    const fetchHolidays = async () => {
      if (!countryCode || !year) return;
      try {
        const data = await getPublicHolidays(parseInt(year), countryCode);
        setHolidays(data);
      } catch (error) {
        console.error("Erro ao buscar feriados:", error);
        setError("Não foi possível carregar os feriados. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchHolidays();
  }, [countryCode, year]);

  // Exibe mensagem de carregamento
  if (loading) return <p>Carregando feriados...</p>;

  // Exibe mensagem de erro caso haja falha na requisição
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container py-4">
      <BackButton />

      {/* Título e botões de navegação relacionados */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Feriados em {countryName} - {year}</h2>
        <div className="d-flex gap-2">
          {/* Link para ver os próximos feriados */}
          <Link
            to={`/proximos/${countryCode}`}
            state={{ countryName }}
            className="btn btn-upcoming btn-sm icon-align-custom"
          >
            Ver Próximos Feriados
            <span className="ms-2">
              <LuCalendarCheck2 />
            </span>
          </Link>

          {/* Link para ver os feriados prolongados */}
          <Link
            to={`/feriadoes/${countryCode}/${year}`}
            state={{ countryName }}
            className="btn btn-longweekends btn-sm icon-align-custom"
          >
            Ver Feriados prolongados
            <span className="ms-2">
              <LuCalendarRange />
            </span>
          </Link>
        </div>
      </div>

      {/* Exibição da tabela ou mensagem caso não haja feriados */}
      {holidays.length === 0 ? (
        <p>Nenhum feriado encontrado.</p>
      ) : (
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Data</th>
              <th>Nome</th>
              <th>Local</th>
            </tr>
          </thead>
          <tbody>
            {holidays.map((holiday) => (
              <tr key={holiday.date}>
                <td>{new Date(holiday.date + "T00:00:00").toLocaleDateString("pt-BR")}</td>
                <td>{holiday.localName}</td>
                <td>{holiday.counties?.join(", ") || "Nacional"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default HolidaysPage;
