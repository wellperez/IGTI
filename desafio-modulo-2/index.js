/* eslint-disable no-console */
/* eslint-disable import/extensions */
import express from 'express';
import { promises as fs } from 'fs';
import winston from 'winston';
import gradesRouter from './routes/grades.js';

const { readFile, writeFile } = fs;

global.filename = 'grades.json';

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
    label({ label: 'grades-control-api' }),
    timestamp(),
    myFormat,
  ),
});

const app = express();
app.use(express.json());

app.use('/grades', gradesRouter);

app.listen(3000, async () => {
  try {
    await readFile(global.filename);
    global.logger.info('API Started!');
  } catch {
    const initialJson = {
      nextId: 49,
      grades: [
        {
          id: 1,
          student: 'Loiane Groner',
          subject: '01 - JavaScript',
          type: 'Fórum',
          value: 15,
          timestamp: '2020-05-19T18:21:24.958Z',
        },
        {
          id: 2,
          student: 'Loiane Groner',
          subject: '02 - Node',
          type: 'Fórum',
          value: 5,
          timestamp: '2020-05-19T18:21:24.964Z',
        },
        {
          id: 3,
          student: 'Loiane Groner',
          subject: '03 - React',
          type: 'Fórum',
          value: 14,
          timestamp: '2020-05-19T18:21:24.970Z',
        },
        {
          id: 4,
          student: 'Loiane Groner',
          subject: '04 - MongoDB',
          type: 'Fórum',
          value: 2,
          timestamp: '2020-05-19T18:21:24.975Z',
        },
        {
          id: 5,
          student: 'Loiane Groner',
          subject: '01 - JavaScript',
          type: 'Trabalho Prático',
          value: 21,
          timestamp: '2020-05-19T18:21:24.981Z',
        },
        {
          id: 6,
          student: 'Loiane Groner',
          subject: '02 - Node',
          type: 'Trabalho Prático',
          value: 24,
          timestamp: '2020-05-19T18:21:24.987Z',
        },
        {
          id: 7,
          student: 'Loiane Groner',
          subject: '03 - React',
          type: 'Trabalho Prático',
          value: 2,
          timestamp: '2020-05-19T18:21:24.993Z',
        },
        {
          id: 8,
          student: 'Loiane Groner',
          subject: '04 - MongoDB',
          type: 'Trabalho Prático',
          value: 30,
          timestamp: '2020-05-19T18:21:24.999Z',
        },
        {
          id: 9,
          student: 'Loiane Groner',
          subject: '01 - JavaScript',
          type: 'Desafio',
          value: 5,
          timestamp: '2020-05-19T18:21:25.004Z',
        },
        {
          id: 10,
          student: 'Loiane Groner',
          subject: '02 - Node',
          type: 'Desafio',
          value: 18,
          timestamp: '2020-05-19T18:21:25.012Z',
        },
        {
          id: 11,
          student: 'Loiane Groner',
          subject: '03 - React',
          type: 'Desafio',
          value: 40,
          timestamp: '2020-05-19T18:21:25.019Z',
        },
        {
          id: 12,
          student: 'Loiane Groner',
          subject: '04 - MongoDB',
          type: 'Desafio',
          value: 44,
          timestamp: '2020-05-19T18:21:25.025Z',
        },
        {
          id: 13,
          student: 'Roberta Arcoverde',
          subject: '01 - JavaScript',
          type: 'Fórum',
          value: 13,
          timestamp: '2020-05-19T18:21:25.032Z',
        },
        {
          id: 14,
          student: 'Roberta Arcoverde',
          subject: '02 - Node',
          type: 'Fórum',
          value: 16,
          timestamp: '2020-05-19T18:21:25.039Z',
        },
        {
          id: 15,
          student: 'Roberta Arcoverde',
          subject: '03 - React',
          type: 'Fórum',
          value: 1,
          timestamp: '2020-05-19T18:21:25.047Z',
        },
        {
          id: 16,
          student: 'Roberta Arcoverde',
          subject: '04 - MongoDB',
          type: 'Fórum',
          value: 7,
          timestamp: '2020-05-19T18:21:25.053Z',
        },
        {
          id: 17,
          student: 'Roberta Arcoverde',
          subject: '01 - JavaScript',
          type: 'Trabalho Prático',
          value: 12,
          timestamp: '2020-05-19T18:21:25.059Z',
        },
        {
          id: 18,
          student: 'Roberta Arcoverde',
          subject: '02 - Node',
          type: 'Trabalho Prático',
          value: 21,
          timestamp: '2020-05-19T18:21:25.066Z',
        },
        {
          id: 19,
          student: 'Roberta Arcoverde',
          subject: '03 - React',
          type: 'Trabalho Prático',
          value: 7,
          timestamp: '2020-05-19T18:21:25.072Z',
        },
        {
          id: 20,
          student: 'Roberta Arcoverde',
          subject: '04 - MongoDB',
          type: 'Trabalho Prático',
          value: 20,
          timestamp: '2020-05-19T18:21:25.077Z',
        },
        {
          id: 21,
          student: 'Roberta Arcoverde',
          subject: '01 - JavaScript',
          type: 'Desafio',
          value: 16,
          timestamp: '2020-05-19T18:21:25.084Z',
        },
        {
          id: 22,
          student: 'Roberta Arcoverde',
          subject: '02 - Node',
          type: 'Desafio',
          value: 9,
          timestamp: '2020-05-19T18:21:25.090Z',
        },
        {
          id: 23,
          student: 'Roberta Arcoverde',
          subject: '03 - React',
          type: 'Desafio',
          value: 15,
          timestamp: '2020-05-19T18:21:25.098Z',
        },
        {
          id: 24,
          student: 'Roberta Arcoverde',
          subject: '04 - MongoDB',
          type: 'Desafio',
          value: 14,
          timestamp: '2020-05-19T18:21:25.106Z',
        },
        {
          id: 25,
          student: 'Roberto Achar',
          subject: '01 - JavaScript',
          type: 'Fórum',
          value: 9,
          timestamp: '2020-05-19T18:21:25.113Z',
        },
        {
          id: 26,
          student: 'Roberto Achar',
          subject: '02 - Node',
          type: 'Fórum',
          value: 17,
          timestamp: '2020-05-19T18:21:25.128Z',
        },
        {
          id: 27,
          student: 'Roberto Achar',
          subject: '03 - React',
          type: 'Fórum',
          value: 10,
          timestamp: '2020-05-19T18:21:25.140Z',
        },
        {
          id: 28,
          student: 'Roberto Achar',
          subject: '04 - MongoDB',
          type: 'Fórum',
          value: 7,
          timestamp: '2020-05-19T18:21:25.150Z',
        },
        {
          id: 29,
          student: 'Roberto Achar',
          subject: '01 - JavaScript',
          type: 'Trabalho Prático',
          value: 2,
          timestamp: '2020-05-19T18:21:25.157Z',
        },
        {
          id: 30,
          student: 'Roberto Achar',
          subject: '02 - Node',
          type: 'Trabalho Prático',
          value: 30,
          timestamp: '2020-05-19T18:21:25.165Z',
        },
        {
          id: 31,
          student: 'Roberto Achar',
          subject: '03 - React',
          type: 'Trabalho Prático',
          value: 27,
          timestamp: '2020-05-19T18:21:25.171Z',
        },
        {
          id: 32,
          student: 'Roberto Achar',
          subject: '04 - MongoDB',
          type: 'Trabalho Prático',
          value: 16,
          timestamp: '2020-05-19T18:21:25.178Z',
        },
        {
          id: 33,
          student: 'Roberto Achar',
          subject: '01 - JavaScript',
          type: 'Desafio',
          value: 25,
          timestamp: '2020-05-19T18:21:25.184Z',
        },
        {
          id: 34,
          student: 'Roberto Achar',
          subject: '02 - Node',
          type: 'Desafio',
          value: 37,
          timestamp: '2020-05-19T18:21:25.191Z',
        },
        {
          id: 35,
          student: 'Roberto Achar',
          subject: '03 - React',
          type: 'Desafio',
          value: 23,
          timestamp: '2020-05-19T18:21:25.198Z',
        },
        {
          id: 36,
          student: 'Roberto Achar',
          subject: '04 - MongoDB',
          type: 'Desafio',
          value: 43,
          timestamp: '2020-05-19T18:21:25.204Z',
        },
        {
          id: 37,
          student: 'Rodrigo Branas',
          subject: '01 - JavaScript',
          type: 'Fórum',
          value: 6,
          timestamp: '2020-05-19T18:21:25.211Z',
        },
        {
          id: 38,
          student: 'Rodrigo Branas',
          subject: '02 - Node',
          type: 'Fórum',
          value: 16,
          timestamp: '2020-05-19T18:21:25.217Z',
        },
        {
          id: 39,
          student: 'Rodrigo Branas',
          subject: '03 - React',
          type: 'Fórum',
          value: 3,
          timestamp: '2020-05-19T18:21:25.225Z',
        },
        {
          id: 40,
          student: 'Rodrigo Branas',
          subject: '04 - MongoDB',
          type: 'Fórum',
          value: 2,
          timestamp: '2020-05-19T18:21:25.232Z',
        },
        {
          id: 41,
          student: 'Rodrigo Branas',
          subject: '01 - JavaScript',
          type: 'Trabalho Prático',
          value: 13,
          timestamp: '2020-05-19T18:21:25.240Z',
        },
        {
          id: 42,
          student: 'Rodrigo Branas',
          subject: '02 - Node',
          type: 'Trabalho Prático',
          value: 18,
          timestamp: '2020-05-19T18:21:25.247Z',
        },
        {
          id: 43,
          student: 'Rodrigo Branas',
          subject: '03 - React',
          type: 'Trabalho Prático',
          value: 6,
          timestamp: '2020-05-19T18:21:25.253Z',
        },
        {
          id: 44,
          student: 'Rodrigo Branas',
          subject: '04 - MongoDB',
          type: 'Trabalho Prático',
          value: 28,
          timestamp: '2020-05-19T18:21:25.260Z',
        },
        {
          id: 45,
          student: 'Rodrigo Branas',
          subject: '01 - JavaScript',
          type: 'Desafio',
          value: 16,
          timestamp: '2020-05-19T18:21:25.266Z',
        },
        {
          id: 46,
          student: 'Rodrigo Branas',
          subject: '02 - Node',
          type: 'Desafio',
          value: 44,
          timestamp: '2020-05-19T18:21:25.272Z',
        },
        {
          id: 47,
          student: 'Rodrigo Branas',
          subject: '03 - React',
          type: 'Desafio',
          value: 36,
          timestamp: '2020-05-19T18:21:25.278Z',
        },
        {
          id: 48,
          student: 'Rodrigo Branas',
          subject: '04 - MongoDB',
          type: 'Desafio',
          value: 45,
          timestamp: '2020-05-19T18:21:25.284Z',
        },
      ],
    };
    writeFile(global.filename, JSON.stringify(initialJson, null, 2))
      .then(() => {
        global.logger.info('API Started and Created File!');
      })
      .catch((err) => {
        global.logger.error(err);
      });
  }
});
