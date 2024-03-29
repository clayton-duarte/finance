import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { ReqMethods } from "../../types";

export function withSession(handler): NextApiHandler {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });
    if (session) return handler(req, res);
    console.log("No session", req.url);
    return res.status(401).end();
  };
}

export function withParameterValidation(...parameters: string[]) {
  return function (handler: NextApiHandler): NextApiHandler {
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
    } as NextApiHandler;
  };
}

export const mapHandlerByMethod =
  (
    handlersByMethod: Partial<Record<ReqMethods, NextApiHandler>>
  ): NextApiHandler =>
  (req, res) => {
    const availableHandler = handlersByMethod[req.method as ReqMethods];
    if (availableHandler) return availableHandler(req, res);
    return res.status(405).send("Method not Allowed");
  };
