import axios from "axios";
import { Country, Holiday } from "../types";

const BASE_URL = "https://date.nager.at/api/v3";

export async function getAvailableCountries(): Promise<Country[]> {
  const response = await axios.get<Country[]>(`${BASE_URL}/AvailableCountries`);
  return response.data;
}

export async function getPublicHolidays(year: number, countryCode: string): Promise<Holiday[]> {
    const response = await axios.get<Holiday[]>(`${BASE_URL}/PublicHolidays/${year}/${countryCode}`);
    return response.data;
}

export async function getNextPublicHolidays(countryCode: string): Promise<Holiday[]> {
    const response = await axios.get<Holiday[]>(`${BASE_URL}/NextPublicHolidays/${countryCode}`);
    return response.data;
}
  