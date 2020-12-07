/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import { promises as fs } from 'fs';

async function readJsonFiles(file, state) {
  if (state) {
    return JSON.parse(await fs.readFile(`states/${file}.json`));
  }
  return JSON.parse(await fs.readFile(file));
}

async function createStateFiles(states, cities) {
  states.forEach((state) => {
    const citiesOfstate = cities.filter((city) => city.Estado === state.ID);
    fs.writeFile(`./states/${state.Sigla}.json`, JSON.stringify(citiesOfstate));
  });
}

async function lengthOfState(uf) {
  const cities = await readJsonFiles(uf, true);
  return cities.length;
}

async function largestCities(states) {
  const citiesInState = await Promise.all(
    states.map(
      (state) => lengthOfState(state.Sigla).then((cities) => ({ state: state.Sigla, cities })),
    ),
  );

  citiesInState.sort((a, b) => b.cities - a.cities);
  return citiesInState.filter((_, index) => index < 5);
}

async function smallestCities(states) {
  const citiesInState = await Promise.all(
    states.map(
      (state) => lengthOfState(state.Sigla).then((cities) => ({ state: state.Sigla, cities })),
    ),
  );

  citiesInState.sort((a, b) => a.cities - b.cities);
  return citiesInState.filter((_, index) => index < 5).reverse();
}

async function init() {
  const states = await readJsonFiles('Estados.json');
  const cities = await readJsonFiles('Cidades.json');

  await createStateFiles(states, cities);
  console.log(await largestCities(states));
  console.log(await smallestCities(states));
}

init();
