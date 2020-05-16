import { withIronSession } from "next-iron-session";
import { Magic } from "@magic-sdk/admin";

import { Handler } from "../../types/interfaces";
import { ReqMethods } from "../../types/enums";
import { UserModel } from "../mongoose/models";
import dbConnect from "../mongoose/dbConnect";

const mAdmin = new Magic(process.env.MAGIC_SECRET);

function withSession<T = any>(handler: Handler<T>, isPrivate = true) {
  async function protectedHandler(req, res) {
    const DIDToken = req.headers.authorization.substring(7);
    const userMeta = await mAdmin.users.getMetadataByToken(DIDToken);

    if (isPrivate) {
      await dbConnect();
      try {
        const results = await UserModel.find();

        const isAuthorized = results.find(
          ({ email }) => email === userMeta.email
        );

        if (!isAuthorized) {
          res.status(401).send("Please log in!");
          return;
        }
      } catch (error) {
        res.status(502).send(error);
        return;
      }
    }
    return handler(req, res);
  }

  return withIronSession(protectedHandler, {
    password: process.env.SESSION_PASSWORD,
    cookieName: "finance-iron-session",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });
}

interface Handlers {
  [ReqMethods.DELETE]?: Handler;
  [ReqMethods.POST]?: Handler;
  [ReqMethods.PUT]?: Handler;
  [ReqMethods.GET]?: Handler;
}

const mapHandlerByMethod = (handlers: Handlers) => (req, res) => {
  const availableHandler = handlers[req.method];
  if (availableHandler) return availableHandler(req, res);
  res.status(405).send("Method not Allowed");
  return;
};

export { mapHandlerByMethod, withSession };
