import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";

import { AccountModel, ProfileModel } from "../mongoose/models";
import dbConnect from "../mongoose/dbConnect";

const PAGE_OFFSET = 0 as const;
const PAGE_LIMIT = 10 as const;

export const getAccounts: NextApiHandler = async (req, res) => {
  try {
    const session = await getSession({ req });
    const { email } = session.user;

    await dbConnect();
    const sharedProfile = await ProfileModel.findOne().where({ share: email });
    const accounts = await AccountModel.find()
      .where("email")
      .in([email, sharedProfile?.email])
      .skip(PAGE_LIMIT * PAGE_OFFSET)
      .limit(PAGE_LIMIT);

    return res.json(accounts);
  } catch (error) {
    return res.json([]);
    return res.status(500).send(error);
  }
};

export const postAccount: NextApiHandler = async (req, res) => {
  try {
    const session = await getSession({ req });
    const { email } = session.user;
    const { account } = req.body;

    await dbConnect();
    const results = await AccountModel.create({ ...account, email });
    return res.json(results);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const putAccount: NextApiHandler = async (req, res) => {
  try {
    const session = await getSession({ req });
    const { email } = session.user;
    const { account } = req.body;
    await dbConnect();

    const results = await AccountModel.updateOne({
      updatedAt: Date.now(),
      ...account,
    }).where({ _id: account._id, email });
    return res.json(results);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const deleteAccount: NextApiHandler = async (req, res) => {
  try {
    const session = await getSession({ req });
    const { email } = session.user;
    const { _id } = req.query;
    await dbConnect();

    const results = await AccountModel.deleteOne().where({ _id, email });
    return res.json(results);
  } catch (error) {
    return res.status(500).send(error);
  }
};
