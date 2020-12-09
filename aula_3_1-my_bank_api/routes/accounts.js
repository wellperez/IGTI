import express from 'express';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

const router = express.Router();

router.post('/', async (req, res, next) => {
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
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.filename));
    delete data.nextId;
    res.send(data);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
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
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.filename));
    const { id } = req.params;
    data.accounts = data.accounts.filter((acc) => acc.id !== Number(id));

    await writeFile(global.filename, JSON.stringify(data, null, 2));

    res.end();
  } catch (error) {
    next(error);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const account = req.body;
    const data = JSON.parse(await readFile(global.filename));
    const index = data.accounts.findIndex((acc) => acc.id === Number(account.id));

    data.accounts[index] = account;

    await writeFile(global.filename, JSON.stringify(data, null, 2));

    res.send(account);
  } catch (error) {
    next(error);
  }
});

router.patch('/updateBalance', async (req, res, next) => {
  try {
    const account = req.body;
    const data = JSON.parse(await readFile(global.filename));
    const index = data.accounts.findIndex((acc) => acc.id === Number(account.id));

    data.accounts[index].balance = account.balance;

    await writeFile(global.filename, JSON.stringify(data, null, 2));

    res.send(data.accounts[index]);
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, _) => {
  console.error(err);
  res.status(400).send({
    error: err.message,
  });
});

export default router;
