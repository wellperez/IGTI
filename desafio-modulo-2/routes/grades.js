import express from 'express';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const {
      student, subject, type, value,
    } = req.body;

    if (!student || !subject || !type || value === null) {
      throw new Error('Aluno, Matéria, Tipo e Nota são obrigatórios');
    }
    const data = JSON.parse(await readFile(global.filename));

    const newGrade = {
      id: data.nextId++,
      student,
      subject,
      type,
      value,
      timestamp: new Date(),
    };

    data.grades.push(newGrade);

    await writeFile(global.filename, JSON.stringify(data, null, 2));

    res.send(newGrade);

    global.logger.info(`POST /grades - ${JSON.stringify(newGrade)}`);
  } catch (error) {
    next(error);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const {
      id, student, subject, type, value,
    } = req.body;

    if (!student || !subject || !type || value === null) {
      throw new Error('Aluno, Matéria, Tipo e Nota são obrigatórios');
    }

    const data = JSON.parse(await readFile(global.filename));

    const index = data.grades.findIndex((grade) => grade.id === Number(id));

    if (index === -1) {
      throw new Error('Registro Nao encontrado!');
    }

    data.grades[index].student = student;
    data.grades[index].subject = subject;
    data.grades[index].type = type;
    data.grades[index].value = value;

    await writeFile(global.filename, JSON.stringify(data, null, 2));

    res.send(data.grades[index]);
    global.logger.info(`PUT /grades - ${JSON.stringify(data.grades[index])}`);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.filename));
    const { id } = req.params;
    data.grades = data.grades.filter((grade) => grade.id !== Number(id));

    await writeFile(global.filename, JSON.stringify(data, null, 2));

    res.end();
    global.logger.info(`DELETE /grades/${id}`);
  } catch (error) {
    next(error);
  }
});

router.get('/studentSubject', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.filename));
    const { student, subject } = req.query;

    let sum = 0;

    data.grades.forEach((result) => {
      if (result.student === student && result.subject === subject) {
        sum += result.value;
      }
    });

    if (sum) {
      res.send({ sum });
      global.logger.info(
        `GET/grades/studentSubject?student=${student}&subject=${subject} | ${JSON.stringify(
          { sum },
        )}`,
      );
    } else {
      res.status(404).json({
        status: 'Student or Subject not found',
      });
    }
  } catch (error) {
    next(error);
  }
});

router.get('/subjectType', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.filename));
    const { type, subject } = req.query;

    let average = 0;
    let count = 0;

    data.grades.forEach((result) => {
      if (result.type === type && result.subject === subject) {
        average += result.value;
        count++;
      }
    });

    if (average) {
      res.send({ average: average / count });
      global.logger.info(
        `GET/grades/subjectType?type=${type}&subject=${subject} | ${JSON.stringify(
          { average: average / count },
        )}`,
      );
    } else {
      res.status(404).json({
        status: 'Student or Subject not found',
      });
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.filename));
    const { id } = req.params;
    const grade = data.grades.find((result) => result.id === Number(id));

    if (grade) {
      res.send(grade);
      global.logger.info(`POST /grades/${id} - ${JSON.stringify(grade)}`);
    } else {
      res.status(404).json({
        status: 'Grade Not Found',
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
