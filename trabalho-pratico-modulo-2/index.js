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
  const citiesInState = [];
  for (const state of states) {
    // eslint-disable-next-line no-await-in-loop
    const length = await lengthOfState(state.Sigla);
    const stateObject = {
      state: state.Sigla,
      cities: length,
    };
    citiesInState.push(stateObject);
    console.log((`${state.Sigla} - ${length}`));
  }

  citiesInState.sort((a, b) => {
    if (a.cities < b.cities) return 1;
    if (a.cities > b.cities) return -1;
    return 0;
  });
  return citiesInState.filter((_, index) => index < 5);
}

async function smallestCities(states) {
  const citiesInState = [];
  for (const state of states) {
    // eslint-disable-next-line no-await-in-loop
    const length = await lengthOfState(state.Sigla);
    const stateObject = {
      state: state.Sigla,
      cities: length,
    };
    citiesInState.push(stateObject);
    console.log((`${state.Sigla} - ${length}`));
  }

  citiesInState.sort((a, b) => {
    if (a.cities > b.cities) return 1;
    if (a.cities < b.cities) return -1;
    return 0;
  });
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
