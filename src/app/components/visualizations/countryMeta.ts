export interface CountryMeta {
  lat: number;
  lon: number;
  continent: string;
  anchorCity: string;
}

export const COUNTRY_META: Record<string, CountryMeta> = {
  Bangladesh: { lat: 23.685, lon: 90.3563, continent: 'Asia', anchorCity: 'Dhaka' },
  Greece: { lat: 39.0742, lon: 21.8243, continent: 'Europe', anchorCity: 'Athens' },
  Italy: { lat: 41.8719, lon: 12.5674, continent: 'Europe', anchorCity: 'Rome' },
  'Vatican City': { lat: 41.9029, lon: 12.4534, continent: 'Europe', anchorCity: 'Vatican City' },
  Austria: { lat: 47.5162, lon: 14.5501, continent: 'Europe', anchorCity: 'Vienna' },
  Slovakia: { lat: 48.669, lon: 19.699, continent: 'Europe', anchorCity: 'Bratislava' },
  Czechia: { lat: 49.8175, lon: 15.473, continent: 'Europe', anchorCity: 'Prague' },
  Hungary: { lat: 47.1625, lon: 19.5033, continent: 'Europe', anchorCity: 'Budapest' },
  Germany: { lat: 51.1657, lon: 10.4515, continent: 'Europe', anchorCity: 'Berlin' },
  Qatar: { lat: 25.3548, lon: 51.1839, continent: 'Asia', anchorCity: 'Doha' },
  India: { lat: 20.5937, lon: 78.9629, continent: 'Asia', anchorCity: 'New Delhi' },
  Thailand: { lat: 15.87, lon: 100.9925, continent: 'Asia', anchorCity: 'Bangkok' },
  Nepal: { lat: 28.3949, lon: 84.124, continent: 'Asia', anchorCity: 'Kathmandu' },
  Turkey: { lat: 38.9637, lon: 35.2433, continent: 'Eurasia', anchorCity: 'Istanbul' },
  Netherlands: { lat: 52.1326, lon: 5.2913, continent: 'Europe', anchorCity: 'Amsterdam' },
  Belgium: { lat: 50.5039, lon: 4.4699, continent: 'Europe', anchorCity: 'Brussels' },
  Switzerland: { lat: 46.8182, lon: 8.2275, continent: 'Europe', anchorCity: 'Bern' },
  Egypt: { lat: 26.8206, lon: 30.8025, continent: 'Africa', anchorCity: 'Cairo' },
  'Saudi Arabia': { lat: 23.8859, lon: 45.0792, continent: 'Asia', anchorCity: 'Riyadh' },
  Malaysia: { lat: 4.2105, lon: 101.9758, continent: 'Asia', anchorCity: 'Kuala Lumpur' },
};

export function getCountryMeta(country: string): CountryMeta | null {
  return COUNTRY_META[country] ?? null;
}
