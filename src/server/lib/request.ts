import { ReqMethods } from "../../types";
import { Handler } from "../../types";

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

export { mapHandlerByMethod };
