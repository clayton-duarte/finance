import { mapHandlerByMethod, withSession } from "../../server/lib/request";
import {
  deleteAccount,
  getAccounts,
  postAccount,
  putAccount,
} from "../../server/controllers/accounts";

export default withSession(
  mapHandlerByMethod({
    DELETE: deleteAccount,
    POST: postAccount,
    GET: getAccounts,
    PUT: putAccount,
  })
);
