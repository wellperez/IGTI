/* eslint-disable no-console */
/* eslint-disable import/extensions */
import express from 'express';
import { promises as fs } from 'fs';
import accountsRouter from './routes/accounts.js';

const { readFile, writeFile } = fs;

const app = express();
app.use(express.json());

app.use('/account', accountsRouter);

app.listen(3000, async () => {
  try {
    await readFile('accounts.json');
    console.log('API Started!');
  } catch {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };
    writeFile('accounts.json', JSON.stringify(initialJson)).then(() => {
      console.log('API Started and Created File!');
    }).catch((err) => {
      console.error(err);
    });
  }
});
