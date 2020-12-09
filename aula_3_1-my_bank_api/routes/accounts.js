import express from 'express';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const account = req.body;
    const data = JSON.parse(await readFile(global.filename));

    const newAccount = {
      id: data.nextId++,
      ...account,
    };

    data.accounts.push(newAccount);

    await writeFile(global.filename, JSON.stringify(data, null, 2));

    res.send(newAccount);
  } catch (error) {
    console.error(error);
    res.status(400).send({
      error: error.message,
    });
  }
  res.end();
});

router.get('/', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.filename));
    delete data.nextId;
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(400).send({
      error: error.message,
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.filename));
    const { id } = req.params;
    const account = data.accounts.find((acc) => acc.id === Number(id));

    if (account) {
      res.send(account);
    } else {
      res.status(404).json({
        status: 'Account Not Found',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).send({
      error: error.message,
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.filename));
    const { id } = req.params;
    data.accounts = data.accounts.filter((acc) => acc.id !== Number(id));

    await writeFile(global.filename, JSON.stringify(data, null, 2));

    res.end();
  } catch (error) {
    console.error(error);
    res.status(400).send({
      error: error.message,
    });
  }
});

router.put('/', async (req, res) => {
  try {
    const account = req.body;
    const data = JSON.parse(await readFile(global.filename));
    const index = data.accounts.findIndex((acc) => acc.id === Number(account.id));

    data.accounts[index] = account;

    await writeFile(global.filename, JSON.stringify(data, null, 2));

    res.send(account);
  } catch (error) {
    console.error(error);
    res.status(400).send({
      error: error.message,
    });
  }
});
export default router;
