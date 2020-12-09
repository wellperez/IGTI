/* eslint-disable no-console */
/* eslint-disable import/extensions */
import express from 'express';
import { promises as fs } from 'fs';
import winston from 'winston';
import accountsRouter from './routes/accounts.js';

const { readFile, writeFile } = fs;

global.filename = 'accounts.json';

const {
  combine, timestamp, label, printf,
} = winston.format;

const myFormat = printf(({
  // eslint-disable-next-line no-shadow
  level, message, label, timestamp,
}) => `${timestamp} [${label}] ${level}: ${message}`);

global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'my-bank-api.log' }),
  ],
  format: combine(
    label({ label: 'my-bank-api' }),
    timestamp(),
    myFormat,
  ),
});

const app = express();
app.use(express.json());

app.use('/account', accountsRouter);

app.listen(3000, async () => {
  try {
    await readFile(global.filename);
    global.logger.info('API Started!');
  } catch {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };
    writeFile(global.filename, JSON.stringify(initialJson))
      .then(() => {
        global.logger.info('API Started and Created File!');
      })
      .catch((err) => {
        global.logger.error(err);
      });
  }
});
