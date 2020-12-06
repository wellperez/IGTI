/* eslint-disable no-console */
import { promises as fs } from 'fs';

async function readJsonFiles(file, state) {
  console.log(state);
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
  console.log(cities.length);
  return cities.length;
}

const init = async () => {
  const states = await readJsonFiles('Estados.json');
  const cities = await readJsonFiles('Cidades.json');

  createStateFiles(states, cities);
  lengthOfState('SP');
};

init();
