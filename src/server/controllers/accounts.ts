import { getSession } from "next-auth/client";
import { NextApiHandler } from "next";

import { AccountModel } from "../mongoose/models";
import dbConnect from "../mongoose/dbConnect";

const getAccounts: NextApiHandler = async (req, res) => {
  await dbConnect();

  try {
    const results = await AccountModel.find();
    res.json(results);
  } catch (error) {
    res.status(502).send(error);
  }
};

const postAccount: NextApiHandler = async (req, res) => {
  const { account } = req.body;

  await dbConnect();
  try {
    const results = await AccountModel.create(account);
    res.json(results);
  } catch (error) {
    res.status(502).send(error);
  }
};

const putAccounts: NextApiHandler = async (req, res) => {
  const { accounts } = req.body;
  await dbConnect();

  try {
    accounts.forEach(async ({ _id, amount, currency }) => {
      const doc = {
        updatedAt: Date.now(),
        currency,
        amount,
      };
      await AccountModel.updateOne({ _id }, doc);
    });
    res.json(accounts);
  } catch (error) {
    res.status(502).send(error);
  }
};

const deleteAccount: NextApiHandler = async (req, res) => {
  const { _id } = req.query;
  await dbConnect();

  try {
    const results = await AccountModel.deleteOne({ _id });
    res.json(results);
  } catch (error) {
    res.status(502).send(error);
  }
};

export { deleteAccount, getAccounts, postAccount, putAccounts };
