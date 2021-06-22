import debounce from 'lodash.debounce';
import './sass/main.scss';
import countriesTemplate from './partials/list-of-countries.hbs';
import countryDataTemplate from './partials/country-details.hbs';
const Handlebars = require('handlebars');
import '../node_modules/@pnotify/core/dist/BrightTheme.css';
import { error, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
import fetchCountries from './fetchCountries';
defaultModules.set(PNotifyMobile, {});

const inputRef = document.querySelector('.input');
const countriesList = document.querySelector('.countries-result');

inputRef.addEventListener('input', debounce(onSearch, 500));

function onSearch(event) {
  const inputValue = event.target.value;
  if (inputValue === '') resetList();
  fetchCountries(inputValue).then(renderResult);
}

function renderResult(result) {
  if (!result) {
    error({
      text: 'No matches found. Please check the correct spelling',
      delay: 3000,
    });
  }
  if (result.length > 10)
    return error({
      text: 'Too many matches found. Please enter a more specific query!',
      delay: 3000,
    });
  if (result.length < 10 && result.length > 1) createListOfCountries(result);
  if (result.length === 1) showMainCountryData(result[0]);
}

function createListOfCountries(countriesArray) {
  resetList();
  const tmp = countriesArray.map(country => countriesTemplate(country)).join('');
  insertResultIntoHTML(tmp);
}

function showMainCountryData(country) {
  resetList();
  const countryData = countryDataTemplate(country);
  insertResultIntoHTML(countryData);
}

function insertResultIntoHTML(result) {
  countriesList.insertAdjacentHTML('beforeend', result);
}

function resetList() {
  countriesList.innerHTML = '';
}
