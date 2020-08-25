import { mapHandlerByMethod, withSession } from "../../server/lib/request";
import {
  deleteAccount,
  getAccounts,
  postAccount,
  putAccounts,
} from "../../server/controllers/accounts";

export default withSession(
  mapHandlerByMethod({
    DELETE: deleteAccount,
    POST: postAccount,
    PUT: putAccounts,
    GET: getAccounts,
  })
);
