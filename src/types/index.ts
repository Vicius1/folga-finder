export interface Country {
    countryCode: string;
    name: string;
}

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