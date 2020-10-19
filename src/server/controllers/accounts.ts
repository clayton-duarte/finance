import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";

import { AccountModel, ProfileModel } from "../mongoose/models";
import dbConnect from "../mongoose/dbConnect";

const getAccounts: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  const { email } = session.user;
  await dbConnect();

  try {
    const sharedProfile = await ProfileModel.findOne({ share: email });
    const accounts = await AccountModel.find({
      $or: [{ email }, { email: sharedProfile?.email }],
    });
    res.json(accounts);
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

const putAccount: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  const { email } = session.user;
  const { account } = req.body;
  await dbConnect();

  try {
    const results = await AccountModel.updateOne(
      { _id: account._id, email },
      {
        updatedAt: Date.now(),
        ...account,
      }
    );
    res.json(results);
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

export { deleteAccount, getAccounts, postAccount, putAccount };
