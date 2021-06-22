export default function fetchCountries(searchQuery) {
  const COUNTRY_URL = 'https://restcountries.eu/rest/v2/name/';
  return fetch(`${COUNTRY_URL}${searchQuery}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      if (!response.ok) reject;
    })
    .catch(() => false);
}
