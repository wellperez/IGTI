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

    global.logger.info(`POST /account - ${JSON.stringify(newGrade)}`);
  } catch (error) {
    next(error);
  }
});

export default router;
