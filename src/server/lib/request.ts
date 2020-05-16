import { NextApiRequest, NextApiResponse } from "next";
import { withIronSession } from "next-iron-session";

import { ReqMethods } from "../../types";
import { Handler } from "../../types";

function withSession<T = unknown>(handler: Handler<T>, isPrivate = true) {
  // TODO > validate session
  return withIronSession(handler, {
    cookieOptions: { secure: process.env.NODE_ENV === "production" },
    password: process.env.SESSION_PASSWORD,
    cookieName: "finance-iron-session",
  });
}

export function withParameterValidation(...parameters: string[]) {
  return function (handler: Handler) {
    return function (req, res) {
      const missingParameter = parameters.filter(
        (parameter) => !req.body[parameter] && !req.query[parameter]
      );

      if (missingParameter.length) {
        const missingParameterString = missingParameter.join(", ");
        const message = `Missing required parameter(s): ${missingParameterString}`;
        return res.status(400).send(message);
      }

      return handler(req, res);
    } as Handler;
  };
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
