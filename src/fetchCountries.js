export default function fetchCountries(searchQuery) {
  const COUNTRY_URL = 'https://restcountries.eu/rest/v2/name/';
  return fetch(COUNTRY_URL + searchQuery).then(response => response.json());
}
