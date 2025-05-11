import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getLongWeekends } from "../services/holidayApi";
import BackButton from "../components/BackButton";
import { LongWeekend } from "../types";

function LongWeekendsPage() {
  // Recupera os parâmetros da rota (código do país e ano)
  const { countryCode, year } = useParams<{ countryCode: string; year: string }>();
  
  // Recupera o estado passado via navegação
  const location = useLocation();
  const countryName = location.state?.countryName || countryCode;

  // Estado local para armazenar os feriados prolongados, status de carregamento e erro
  const [weekends, setWeekends] = useState<LongWeekend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect para buscar os feriados prolongados ao montar o componente ou mudar os parâmetros
  useEffect(() => {
    const fetchLongWeekends = async () => {
      if (!countryCode || !year) return;
      try {
        const data = await getLongWeekends(countryCode, year);
        setWeekends(data);
      } catch (error) {
        console.error("Erro ao buscar feriados prolongados:", error);
        setError("Não foi possível carregar os feriados. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchLongWeekends();
  }, [countryCode, year]);

  // Exibe mensagem de carregamento enquanto os dados estão sendo buscados
  if (loading) return <p>Carregando feriados prolongados...</p>;

  // Exibe mensagem de erro caso haja falha na requisição
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container py-4">
      <BackButton />
      <h2 className="mb-4">Feriados prolongados em {countryName} - {year}</h2>

      {/* Exibe a lista de feriados prolongados ou mensagem caso não haja feriados */}
      {weekends.length === 0 ? (
        <p>Nenhum feriado prolongado encontrado.</p>
      ) : (
        <ul className="list-group">
          {weekends.map((w, idx) => (
            // Para cada feriado prolongado, exibe a data de início, término e a quantidade de dias
            <li key={idx} className="list-group-item">
              <strong>{new Date(w.startDate + "T00:00:00").toLocaleDateString("pt-BR")}</strong> até <strong>{new Date(w.endDate).toLocaleDateString("pt-BR")}</strong> — {w.dayCount} dias
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LongWeekendsPage;
