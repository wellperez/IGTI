/* eslint-disable no-console */
import { promises as fs } from 'fs';

async function readJsonFiles(file) {
  return JSON.parse(await fs.readFile(file));
}

const init = async () => {
  const states = await readJsonFiles('Estados.json');
  const cities = await readJsonFiles('Cidades.json');
};

init();
