import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";

import { ReqMethods } from "../../types";

export function withSession(handler) {
  return async function (req, res) {
    const session = await getSession({ req });
    if (session) return handler(req, res);
    return res.status(401).end();
  };
}

export function withParameterValidation(...parameters: string[]) {
  return function (handler: NextApiHandler) {
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

const mapHandlerByMethod = (handlersByMethod: {
  [ReqMethods.DELETE]?: NextApiHandler;
  [ReqMethods.POST]?: NextApiHandler;
  [ReqMethods.PUT]?: NextApiHandler;
  [ReqMethods.GET]?: NextApiHandler;
}) => (req, res) => {
  const availableHandler = handlersByMethod[req.method];
  if (availableHandler) return availableHandler(req, res);
  return res.status(405).send("Method not Allowed");
};

export { mapHandlerByMethod };
