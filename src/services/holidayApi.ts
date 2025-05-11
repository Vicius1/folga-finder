import axios from "axios";
import { Country, Holiday, LongWeekend } from "../types";

const BASE_URL = "https://date.nager.at/api/v3";

/**
 * Busca a lista de países disponíveis na API.
 * 
 * @returns Uma Promise que resolve para um array de países (Country[])
 */
export async function getAvailableCountries(): Promise<Country[]> {
  const response = await axios.get<Country[]>(`${BASE_URL}/AvailableCountries`);
  return response.data;
}

/**
 * Busca os feriados públicos de um país em um determinado ano.
 * 
 * @param year - Ano para consulta
 * @param countryCode - Código do país
 * @returns Uma Promise que resolve para um array de feriados (Holiday[])
 */
export async function getPublicHolidays(year: number, countryCode: string): Promise<Holiday[]> {
    const response = await axios.get<Holiday[]>(`${BASE_URL}/PublicHolidays/${year}/${countryCode}`);
    return response.data;
}

/**
 * Busca os próximos feriados públicos futuros para um país.
 * 
 * @param countryCode - Código do país
 * @returns Uma Promise que resolve para um array de feriados futuros (Holiday[])
 */
export async function getNextPublicHolidays(countryCode: string): Promise<Holiday[]> {
    const response = await axios.get<Holiday[]>(`${BASE_URL}/NextPublicHolidays/${countryCode}`);
    return response.data;
}

/**
 * Busca os feriados prolongados (que emendam com fins de semana) para um país em um determinado ano.
 * 
 * @param countryCode - Código do país
 * @param year - Ano para consulta
 * @returns Uma Promise que resolve para um array de feriados prolongados (LongWeekend[])
 */
export async function getLongWeekends(countryCode: string, year: string) {
    const response = await axios.get<LongWeekend[]>(`${BASE_URL}/LongWeekend/${year}/${countryCode}`);
    return response.data;
}
  