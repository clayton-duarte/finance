import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";

import { ProfileModel } from "../mongoose/models";
import dbConnect from "../mongoose/dbConnect";

const getProfile: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  const { email } = session.user;
  await dbConnect();

  try {
    const results = await ProfileModel.findOne({ email });
    res.json(results);
  } catch (error) {
    res.status(502).send(error);
  }
};

const putProfile: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  const { email } = session.user;
  const { profile } = req.body;
  await dbConnect();

  try {
    delete profile.email;
    const results = await ProfileModel.updateOne(
      { email },
      {
        updatedAt: Date.now(),
        ...profile,
      },
      { upsert: true }
    );
    res.json(results);
  } catch (error) {
    res.status(502).send(error);
  }
};

export { getProfile, putProfile };
