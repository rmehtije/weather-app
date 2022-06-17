import { weather_api_key, weather_api_url } from "../keys";
import cities from '../Header/cities.json';

// Zapros na server na endpoint: weather kotorqj otvechajet za tekushiju pogodu.
// Aynhronnaja funkcqja vqpolnjajetsa otdelno ot vsego. Ona prednazna4ena dlja togo 4toby 
// ves kod prodolzhal obratovatsa ne ozhqdaja otveta ot servera. 
// Glavnqje klju4i v asinhonnoj funkcqii eto async i await.
// async pishetsa pered obozna4enijem funkcqii dlja togo 4tobq obozna4ett 4to eta za funkcqja js dvizhku.
// await pishetsa ne posredstvenno pered funkcqii kotoraja budet vqpolnjat' zapros.
export async function getCurrentWeather(data) {
  // fetch delajet zapros. Zaprosq dvuh tipov GET POST. 
  // fetch funkcqja prinemajet raznqje parametry. On mozhet prinemat kak string tak i object.
  // jesli my peredali fetch string to on shitajet 4to eto url i nuzhno sdelat get zapros.
  // a jesli objecte to eto uzhe zavisit ot nastrojek kotorqh mq zadadim.

  // URLSearchParams - class kotorqj nam pomogajet rabotat' s parametrami kotorqje budut peredannq v fetch.
  // URLSearchParams - deljaet iz objecta string s url formatom. ssqlka.
  // URLSearchParams - dannaj object vqdast : "lat=54.33&lon=36.21&units=metric&lang=ru&appid=sdlfioeruoe"

  // i togo polu4ajetsa 4to fetch polu4ajet sledushij string: https://api.openweathermap.org/data/2.5/weather?lat=54.33&lon=36.21&units=metric&lang=ru&appid=sdlfioeruoe
  const response = await fetch(weather_api_url + '/weather?' + new URLSearchParams({
    lat: cities[data.city].lat,
    lon: cities[data.city].lng,
    units: data.unit,
    lang: data.language,
    appid: weather_api_key
  }));
  // dozhqdajemsa otveta s servera i vsjo parsim v object.
  // .json() = JSON.parse(js_string);
  return await response.json();
}

export async function getForecastWeather(data) {
  const response = await fetch(weather_api_url + '/forecast?' + new URLSearchParams({
    lat: cities[data.city].lat,
    lon: cities[data.city].lng,
    units: data.unit,
    lang: data.language,
    appid: weather_api_key
  }));

  return await response.json();
}
