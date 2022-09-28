import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";

import { ProfileModel } from "../mongoose/models";
import dbConnect from "../mongoose/dbConnect";

const getProfile: NextApiHandler = async (req, res) => {
  try {
    const session = await getSession({ req });
    const { email } = session.user;
    await dbConnect();

    const results = await ProfileModel.findOne().where({ email });
    return res.json(results);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const putProfile: NextApiHandler = async (req, res) => {
  try {
    const session = await getSession({ req });
    const { email } = session.user;
    const { profile } = req.body;
    await dbConnect();

    const results = await ProfileModel.updateOne(
      { updatedAt: Date.now(), ...profile },
      { upsert: true }
    ).where({ email });
    return res.json(results);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export { getProfile, putProfile };
