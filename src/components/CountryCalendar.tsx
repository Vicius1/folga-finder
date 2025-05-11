import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useEffect, useMemo, useState } from "react";
import { Holiday } from "../types";
import "../styles/calendar.scss";

// Definindo as propriedades do componente CountryCalendar
interface CountryCalendarProps {
  countryCode: string;
}

function CountryCalendar({ countryCode }: CountryCalendarProps) {
  // Estado que armazena os feriados do país no mês atual
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  // Estado para armazenar o nome do feriado que o usuário está passando o mouse
  const [hoveredHoliday, setHoveredHoliday] = useState<string | null>(null);

  // Estado para controlar o mês visível no calendário
  const [activeStartDate, setActiveStartDate] = useState<Date>(new Date());

  // Memoriza o primeiro dia do mês atual visível no calendário
  const currentMonthStart = useMemo(
    () => new Date(activeStartDate.getFullYear(), activeStartDate.getMonth(), 1),
    [activeStartDate]
  );

  // Buscando os feriados da API
  useEffect(() => {
    const fetchHolidays = async () => {
      const year = activeStartDate.getFullYear();
      const response = await fetch(
        `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`
      );
      const data = await response.json();
      
      // Filtra apenas os feriados do mês atualmente visível no calendário
      const currentMonth = String(activeStartDate.getMonth() + 1).padStart(2, "0");
      const currentYear = activeStartDate.getFullYear();

      const filtered = data.filter((holiday: Holiday) => {
        const [year, month] = holiday.date.split("-");
        return year === currentYear.toString() && month === currentMonth;
      });

      setHolidays(filtered);
    };

    fetchHolidays();
  }, [countryCode, activeStartDate]);

  // Quando o usuário passa o mouse sobre uma data com feriado, mostra o nome do feriado
  const handleMouseEnter = (date: Date) => {
    const dateString = date.toISOString().slice(0, 10);
    const holiday = holidays.find((h) => h.date === dateString);
    if (holiday) {
        const holidayName = countryCode === "BR" ? holiday.localName : holiday.name;
        setHoveredHoliday(holidayName);
    }
  };

  // Quando o usuário tira o mouse da data, oculta o nome do feriado
  const handleMouseLeave = () => {
    setHoveredHoliday(null);
  };

  return (
    <div className="calendar-card">
      {/* Componente de calendário com configurações e marcações de feriado */}
      <Calendar
        activeStartDate={currentMonthStart}
        showNavigation={false}
        minDetail="month"
        maxDetail="month"
        tileClassName={({ date }) => {
          // Adiciona a classe "highlight" nos dias que possuem feriado
          const dateString = date.toISOString().slice(0, 10);
          return holidays.some((h) => h.date === dateString) ? "highlight" : null;
        }}
        tileContent={({ date }) => {
          // Adiciona um pequeno ponto visual nos dias com feriado e interações de hover
          const dateString = date.toISOString().slice(0, 10);
          const holiday = holidays.find((h) => h.date === dateString);
          return holiday ? (
            <div
              className="holiday-dot"
              onMouseEnter={() => handleMouseEnter(date)}
              onMouseLeave={handleMouseLeave}
            />
          ) : null;
        }}
        onActiveStartDateChange={({ activeStartDate }) => {
          if (activeStartDate) {
            setActiveStartDate(activeStartDate);
          }
        }}
      />

      {/* Exibe o nome do feriado em destaque (hover) */}
      {hoveredHoliday && (
        <div>
          <p>{hoveredHoliday}</p>
        </div>
      )}
    </div>
  );
}

export default CountryCalendar;
