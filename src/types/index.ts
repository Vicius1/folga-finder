// Representa um país disponível na API, com seu código e nome completo
export interface Country {
    countryCode: string;
    name: string;
}

// Representa um feriado retornado pela API
export interface Holiday {
    date: string;
    localName: string;
    name: string;
    countryCode: string;
    fixed: boolean;
    global: boolean;
    counties?: string[];
    types?: string[];
}

// Representa um feriado prolongado ("feriadão")
export interface LongWeekend {
  startDate: string;
  endDate: string;
  dayCount: number;
}