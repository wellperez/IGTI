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

    global.logger.info(`POST /account - ${JSON.stringify(newAccount)}`);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.filename));
    delete data.nextId;
    res.send(data);
    global.logger.info('GET /account');
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
      global.logger.info(`POST /account/${id} - ${JSON.stringify(account)}`);
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
    global.logger.info(`DELETE /account/${id}`);
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
    global.logger.info(`PUT /account - ${JSON.stringify(account)}`);
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
    global.logger.info(`PATCH /account/updateBalance - ${JSON.stringify(data.accounts[index])}`);
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, _) => {
  global.logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({
    error: err.message,
  });
});

export default router;
