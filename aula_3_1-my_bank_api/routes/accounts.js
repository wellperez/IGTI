import express from 'express';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const account = req.body;
    const data = JSON.parse(await readFile('accounts.json'));

    const newAccount = {
      id: data.nextId++,
      ...account,
    };

    data.accounts.push(newAccount);

    await writeFile('accounts.json', JSON.stringify(data, null, 2));

    res.send(newAccount);
  } catch (error) {
    console.error(error);
    res.status(400).send({
      error: error.message,
    });
  }
  res.end();
});

export default router;
