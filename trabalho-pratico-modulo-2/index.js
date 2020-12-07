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
    states.map((state) => lengthOfState(state.Sigla).then((cities) => ({
      state: state.Sigla,
      cities,
    }))),
  );

  citiesInState.sort((a, b) => b.cities - a.cities);
  return citiesInState.filter((_, index) => index < 5);
}

async function smallestCities(states) {
  const citiesInState = await Promise.all(
    states.map((state) => lengthOfState(state.Sigla).then((cities) => ({
      state: state.Sigla,
      cities,
    }))),
  );

  citiesInState.sort((a, b) => a.cities - b.cities);
  return citiesInState.filter((_, index) => index < 5).reverse();
}

async function biggestCityInState(states, cities) {
  const citiesInState = states.map(
    (state) => (cities.filter(
      (city) => city.Estado === state.ID,
    )
    ).reduce((p, c) => (p.Nome.length >= c.Nome.length ? p : c)),
  );
  citiesInState.map((city) => (console.log({
    city: city.Nome,
    uf: states.filter((state) => state.ID === city.Estado)[0].Sigla,
  })));
}

async function smallestCityInState(states, cities) {
  const citiesInState = states.map(
    (state) => (cities.filter(
      (city) => city.Estado === state.ID,
    )
    ).reduce((p, c) => (p.Nome.length <= c.Nome.length ? p : c)),
  );
  citiesInState.map((city) => (console.log({
    city: city.Nome,
    uf: states.filter((state) => state.ID === city.Estado)[0].Sigla,
  })));
}

async function biggestCityInAllStates(states, cities) {
  const citiesInState = cities.reduce((p, c) => (p.Nome.length >= c.Nome.length ? p : c));

  citiesInState.Estado = states.filter((state) => state.ID === citiesInState.Estado)[0].Sigla;

  console.log(citiesInState);
}

async function smallestCityInAllStates(states, cities) {
  const citiesInState = cities.reduce((p, c) => (p.Nome.length < c.Nome.length ? p : c));

  citiesInState.Estado = states.filter((state) => state.ID === citiesInState.Estado)[0].Sigla;

  console.log(citiesInState);
}

async function init() {
  const states = await readJsonFiles('Estados.json');
  const cities = await readJsonFiles('Cidades.json');

  await createStateFiles(states, cities);
  console.log(await largestCities(states));
  console.log(await smallestCities(states));
  await biggestCityInState(states, cities.sort((a, b) => a.cities - b.cities));
  await smallestCityInState(states, cities.sort((a, b) => b.cities - a.cities));
  // await biggestCityInAllStates(states, cities.sort((a, b) => a.cities - b.cities));
  await smallestCityInAllStates(states, cities);
}

init();
