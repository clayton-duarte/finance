import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";

import { AccountModel } from "../mongoose/models";
import dbConnect from "../mongoose/dbConnect";

const getAccounts: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  const { email } = session.user;
  await dbConnect();

  try {
    const results = await AccountModel.find({ email });
    res.json(results);
  } catch (error) {
    res.status(502).send(error);
  }
};

const postAccount: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  const { email } = session.user;
  const { account } = req.body;

  await dbConnect();
  try {
    const results = await AccountModel.create({ ...account, email });
    res.json(results);
  } catch (error) {
    res.status(502).send(error);
  }
};

const putAccounts: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  const { email } = session.user;
  const { accounts } = req.body;
  await dbConnect();

  try {
    accounts.forEach(async ({ _id, amount, currency }) => {
      const doc = {
        updatedAt: Date.now(),
        currency,
        amount,
      };
      await AccountModel.updateOne({ _id, email }, doc);
    });
    res.json(accounts);
  } catch (error) {
    res.status(502).send(error);
  }
};

const deleteAccount: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  const { email } = session.user;
  const { _id } = req.query;
  await dbConnect();

  try {
    const results = await AccountModel.deleteOne({ _id, email });
    res.json(results);
  } catch (error) {
    res.status(502).send(error);
  }
};

export { deleteAccount, getAccounts, postAccount, putAccounts };
