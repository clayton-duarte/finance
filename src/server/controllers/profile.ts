import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";

import { ProfileModel } from "../mongoose/models";
import dbConnect from "../mongoose/dbConnect";

const putProfile: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  const { email } = session.user;
  const { share } = req.body;
  await dbConnect();

  try {
    const results = await ProfileModel.updateOne(
      { email },
      {
        updatedAt: Date.now(),
        share,
      }
    );
    res.json(results);
  } catch (error) {
    res.status(502).send(error);
  }
};

export { putProfile };
